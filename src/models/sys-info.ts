import {
    Optional,
    Model,
    DataTypes,
} from 'sequelize';
import { sequelize } from '@/helpers/db';

interface SysInfoAttributes {
    id: number;
    key: string;
    value?: string;
    remarks?: string;
}

type SysInfoCreationAttributes = Optional<SysInfoAttributes, 'id'>

export default class SysInfo extends Model<SysInfoAttributes, SysInfoCreationAttributes> implements SysInfoAttributes {
    public id!: number;
    public key!: string;
    public value!: string;
    public remarks!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

}

SysInfo.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        key: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        value: {
            type: DataTypes.TEXT,
        },
        remarks: {
            type: DataTypes.STRING,
        },
    },
    {
        tableName: 'SysInfo',
        paranoid: true,
        version: true,
        sequelize,
    },
);