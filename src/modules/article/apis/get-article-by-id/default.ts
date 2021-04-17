/**
 * title     : 获取文章详情
 * path      : /article/{id}
 * created at: 2021/2/15 下午8:44:53
 * updated at: 2021/4/3 下午5:04:13
 */
import * as Joi from 'joi';
import { defineRoute } from '@/helpers/route';
import optional from './optional';
// interfaces
export interface GetArticleByIdResp {
    id: number;
    categoryId: number;
    name: string;
    content: string;
    tags: string[];
}
// Joi Vos
const GetArticleByIdRespVo = Joi.object({
    id: Joi.number().required(),
    categoryId: Joi.number().required(),
    name: Joi.string().required(),
    content: Joi.string().required(),
    tags: Joi.array().items(Joi.string())
});
export default defineRoute({
    method: 'GET',
    path: '/article/{id}',
    options: {
        tags: ['api', 'article'],
        validate: {
            params: Joi.object({
                id: Joi.number().allow(null)
            })
        },
        response: {
            status: {
                200: GetArticleByIdRespVo,
            }
        }
    },
    ...optional,
});
