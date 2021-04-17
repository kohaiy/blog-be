/**
 * title     : 更新文章状态
 * path      : /article/{id}
 * created at: 2021/4/3 下午3:41:50
 * updated at: 2021/4/3 下午3:42:40
 */
import { NotFound } from '@/helpers/error';
import { defineOptionalRoute } from '@/helpers/route';
import Article from '@/models/article';
import { PatchArticleByIdBody } from './default';

export default defineOptionalRoute({
    handler: async (req) => {
        const { id } = req.params as { id: number };
        const { isActive } = req.payload as PatchArticleByIdBody;

        const article = await Article.findByPk(id);
        if (!article) {
            throw new NotFound('该文章不存在');
        }

        article.isActive = isActive;
        await article.save();

        return true;
    },
});
