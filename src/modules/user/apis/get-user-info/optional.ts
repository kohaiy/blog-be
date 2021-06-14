/**
 * title     : 获取用户信息
 * path      : /user/info
 * created at: 2021/4/4 下午10:16:04
 * updated at: 2021/4/4 下午10:17:38
 */
import { NotFound } from '@/helpers/error';
import { defineOptionalRoute } from '@/helpers/route';
import User from '@/models/user';
import { GetUserInfoResp } from './default';

export default defineOptionalRoute({
    handler: async (req): Promise<GetUserInfoResp> => {
        const { id } = req.auth.credentials as { id: number };
        const user = await User.findByPk(id);
        if (!user) {
            throw new NotFound('当前用户不存在');
        }
        return {
            id,
            name: user.name,
            email: user.email,
        };
    },
});
