/**
 * title     : 获取友链列表
 * path      : /friend-links
 * created at: 2021/4/17 下午8:31:53
 * updated at: 2021/4/18 下午12:02:53
 */
import * as Joi from 'joi';
import { defineRoute } from '@/helpers/route';
import optional from './optional';
// interfaces
export interface GetFriendLinksResp {
    id: number;
    name: string;
    description: string;
    linkUrl: string;
    logoUrl: string;
    order: number;
    isActive: boolean;
}
// Joi Vos
const GetFriendLinksRespVo = Joi.object({
    id: Joi.number().required(),
    name: Joi.string().required(),
    description: Joi.string().required(),
    linkUrl: Joi.string().required(),
    logoUrl: Joi.string().required(),
    order: Joi.number().required(),
    isActive: Joi.boolean().required()
});
export default defineRoute({
    method: 'GET',
    path: '/friend-links',
    options: {
        tags: ['api', 'friend-link'],
        validate: {
        },
        response: {
            status: {
                200: Joi.array().items(GetFriendLinksRespVo),
            }
        }
    },
    ...optional,
});
