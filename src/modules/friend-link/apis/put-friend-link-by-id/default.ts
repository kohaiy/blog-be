/**
 * title     : 更新友链
 * path      : /friend-link/{id}
 * created at: 2021/4/17 下午8:36:50
 * updated at: 2021/4/18 下午12:03:13
 */
import * as Joi from 'joi';
import { defineRoute } from '@/helpers/route';
import optional from './optional';
// interfaces
export interface PutFriendLinkByIdBody {
    name: string;
    description: string;
    logoUrl: string;
    linkUrl: string;
}
// Joi Vos
const PutFriendLinkByIdBodyVo = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    logoUrl: Joi.string().required(),
    linkUrl: Joi.string().required()
});
export default defineRoute({
    method: 'PUT',
    path: '/friend-link/{id}',
    options: {
        tags: ['api', 'friend-link'],
        validate: {
            params: Joi.object({
                id: Joi.number().allow(null)
            }),
            payload: PutFriendLinkByIdBodyVo
        },
        response: {
            status: {
                200: Joi.boolean(),
            }
        }
    },
    ...optional,
});
