/**
 * title     : 删除分类
 * path      : /category/{id}
 * created at: 2021/3/25 下午11:33:12
 * updated at: 2021/3/28 下午4:15:08
 */
import * as Joi from 'joi';
import { defineRoute } from '@/helpers/route';
import optional from './optional';
// interfaces
// Joi Vos
export default defineRoute({
    method: 'DELETE',
    path: '/category/{id}',
    options: {
        tags: ['api', 'category'],
        validate: {
            params: Joi.object({
                id: Joi.number().allow(null)
            })
        },
        response: {
            status: {
                200: Joi.boolean(),
            }
        }
    },
    ...optional,
});
