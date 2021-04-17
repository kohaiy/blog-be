/**
 * title     : 获取文章详情
 * path      : /web/article/{id}
 * created at: 2021/4/4 下午10:42:27
 * updated at: 2021/4/11 下午9:19:28
 */
import * as Joi from 'joi';
import { defineRoute } from '@/helpers/route';
import optional from './optional';
// interfaces
export interface GetWebArticleByIdResp {
    id: number;
    categoryId: number;
    categoryName: string;
    name: string;
    content: string;
    tags: string[];
    updatedAt: Date;
    createdAt: Date;
    author: string;
    likeTotal: number;
    viewTotal: number;
}
// Joi Vos
const GetWebArticleByIdRespVo = Joi.object({
    id: Joi.number().required(),
    categoryId: Joi.number().required(),
    categoryName: Joi.string().required(),
    name: Joi.string().required(),
    content: Joi.string().required(),
    tags: Joi.array().items(Joi.string()),
    updatedAt: Joi.date().required(),
    createdAt: Joi.date().required(),
    author: Joi.string().required(),
    likeTotal: Joi.number().required(),
    viewTotal: Joi.number().required()
});
export default defineRoute({
    method: 'GET',
    path: '/web/article/{id}',
    options: {
        auth: false,
        tags: ['api', 'web-article'],
        validate: {
            params: Joi.object({
                id: Joi.number().allow(null)
            })
        },
        response: {
            status: {
                200: GetWebArticleByIdRespVo,
            }
        }
    },
    ...optional,
});
