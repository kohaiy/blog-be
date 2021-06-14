/**
 * title     : 获取系统信息
 * path      : /web-sys-info
 * created at: 2021/6/6 下午5:07:23
 * updated at: 2021/6/6 下午5:07:53
 */
import { sysInfoKeys } from '@/enums/sys-info';
import { defineOptionalRoute } from '@/helpers/route';
import SysInfo from '@/models/sys-info';

export default defineOptionalRoute({
    handler: async () => {
        const infos = await SysInfo.findAll();
        const res = {
            baseUrl: '',
            siteName: '',
            mittBeian: '',
            publicBeian: '',
            copyright: '',
        };
        sysInfoKeys.forEach((key) => {
            res[key] = (infos.find(it => it.key === key) || { value: ''}).value;
        });

        return res;
    },
});
