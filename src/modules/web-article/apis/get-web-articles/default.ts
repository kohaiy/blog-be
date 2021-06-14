/**
 * title     : 获取文章列表
 * path      : /web/articles
 * created at: 2021/4/4 下午10:41:06
 * updated at: 2021/5/13 下午9:39:34
 */
import * as Joi from 'joi';
import { defineRoute } from '@/helpers/route';
import optional from './optional';
// interfaces
export interface GetWebArticlesQuery {
    page: number;
    size: number;
    tag?: string;
}
export interface GetWebArticlesRespList {
    id: number;
    name: string;
    linkName: string;
    abstract: string;
    tags: string[];
    categoryId: number;
    categoryName: string;
    createdAt: Date;
}
export interface GetWebArticlesResp {
    list: GetWebArticlesRespList[];
    total: number;
}
// Joi Vos
const GetWebArticlesRespListVo = Joi.object({
    id: Joi.number().required(),
    name: Joi.string().required(),
    linkName: Joi.string().required(),
    abstract: Joi.string().required(),
    tags: Joi.array().items(Joi.string()),
    categoryId: Joi.number().required(),
    categoryName: Joi.string().required(),
    createdAt: Joi.date().required()
});
const GetWebArticlesRespVo = Joi.object({
    list: Joi.array().items(GetWebArticlesRespListVo),
    total: Joi.number().required()
});
export default defineRoute({
    method: 'GET',
    path: '/web/articles',
    options: {
        auth: false,
        tags: ['api', 'web-article'],
        validate: {query: Joi.object({
                page: Joi.number().required(),
                size: Joi.number().required(),
                tag: Joi.string().allow(null).allow('')
            })
        },
        response: {
            status: {
                200: GetWebArticlesRespVo,
            }
        }
    },
    ...optional,
});
