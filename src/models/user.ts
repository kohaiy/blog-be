import {
    Optional,
    Model,
    DataTypes,
} from 'sequelize';
import { sequelize } from '@/helpers/db';

interface UserAttributes {
    id: number;
    name: string;
    email: string;
    password: string;
    slat: string;
}

type UserCreationAttributes = Optional<UserAttributes, 'id'>

export default class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number;
    public name!: string;
    public email!: string;
    public password!: string;
    public slat!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

}

User.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        },
        email: {
            type: new DataTypes.STRING(255),
            allowNull: false,
        },
        password: {
            type: new DataTypes.STRING(255),
            allowNull: false,
        },
        slat: {
            type: new DataTypes.STRING(50),
            allowNull: false,
        },
    },
    {
        tableName: 'user',
        paranoid: true,
        version: true,
        sequelize,
    },
);