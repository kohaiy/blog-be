/**
 * title     : 创建分类
 * path      : /category
 * created at: 2021/2/27 下午10:32:29
 * updated at: 2021/3/28 下午4:06:42
 */
import * as Joi from 'joi';
import { defineRoute } from '@/helpers/route';
import optional from './optional';
// interfaces
export interface PostCategoryBody {
    name: string;
    pid?: number;
    icon?: string;
    description?: string;
}
export interface PostCategoryResp {
    id: number;
}
// Joi Vos
const PostCategoryBodyVo = Joi.object({
    name: Joi.string().required(),
    pid: Joi.number().allow(null),
    icon: Joi.string().allow(null).allow(''),
    description: Joi.string().allow(null).allow('')
});
const PostCategoryRespVo = Joi.object({
    id: Joi.number().required()
});
export default defineRoute({
    method: 'POST',
    path: '/category',
    options: {
        tags: ['api', 'category'],
        validate: {
            payload: PostCategoryBodyVo
        },
        response: {
            status: {
                200: PostCategoryRespVo,
            }
        }
    },
    ...optional,
});
