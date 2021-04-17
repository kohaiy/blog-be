/**
 * title     : 修改分类
 * path      : /category/{id}
 * created at: 2021/3/28 下午5:01:55
 * updated at: 2021/3/28 下午5:16:58
 */
import * as Joi from 'joi';
import { defineRoute } from '@/helpers/route';
import optional from './optional';
// interfaces
export interface PutCategoryByIdBody {
    pid?: number;
    name: string;
    icon?: string;
    description?: string;
}
// Joi Vos
const PutCategoryByIdBodyVo = Joi.object({
    pid: Joi.number().allow(null),
    name: Joi.string().required(),
    icon: Joi.string().allow(null).allow(''),
    description: Joi.string().allow(null).allow('')
});
export default defineRoute({
    method: 'PUT',
    path: '/category/{id}',
    options: {
        tags: ['api', 'category'],
        validate: {
            params: Joi.object({
                id: Joi.number().allow(null)
            }),
            payload: PutCategoryByIdBodyVo
        },
        response: {
            status: {
                200: Joi.boolean(),
            }
        }
    },
    ...optional,
});
