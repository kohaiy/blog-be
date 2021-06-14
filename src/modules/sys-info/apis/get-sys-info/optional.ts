/**
 * title     : 获取系统信息
 * path      : /sys-info
 * created at: 2021/6/6 下午3:32:45
 * updated at: 2021/6/6 下午3:35:23
 */
import { sysInfoKeys } from '@/enums/sys-info';
import { defineOptionalRoute } from '@/helpers/route';
import SysInfo from '@/models/sys-info';
import { GetSysInfoResp } from './default';

export default defineOptionalRoute({
    handler: async (): Promise<GetSysInfoResp> => {
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
