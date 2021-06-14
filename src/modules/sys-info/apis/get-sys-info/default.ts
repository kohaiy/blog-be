/**
 * title     : 获取系统信息
 * path      : /sys-info
 * created at: 2021/6/6 下午3:32:45
 * updated at: 2021/6/6 下午4:39:11
 */
import * as Joi from 'joi';
import { defineRoute } from '@/helpers/route';
import optional from './optional';
// interfaces
export interface GetSysInfoResp {
    baseUrl: string;
    siteName: string;  // 网站名称
    mittBeian: string;  // 备案号
    publicBeian: string;  // 网安备案号
    copyright: string;  // 版权信息
}
// Joi Vos
const GetSysInfoRespVo = Joi.object({
    baseUrl: Joi.string().required(),
    siteName: Joi.string().required(),
    mittBeian: Joi.string().required(),
    publicBeian: Joi.string().required(),
    copyright: Joi.string().required()
});
export default defineRoute({
    method: 'GET',
    path: '/sys-info',
    options: {
        tags: ['api', 'sys-info'],
        validate: {
        },
        response: {
            status: {
                200: GetSysInfoRespVo,
            }
        }
    },
    ...optional,
});
