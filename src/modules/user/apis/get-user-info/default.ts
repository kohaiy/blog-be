/**
 * title     : 获取用户信息
 * path      : /user/info
 * created at: 2021/4/4 下午10:16:04
 * updated at: 2021/4/4 下午10:17:38
 */
import * as Joi from 'joi';
import { defineRoute } from '@/helpers/route';
import optional from './optional';
// interfaces
export interface GetUserInfoResp {
    id: number;
    name: string;
    email: string;
}
// Joi Vos
const GetUserInfoRespVo = Joi.object({
    id: Joi.number().required(),
    name: Joi.string().required(),
    email: Joi.string().required()
});
export default defineRoute({
    method: 'GET',
    path: '/user/info',
    options: {
        tags: ['api', 'user'],
        validate: {
        },
        response: {
            status: {
                200: GetUserInfoRespVo,
            }
        }
    },
    ...optional,
});
