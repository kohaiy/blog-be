/**
 * title     : 获取标签列表
 * path      : /web/tags
 * created at: 2021/4/11 下午10:08:37
 * updated at: 2021/4/11 下午10:10:59
 */
import { defineOptionalRoute } from '@/helpers/route';
import Article from '@/models/article';
import { GetWebTagsResp } from './default';

export default defineOptionalRoute({
    handler: async (): Promise<GetWebTagsResp[]> => {
        const articles = await Article.findAll({
            where: {
                isActive: true,
            },
        });
        const map = new Map<string, GetWebTagsResp>();
        articles.forEach(({ tags }) => {
            tags.forEach(tag => {
                let t = map.get(tag);
                if (!t) {
                    t = { name: tag, total: 0 };
                    map.set(tag, t);
                }
                t.total += 1;
            });
        });

        const tags = [...map.values()].slice(0, 100);
        tags.sort((a, b) => b.total - a.total);

        return tags;
    },
});
