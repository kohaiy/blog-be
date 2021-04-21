/**
 * title     : 获取友链列表
 * path      : /web/friend-links
 * created at: 2021/4/18 上午11:19:08
 * updated at: 2021/4/18 下午12:02:38
 */
import * as Joi from 'joi';
import { defineRoute } from '@/helpers/route';
import optional from './optional';
// interfaces
export interface GetWebFriendLinksResp {
    id: number;
    name: string;
    description: string;
    linkUrl: string;
    logoUrl: string;
}
// Joi Vos
const GetWebFriendLinksRespVo = Joi.object({
    id: Joi.number().required(),
    name: Joi.string().required(),
    description: Joi.string().required(),
    linkUrl: Joi.string().required(),
    logoUrl: Joi.string().required()
});
export default defineRoute({
    method: 'GET',
    path: '/web/friend-links',
    options: {
        auth: false,
        tags: ['api', 'web-friend-link'],
        validate: {
        },
        response: {
            status: {
                200: Joi.array().items(GetWebFriendLinksRespVo),
            }
        }
    },
    ...optional,
});
