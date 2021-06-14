/**
 * title     : 更新前端文件
 * path      : /sys/page/fetch
 * created at: 2021/4/21 下午10:35:53
 * updated at: 2021/4/24 上午12:43:00
 */
import * as Joi from 'joi';
import { defineRoute } from '@/helpers/route';
import optional from './optional';
// interfaces
// Joi Vos
export default defineRoute({
    method: 'POST',
    path: '/sys/page/fetch',
    options: {
        tags: ['api', 'sys'],
        validate: {
        },
        response: {
            status: {
                200: Joi.array().items(Joi.string()),
            }
        }
    },
    ...optional,
});
