/**
 * title     : 用户登录
 * path      : /auth/login
 * created at: 2021/2/27 下午10:28:43
 * updated at: 2021/2/27 下午10:31:34
 */
import { Op } from 'sequelize';
import { defineOptionalRoute } from '@/helpers/route';
import User from '@/models/user';
import { PostAuthLoginBody } from './default';
import { BadRequest } from '@/helpers/error';
import DataHelper from '@/helpers/data';

export default defineOptionalRoute({
    handler: async (req) => {
        const { loginName, password } = req.payload as PostAuthLoginBody;
        const user = await User.findOne({
            where: {
                [Op.or]: [
                    { name: loginName },
                    { email: loginName }
                ]
            }
        });
        if (!user) {
            throw new BadRequest('用户名或密码错误');
        }
        const pass = DataHelper.generatePassword(password, user.slat);
        if (pass !== user.password) {
            throw new BadRequest('用户名或密码错误');
        }
        return {
            userId: user.id,
            token: DataHelper.generateToken({
                id: user.id,
            }),
        };
    },
});
