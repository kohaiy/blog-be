/**
 * title     : 编辑文章
 * path      : /article/{id}
 * created at: 2021/4/3 下午3:34:57
 * updated at: 2021/4/3 下午3:37:35
 */
import { openTransaction } from '@/helpers/db';
import { BadRequest, NotFound } from '@/helpers/error';
import { defineOptionalRoute } from '@/helpers/route';
import Article from '@/models/article';
import Category from '@/models/category';
import { PutArticleByIdBody } from './default';

export default defineOptionalRoute({
    handler: async (req) => {
        const { id } = req.params as { id: number };
        const { name, introduction, content, tags, categoryId } = req.payload as PutArticleByIdBody;

        const article = await Article.findByPk(id);
        if (!article) {
            throw new NotFound('该文章不存在');
        }

        // 判断分类id是否存在
        const checkCategory = await Category.findByPk(categoryId);
        if (!checkCategory) {
            throw new BadRequest('该分类不存在');
        }

        article.name = name;
        article.introduction = introduction;
        article.content = content;
        article.tags = tags;
        article.categoryId = categoryId;

        await openTransaction((transaction) => {
            return article.save({ transaction });
        });
        return true;
    },
});
