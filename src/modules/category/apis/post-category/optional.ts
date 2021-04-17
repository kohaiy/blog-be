/**
 * title     : 创建分类
 * path      : /category
 * created at: 2021/2/27 下午10:32:29
 * updated at: 2021/3/28 下午3:37:10
 */
import { BadRequest, NotFound } from '@/helpers/error';
import { defineOptionalRoute } from '@/helpers/route';
import Category from '@/models/category';
import { PostCategoryBody } from './default';

export default defineOptionalRoute({
    handler: async (req) => {
        const { name, pid = null, icon = null, description = null } = req.payload as PostCategoryBody;
        if (pid) {
            const parent = await Category.findByPk(pid);
            if (!parent) {
                throw new NotFound('父级分类不存在');
            }
        }
        const checkName = await Category.count({ where: { name } });
        if (checkName > 0) {
            throw new BadRequest('分类名称已存在');
        }
        const category = new Category({
            name,
            pid,
            icon,
            description
        });
        await category.save();
        console.log(category.id);
        return {
            id: category.id,
        };
        // TODO Enter your code here ...
    },
});
