/**
 * title     : 保存系统信息
 * path      : /sys-info
 * created at: 2021/6/6 下午3:35:34
 * updated at: 2021/6/6 下午3:36:53
 */
import { sysInfoKeys } from '@/enums/sys-info';
import { openTransaction } from '@/helpers/db';
import { defineOptionalRoute } from '@/helpers/route';
import SysInfo from '@/models/sys-info';
import { PutSysInfoBody } from './default';

export default defineOptionalRoute<undefined, undefined, PutSysInfoBody>({
    handler: async (req) => {
        const infos = req.payload;
        await openTransaction((transaction) => Promise.all(
            sysInfoKeys.map(async (key) => {
                const item = await SysInfo.findOne({
                    where: {
                        key,
                    },
                }) ?? new SysInfo({
                    key,
                });
                item.value = infos[key];
    
                return item.save({ transaction });
            })
        ));

        return true;
    },
});
