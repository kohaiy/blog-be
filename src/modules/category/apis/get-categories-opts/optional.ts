/**
 * title     : 通过pid获取分类列表
 * path      : /categories/opts
 * created at: 2021/3/25 下午10:53:11
 * updated at: 2021/3/25 下午10:55:13
 */
import { defineOptionalRoute } from '@/helpers/route';
import Category from '@/models/category';
import { GetCategoriesOptsResp } from './default';

export default defineOptionalRoute({
    handler: async (req): Promise<GetCategoriesOptsResp[]> => {
        const { pid } = req.query as { pid?: number };

        const where: { pid?: number | null } = { pid: null };
        if (pid) {
            where.pid = pid;
        }
        const categories = await Category.findAll({
            where,
        });

        return categories.map(({ id, name, icon, description }) => ({
            id, name,
            icon: icon || undefined,
            description: description || undefined
        }));
    },
});
