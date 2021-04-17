/**
 * title     : 新增文章
 * path      : /article
 * created at: 2021/4/3 下午3:30:12
 * updated at: 2021/4/11 下午8:37:50
 */
import * as Joi from 'joi';
import { defineRoute } from '@/helpers/route';
import optional from './optional';
// interfaces
export interface PostArticleBody {
    name: string;  // 文章标题
    introduction: string;
    content: string;  // 文章内容
    tags: string[];  // 标签
    categoryId: number;  // 分类id
}
export interface PostArticleResp {
    id: number;  // 新增的文章id
}
// Joi Vos
const PostArticleBodyVo = Joi.object({
    name: Joi.string().required(),
    introduction: Joi.string().required(),
    content: Joi.string().required(),
    tags: Joi.array().items(Joi.string()),
    categoryId: Joi.number().required()
});
const PostArticleRespVo = Joi.object({
    id: Joi.number().required()
});
export default defineRoute({
    method: 'POST',
    path: '/article',
    options: {
        tags: ['api', 'article'],
        validate: {
            payload: PostArticleBodyVo
        },
        response: {
            status: {
                200: PostArticleRespVo,
            }
        }
    },
    ...optional,
});
