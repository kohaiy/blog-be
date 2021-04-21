/**
 * title     : 更改友链
 * path      : /friend-link/{id}
 * created at: 2021/4/17 下午8:38:30
 * updated at: 2021/4/17 下午8:39:10
 */
import { NotFound } from '@/helpers/error';
import { defineOptionalRoute } from '@/helpers/route';
import FriendLink from '@/models/friend-link';
import { PatchFriendLinkByIdBody } from './default';

export default defineOptionalRoute({
    handler: async (req) => {
        const { id } = req.params as { id: number };
        const { order, isActive } = req.payload as PatchFriendLinkByIdBody;
        const friendLink = await FriendLink.findByPk(id);
        if (!friendLink) {
            throw new NotFound('该友链不存在');
        }
        if (order !== undefined) {
            friendLink.order = order;
        }
        if (isActive !== undefined) {
            friendLink.isActive = isActive;
        }
        await friendLink.save();

        return true;
    },
});
