/**
 * title     : 用户登录
 * path      : /auth/login
 * created at: 2021/2/27 下午10:28:43
 * updated at: 2021/4/3 下午5:47:56
 */
import * as Joi from 'joi';
import { defineRoute } from '@/helpers/route';
import optional from './optional';
// interfaces
export interface PostAuthLoginBody {
    loginName: string;
    password: string;
}
export interface PostAuthLoginResp {
    token: string;
    userId: number;
}
// Joi Vos
const PostAuthLoginBodyVo = Joi.object({
    loginName: Joi.string().required(),
    password: Joi.string().required()
});
const PostAuthLoginRespVo = Joi.object({
    token: Joi.string().required(),
    userId: Joi.number().required()
});
export default defineRoute({
    method: 'POST',
    path: '/auth/login',
    options: {
        auth: false,
        tags: ['api', 'auth'],
        validate: {
            payload: PostAuthLoginBodyVo
        },
        response: {
            status: {
                200: PostAuthLoginRespVo,
            }
        }
    },
    ...optional,
});
