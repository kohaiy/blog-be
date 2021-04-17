/**
 * title     : 获取文章详情
 * path      : /article/{id}
 * created at: 2021/2/15 下午8:44:53
 * updated at: 2021/3/27 下午9:14:07
 */
import { NotFound } from '@/helpers/error';
import { defineOptionalRoute } from '@/helpers/route';
import Article from '@/models/article';
import { GetArticleByIdResp } from './default';

export default defineOptionalRoute({
    handler: async (req): Promise<GetArticleByIdResp> => {
        const { id } = req.params as { id: string };
        const article = await Article.findByPk(id);

        if (!article) {
            throw new NotFound('该文章不存在');
        }

        return {
            id: article.id,
            name: article.name,
            content: article.content,
            tags: article.tags,
            categoryId: article.categoryId,
        };
    },
});
