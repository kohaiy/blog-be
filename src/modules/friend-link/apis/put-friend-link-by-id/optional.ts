/**
 * title     : 更新友链
 * path      : /friend-link/{id}
 * created at: 2021/4/17 下午8:36:50
 * updated at: 2021/4/17 下午8:45:55
 */
import { BadRequest, NotFound } from '@/helpers/error';
import { defineOptionalRoute } from '@/helpers/route';
import FriendLink from '@/models/friend-link';
import { PutFriendLinkByIdBody } from './default';

export default defineOptionalRoute({
    handler: async (req) => {
        const { id } = req.params as { id: number };
        const { name, description, linkUrl, logoUrl } = req.payload as PutFriendLinkByIdBody;
        const friendLink = await FriendLink.findByPk(id);
        if (!friendLink) {
            throw new NotFound('该友链不存在');
        }
        if (friendLink.name !== name) {
            const checkName = await FriendLink.count({ where: { name } });
            if (checkName > 0) {
                throw new BadRequest('该友链名称已存在');
            }
        }
        friendLink.name = name;
        friendLink.description = description;
        friendLink.linkUrl = linkUrl;
        friendLink.logoUrl = logoUrl;
        await friendLink.save();

        return true;
    },
});
