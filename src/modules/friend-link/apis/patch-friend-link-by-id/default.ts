/**
 * title     : 更改友链
 * path      : /friend-link/{id}
 * created at: 2021/4/17 下午8:38:30
 * updated at: 2021/4/17 下午8:39:10
 */
import * as Joi from 'joi';
import { defineRoute } from '@/helpers/route';
import optional from './optional';
// interfaces
export interface PatchFriendLinkByIdBody {
    order?: number;
    isActive?: boolean;
}
// Joi Vos
const PatchFriendLinkByIdBodyVo = Joi.object({
    order: Joi.number().allow(null),
    isActive: Joi.boolean().allow(null)
});
export default defineRoute({
    method: 'PATCH',
    path: '/friend-link/{id}',
    options: {
        tags: ['api', 'friend-link'],
        validate: {
            params: Joi.object({
                id: Joi.number().allow(null)
            }),
            payload: PatchFriendLinkByIdBodyVo
        },
        response: {
            status: {
                200: Joi.boolean(),
            }
        }
    },
    ...optional,
});
