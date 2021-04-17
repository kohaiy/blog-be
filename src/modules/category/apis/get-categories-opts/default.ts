/**
 * title     : 通过pid获取分类列表
 * path      : /categories/opts
 * created at: 2021/3/25 下午10:53:11
 * updated at: 2021/3/28 下午5:00:55
 */
import * as Joi from 'joi';
import { defineRoute } from '@/helpers/route';
import optional from './optional';
// interfaces
export interface GetCategoriesOptsResp {
    id: number;
    name: string;
    icon?: string;
    pid?: number;
    description?: string;
}
// Joi Vos
const GetCategoriesOptsRespVo = Joi.object({
    id: Joi.number().required(),
    name: Joi.string().required(),
    icon: Joi.string().allow(null).allow(''),
    pid: Joi.number().allow(null),
    description: Joi.string().allow(null).allow('')
});
export default defineRoute({
    method: 'GET',
    path: '/categories/opts',
    options: {
        tags: ['api', 'category'],
        validate: {query: Joi.object({
                pid: Joi.number().allow(null)
            })
        },
        response: {
            status: {
                200: Joi.array().items(GetCategoriesOptsRespVo),
            }
        }
    },
    ...optional,
});
