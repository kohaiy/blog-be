/**
 * title     : 更新前端文件
 * path      : /sys/page/fetch
 * created at: 2021/4/21 下午10:35:53
 * updated at: 2021/4/21 下午10:36:04
 */
import { defineOptionalRoute } from '@/helpers/route';
import startFetch from '@/plugins/page-fetch';

export default defineOptionalRoute({
    handler: () => {
        return startFetch();
    },
});
