/**
 * title     : 获取文章详情
 * path      : /web/article/{id}
 * created at: 2021/4/4 下午10:42:27
 * updated at: 2021/4/4 下午10:44:40
 */
import { openTransaction } from '@/helpers/db';
import { NotFound } from '@/helpers/error';
import { defineOptionalRoute } from '@/helpers/route';
import Article from '@/models/article';
import ArticleStat from '@/models/article-stat';
import Category from '@/models/category';
import User from '@/models/user';
import { GetWebArticleByIdResp } from './default';

export default defineOptionalRoute<{ id: string }>({
    handler: async (req): Promise<GetWebArticleByIdResp> => {
        const { id: param } = req.params;
        const isId = /^\d+$/.test(param);
        let id = 0;
        let linkName = '';
        let article: Article | null;
        if (isId) {
            id = Number(param);
            article = await Article.findByPk(id);
        } else {
            linkName = param;
            article = await Article.findOne({
                where: { linkName }
            });
        }

        if (!article || !article.isActive) {
            throw new NotFound('文章不存在');
        }

        const category = await Category.findByPk(article.categoryId);

        const articleStat = await ArticleStat.findByPk(article.articleStatId) ??
            new ArticleStat({
                likeTotal: 0,
                viewTotal: 0,
            });
        // viewTotal 加一
        await openTransaction(async (transaction) => {
            if (!article) { return; }
            articleStat.viewTotal += 1;
            await articleStat.save({ transaction });
            if (articleStat.id !== article.articleStatId) {
                article.articleStatId = articleStat.id;
                await article.save({ transaction });
            }
        });


        const user = await User.findByPk(article.userId);

        return {
            id,
            name: article.name,
            linkName: article.linkName,
            abstract: article.abstract,
            content: article.content,
            tags: article.tags,
            categoryId: article.categoryId,
            updatedAt: article.updatedAt,
            createdAt: article.createdAt,
            categoryName: category?.name || '',
            author: user?.name || '',
            viewTotal: articleStat?.viewTotal || 0,
            likeTotal: articleStat?.likeTotal || 0,
        };
    },
});
