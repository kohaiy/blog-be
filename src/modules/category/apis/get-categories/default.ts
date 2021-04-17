/**
 * title     : 获取分类列表
 * path      : /categories
 * created at: 2021/2/27 下午10:36:35
 * updated at: 2021/3/28 下午4:41:44
 */
import * as Joi from 'joi';
import { defineRoute } from '@/helpers/route';
import optional from './optional';
// interfaces
export interface GetCategoriesResp {
    id: number;
    name: string;
    icon?: string;
    pid?: number;
    description?: string;
}
// Joi Vos
const GetCategoriesRespVo = Joi.object({
    id: Joi.number().required(),
    name: Joi.string().required(),
    icon: Joi.string().allow(null).allow(''),
    pid: Joi.number().allow(null),
    description: Joi.string().allow(null).allow('')
});
export default defineRoute({
    method: 'GET',
    path: '/categories',
    options: {
        tags: ['api', 'category'],
        validate: {
        },
        response: {
            status: {
                200: Joi.array().items(GetCategoriesRespVo),
            }
        }
    },
    ...optional,
});
