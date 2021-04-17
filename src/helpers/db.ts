import {
    Sequelize,
    Transaction
} from 'sequelize';
import { sequelizeOptions } from '@/config';

export const sequelize = new Sequelize(sequelizeOptions);

// 开启一个事务
export async function openTransaction<T>(handler: (transaction: Transaction) => Promise<T>) {
    let tx;
    try {
        tx = await sequelize.transaction();
        const res = await handler(tx);
        await tx.commit();
        return res;
    } catch (err) {
        await tx?.rollback();
        throw err;
    }
};