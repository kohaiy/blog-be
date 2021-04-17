/**
 * title     : 新增文章
 * path      : /article
 * created at: 2021/4/3 下午3:30:12
 * updated at: 2021/4/3 下午3:34:35
 */
import { openTransaction } from '@/helpers/db';
import { BadRequest } from '@/helpers/error';
import { defineOptionalRoute } from '@/helpers/route';
import Article from '@/models/article';
import ArticleStat from '@/models/article-stat';
import Category from '@/models/category';
import { PostArticleBody } from './default';

export default defineOptionalRoute({
    handler: async (req) => {
        const { id } = req.auth.credentials as { id: number };
        const { name, introduction, content, tags, categoryId } = req.payload as PostArticleBody;

        // 判断分类id是否存在
        const checkCategory = await Category.findByPk(categoryId);
        if (!checkCategory) {
            throw new BadRequest('该分类不存在');
        }

        const articleStat = new ArticleStat();
        const article = new Article({
            name, content, tags, categoryId,
            userId: id,
            introduction: introduction || content.substr(0, 500),
            articleStatId: articleStat.id,
            isActive: true,
        });
        return openTransaction(async (transaction) => {
            await articleStat.save({ transaction });
            article.articleStatId = articleStat.id;
            await article.save({ transaction });
            return {
                id: article.id,
            };
        });
    },
});
