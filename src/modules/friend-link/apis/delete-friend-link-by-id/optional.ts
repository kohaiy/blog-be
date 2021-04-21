/**
 * title     : 删除友链
 * path      : /friend-link/{id}
 * created at: 2021/4/17 下午8:35:50
 * updated at: 2021/4/17 下午8:36:13
 */
import { NotFound } from '@/helpers/error';
import { defineOptionalRoute } from '@/helpers/route';
import FriendLink from '@/models/friend-link';

export default defineOptionalRoute({
    handler: async (req) => {
        const { id } = req.params as { id: number };
        const friendLink = await FriendLink.findByPk(id);
        if (!friendLink) {
            throw new NotFound('该友链不存在');
        }
        await friendLink.destroy();

        return true;
    },
});
