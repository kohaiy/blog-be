/**
 * title     : 删除分类
 * path      : /category/{id}
 * created at: 2021/3/25 下午11:33:12
 * updated at: 2021/3/27 下午10:13:41
 */
import { BadRequest, NotFound } from '@/helpers/error';
import { defineOptionalRoute } from '@/helpers/route';
import Category from '@/models/category';
import Article from '@/models/article';

export default defineOptionalRoute({
    handler: async (req) => {
        const { id } = req.params as { id: number };

        const category = await Category.findByPk(id);
        if (!category) {
            throw new NotFound('该分类不存在');
        }

        const subCount = await Category.count({
            where: { pid: id },
        });
        if (subCount > 0) {
            throw new BadRequest('该分类下有其他分类，不能删除');
        }

        const articleCount = await Article.count({
            where: { categoryId: id },
        });
        if (articleCount > 0) {
            throw new BadRequest('该分类下有文章，不能删除');
        }

        await category.destroy();
        return true;
    },
});
