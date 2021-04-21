/**
 * title     : 删除友链
 * path      : /friend-link/{id}
 * created at: 2021/4/17 下午8:35:50
 * updated at: 2021/4/17 下午8:36:13
 */
import * as Joi from 'joi';
import { defineRoute } from '@/helpers/route';
import optional from './optional';
// interfaces
// Joi Vos
export default defineRoute({
    method: 'DELETE',
    path: '/friend-link/{id}',
    options: {
        tags: ['api', 'friend-link'],
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
