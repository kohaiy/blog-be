/**
 * title     : 添加友链
 * path      : /friend-link
 * created at: 2021/4/17 下午8:34:01
 * updated at: 2021/4/17 下午8:35:10
 */
import { BadRequest } from '@/helpers/error';
import { defineOptionalRoute } from '@/helpers/route';
import FriendLink from '@/models/friend-link';
import { PostFriendLinkBody, PostFriendLinkResp } from './default';

export default defineOptionalRoute({
    handler: async (req): Promise<PostFriendLinkResp> => {
        const { name, description, linkUrl, logoUrl } = req.payload as PostFriendLinkBody;
        const checkName = await FriendLink.count({ where: { name } });
        if (checkName > 0) {
            throw new BadRequest('该友链名称已存在');
        }
        const friendLink = new FriendLink({
            name,
            description,
            linkUrl,
            logoUrl,
            order: 0,
            isActive: true,
        });
        await friendLink.save();

        return { id: friendLink.id };
    },
});
