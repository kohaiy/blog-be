/**
 * title     : 获取分类列表
 * path      : /categories
 * created at: 2021/2/27 下午10:36:35
 * updated at: 2021/3/25 下午10:55:28
 */
import { defineOptionalRoute } from '@/helpers/route';
import Category from '@/models/category';

export default defineOptionalRoute({
    handler: async (req) => {
        const categories = await Category.findAll();

        return categories.map(({ id, name, pid, icon, description }) => ({
            id, name, pid, icon, description
        }));
    },
});
