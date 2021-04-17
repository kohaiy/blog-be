/**
 * title     : 更新文章状态
 * path      : /article/{id}
 * created at: 2021/4/3 下午3:41:50
 * updated at: 2021/4/3 下午4:32:17
 */
import * as Joi from 'joi';
import { defineRoute } from '@/helpers/route';
import optional from './optional';
// interfaces
export interface PatchArticleByIdBody {
    isActive: boolean;  // 是否启用
}
// Joi Vos
const PatchArticleByIdBodyVo = Joi.object({
    isActive: Joi.boolean().required()
});
export default defineRoute({
    method: 'PATCH',
    path: '/article/{id}',
    options: {
        tags: ['api', 'article'],
        validate: {
            params: Joi.object({
                id: Joi.number().allow(null)
            }),
            payload: PatchArticleByIdBodyVo
        },
        response: {
            status: {
                200: Joi.boolean(),
            }
        }
    },
    ...optional,
});
