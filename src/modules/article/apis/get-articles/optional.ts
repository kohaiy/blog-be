/**
 * title     : 获取文章列表
 * path      : /articles
 * created at: 2021/2/15 下午8:34:43
 * updated at: 2021/2/27 下午11:27:06
 */
import { defineOptionalRoute } from '@/helpers/route';
import Article from '@/models/article';
import Category from '@/models/category';
import { GetArticlesQuery, GetArticlesResp } from './default';

export default defineOptionalRoute({
    handler: async (req): Promise<GetArticlesResp> => {
        const { page = 1, size = 20 } = req.query as GetArticlesQuery;
        const articles = await Article.findAll({
            order: [['isActive', 'desc'], ['createdAt', 'desc']],
            limit: size,
            offset: (page - 1) * size,
        });
        const total = await Article.count();

        const list = await Promise.all(
            articles.map(async ({ id, name, introduction, content, tags, categoryId, isActive }) => {
                const category = await Category.findByPk(categoryId);
                const categoryIds: number[] = [];
                if (category) {
                    categoryIds.push(category.id);
                    if (category.pid) {
                        categoryIds.unshift(category.pid);
                    }
                }
                return {
                    id, name, introduction, content, tags, categoryId, isActive,
                    categoryIds,
                    categoryName: category?.name || ''
                }
            }),
        );

        return {
            total,
            list,
        };
    },
});
