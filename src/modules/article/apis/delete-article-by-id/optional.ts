/**
 * title     : 删除文章
 * path      : /article/{id}
 * created at: 2021/4/3 下午3:39:38
 * updated at: 2021/4/3 下午3:40:25
 */
import { openTransaction } from '@/helpers/db';
import { NotFound } from '@/helpers/error';
import { defineOptionalRoute } from '@/helpers/route';
import Article from '@/models/article';
import ArticleStat from '@/models/article-stat';

export default defineOptionalRoute({
    handler: async (req) => {
        const { id } = req.params as { id: number };
        const article = await Article.findByPk(id);
        if (!article) {
            throw new NotFound('该文章不存在');
        }
        const articleStat = await ArticleStat.findByPk(article.articleStatId);
        await openTransaction(async (transaction) => {
            await article.destroy({ transaction });
            if (articleStat) {
                await articleStat.destroy({ transaction });
            }
        });

        return true;
    },
});
