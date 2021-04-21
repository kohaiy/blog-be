/**
 * title     : 获取友链列表
 * path      : /web/friend-links
 * created at: 2021/4/18 上午11:19:08
 * updated at: 2021/4/18 上午11:20:21
 */
import { defineOptionalRoute } from '@/helpers/route';
import FriendLink from '@/models/friend-link';
import { GetWebFriendLinksResp } from './default';

export default defineOptionalRoute({
    handler: async (): Promise<GetWebFriendLinksResp[]> => {
        const friendLinks = await FriendLink.findAll({
            where: {
                isActive: true,
            },
            order: [['order', 'desc']],
        });

        return friendLinks.map(({ id, name, description, linkUrl, logoUrl }) => ({
            id, name, description, linkUrl, logoUrl,
        }));
    },
});
