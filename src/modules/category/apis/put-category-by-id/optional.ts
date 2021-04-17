/**
 * title     : 修改分类
 * path      : /category/{id}
 * created at: 2021/3/28 下午5:01:55
 * updated at: 2021/3/28 下午5:03:34
 */
import { BadRequest, NotFound } from '@/helpers/error';
import { defineOptionalRoute } from '@/helpers/route';
import Category from '@/models/category';
import { PutCategoryByIdBody } from './default';

export default defineOptionalRoute({
    handler: async (req) => {
        const { id } = req.params as { id: number };
        const { pid, name, icon, description } = req.payload as PutCategoryByIdBody;
        const category = await Category.findByPk(id);
        if (!category) {
            throw new NotFound('该分类不存在');
        }
        if (pid) {
            const parent = await Category.findByPk(pid);
            if (!parent) {
                throw new NotFound('父级分类不存在');
            }
        }
        if (name !== category.name) {
            const checkName = await Category.count({
                where: { name }
            });
            if (checkName > 0) {
                throw new BadRequest('该分类名称已存在');
            }
        }
        category.name = name;
        category.pid = pid || null;
        category.icon = icon || null;
        category.description = description || null;
        await category.save();
        return true;
    },
});
