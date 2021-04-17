/**
 * title     : 删除文章
 * path      : /article/{id}
 * created at: 2021/4/3 下午3:39:38
 * updated at: 2021/4/3 下午4:18:42
 */
import * as Joi from 'joi';
import { defineRoute } from '@/helpers/route';
import optional from './optional';
// interfaces
// Joi Vos
export default defineRoute({
    method: 'DELETE',
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
                200: Joi.boolean(),
            }
        }
    },
    ...optional,
});
