/**
 * title     : 获取文章列表
 * path      : /articles
 * created at: 2021/2/15 下午8:34:43
 * updated at: 2021/4/11 下午8:37:36
 */
import * as Joi from 'joi';
import { defineRoute } from '@/helpers/route';
import optional from './optional';
// interfaces
export interface GetArticlesQuery {
    page?: number;
    size?: number;
}
export interface GetArticlesRespList {
    id: number;
    name: string;
    content: string;
    introduction: string;
    tags: string[];
    categoryId: number;
    categoryIds: number[];
    categoryName: string;
    isActive: boolean;
}
export interface GetArticlesResp {
    list: GetArticlesRespList[];
    total: number;
}
// Joi Vos
const GetArticlesRespListVo = Joi.object({
    id: Joi.number().required(),
    name: Joi.string().required(),
    content: Joi.string().required(),
    introduction: Joi.string().required(),
    tags: Joi.array().items(Joi.string()),
    categoryId: Joi.number().required(),
    categoryIds: Joi.array().items(Joi.number()),
    categoryName: Joi.string().required(),
    isActive: Joi.boolean().required()
});
const GetArticlesRespVo = Joi.object({
    list: Joi.array().items(GetArticlesRespListVo),
    total: Joi.number().required()
});
export default defineRoute({
    method: 'GET',
    path: '/articles',
    options: {
        tags: ['api', 'article'],
        validate: {query: Joi.object({
                page: Joi.number().allow(null),
                size: Joi.number().allow(null)
            })
        },
        response: {
            status: {
                200: GetArticlesRespVo,
            }
        }
    },
    ...optional,
});
