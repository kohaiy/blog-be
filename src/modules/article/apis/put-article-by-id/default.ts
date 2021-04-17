/**
 * title     : 编辑文章
 * path      : /article/{id}
 * created at: 2021/4/3 下午3:34:57
 * updated at: 2021/4/11 下午8:38:02
 */
import * as Joi from 'joi';
import { defineRoute } from '@/helpers/route';
import optional from './optional';
// interfaces
export interface PutArticleByIdBody {
    name: string;  // 文章标题
    introduction: string;
    content: string;  // 文章内容
    tags: string[];  // 标签
    categoryId: number;  // 分类id
}
// Joi Vos
const PutArticleByIdBodyVo = Joi.object({
    name: Joi.string().required(),
    introduction: Joi.string().required(),
    content: Joi.string().required(),
    tags: Joi.array().items(Joi.string()),
    categoryId: Joi.number().required()
});
export default defineRoute({
    method: 'PUT',
    path: '/article/{id}',
    options: {
        tags: ['api', 'article'],
        validate: {
            params: Joi.object({
                id: Joi.number().allow(null)
            }),
            payload: PutArticleByIdBodyVo
        },
        response: {
            status: {
                200: Joi.boolean(),
            }
        }
    },
    ...optional,
});
