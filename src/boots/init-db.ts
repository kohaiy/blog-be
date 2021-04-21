import * as Dotenv from 'dotenv';
import User from '@/models/user';
import Category from '@/models/category';
import Article from '@/models/article';
import ArticleStat from '@/models/article-stat';
import FriendLink from '@/models/friend-link';
import DataHelper from '@/helpers/data';

async function initAccount() {
    Dotenv.config();
    const { ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASS } = process.env;
    if (ADMIN_NAME && ADMIN_EMAIL && ADMIN_PASS) {
        const userCount = await User.count({ where: { name: ADMIN_NAME } });
        if (userCount === 0) {
            const slat = DataHelper.generateSlat();
            const password = DataHelper.generatePassword(ADMIN_PASS, slat);
            const user = new User({
                name: ADMIN_NAME,
                email: ADMIN_EMAIL,
                password,
                slat,
            });
            await user.save();
        }
    }
}

async function initDB() {
    await Promise.all([
        User.sync({ force: false }),
        Category.sync({ force: false }),
        Article.sync({ force: false }),
        ArticleStat.sync({ force: false }),
        FriendLink.sync({ force: false }),
    ]);
    await initAccount();
}

export default initDB;
