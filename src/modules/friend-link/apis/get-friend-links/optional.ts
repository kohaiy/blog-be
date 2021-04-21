/**
 * title     : 获取友链列表
 * path      : /friend-links
 * created at: 2021/4/17 下午8:31:53
 * updated at: 2021/4/17 下午8:33:20
 */
import { defineOptionalRoute } from '@/helpers/route';
import FriendLink from '@/models/friend-link';
import { GetFriendLinksResp } from './default';

export default defineOptionalRoute({
    handler: async (): Promise<GetFriendLinksResp[]> => {
        const friendLinks = await FriendLink.findAll({
            order: [['isActive', 'desc'], ['order', 'desc']],
        });
        return friendLinks.map(({
            id, name, description, linkUrl, logoUrl, isActive, order
        }) => ({
            id, name, description, linkUrl, logoUrl, isActive, order
        }));
    },
});
