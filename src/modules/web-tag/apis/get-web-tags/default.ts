/**
 * title     : 获取标签列表
 * path      : /web/tags
 * created at: 2021/4/11 下午10:08:37
 * updated at: 2021/4/11 下午10:10:59
 */
import * as Joi from 'joi';
import { defineRoute } from '@/helpers/route';
import optional from './optional';
// interfaces
export interface GetWebTagsResp {
    name: string;
    total: number;
}
// Joi Vos
const GetWebTagsRespVo = Joi.object({
    name: Joi.string().required(),
    total: Joi.number().required()
});
export default defineRoute({
    method: 'GET',
    path: '/web/tags',
    options: {
        auth: false,
        tags: ['api', 'web-tag'],
        validate: {
        },
        response: {
            status: {
                200: Joi.array().items(GetWebTagsRespVo),
            }
        }
    },
    ...optional,
});
