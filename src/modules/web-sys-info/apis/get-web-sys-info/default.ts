/**
 * title     : 获取系统信息
 * path      : /web-sys-info
 * created at: 2021/6/6 下午5:07:23
 * updated at: 2021/6/6 下午5:09:16
 */
import * as Joi from 'joi';
import { defineRoute } from '@/helpers/route';
import optional from './optional';
// interfaces
export interface GetWebSysInfoResp {
    baseUrl: string;
    siteName: string;  // 网站名称
    mittBeian: string;  // 备案号
    publicBeian: string;  // 网安备案号
    copyright: string;  // 版权信息
}
// Joi Vos
const GetWebSysInfoRespVo = Joi.object({
    baseUrl: Joi.string().required(),
    siteName: Joi.string().required(),
    mittBeian: Joi.string().required(),
    publicBeian: Joi.string().required(),
    copyright: Joi.string().required()
});
export default defineRoute({
    method: 'GET',
    path: '/web-sys-info',
    options: {
        auth: false,
        tags: ['api', 'web-sys-info'],
        validate: {
        },
        response: {
            status: {
                200: GetWebSysInfoRespVo,
            }
        }
    },
    ...optional,
});
