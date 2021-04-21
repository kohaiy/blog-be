/**
 * title     : 添加友链
 * path      : /friend-link
 * created at: 2021/4/17 下午8:34:01
 * updated at: 2021/4/18 下午12:03:03
 */
import * as Joi from 'joi';
import { defineRoute } from '@/helpers/route';
import optional from './optional';
// interfaces
export interface PostFriendLinkBody {
    name: string;
    description: string;
    logoUrl: string;
    linkUrl: string;
}
export interface PostFriendLinkResp {
    id: number;
}
// Joi Vos
const PostFriendLinkBodyVo = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    logoUrl: Joi.string().required(),
    linkUrl: Joi.string().required()
});
const PostFriendLinkRespVo = Joi.object({
    id: Joi.number().required()
});
export default defineRoute({
    method: 'POST',
    path: '/friend-link',
    options: {
        tags: ['api', 'friend-link'],
        validate: {
            payload: PostFriendLinkBodyVo
        },
        response: {
            status: {
                200: PostFriendLinkRespVo,
            }
        }
    },
    ...optional,
});
