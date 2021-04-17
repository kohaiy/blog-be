/**
 * title     : 获取文章列表
 * path      : /web/articles
 * created at: 2021/4/4 下午10:41:06
 * updated at: 2021/4/4 下午10:44:58
 */
import * as Sequelize from 'sequelize';
import { defineOptionalRoute } from '@/helpers/route';
import Article, { ArticleAttributes } from '@/models/article';
import Category from '@/models/category';
import { GetWebArticlesQuery, GetWebArticlesResp } from './default';

export default defineOptionalRoute({
    handler: async (req): Promise<GetWebArticlesResp> => {
        const { page = 1, size = 20, tag } = req.query as GetWebArticlesQuery;

        const where: Sequelize.WhereOptions<ArticleAttributes> = {
            isActive: true,
        };
        if (tag) {
            where.tags = Sequelize.where(Sequelize.fn('JSON_CONTAINS',
                Sequelize.col('tags'), JSON.stringify(tag)), '1');
        }
        const articles = await Article.findAll({
            where,
            offset: (page - 1) * size,
            limit: size,
            order: [['createdAt', 'desc']],
        });

        const list = await Promise.all(
            articles.map(async ({ id, name, introduction, tags, categoryId, createdAt }) => {
                const category = await Category.findByPk(categoryId);
                return {
                    id, name, introduction, tags, categoryId,
                    createdAt,
                    categoryName: category?.name || '',
                };
            }),
        );

        const total = await Article.count({
            where,
        })

        return {
            total,
            list,
        };
    },
});
