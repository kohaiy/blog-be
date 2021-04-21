import {
    Optional,
    Model,
    DataTypes,
} from 'sequelize';
import { sequelize } from '@/helpers/db';

interface FriendLinkAttributes {
    id: number;
    name: string;
    description: string;
    linkUrl: string;
    logoUrl: string;
    isActive: boolean;
    order: number;
}

interface FriendLinkCreationAttributes extends Optional<FriendLinkAttributes, 'id'> { }

export default class FriendLink extends Model<FriendLinkAttributes, FriendLinkCreationAttributes> implements FriendLinkAttributes {
    public id!: number;
    public name!: string;
    public description!: string;
    public linkUrl!: string;
    public logoUrl!: string;
    public isActive!: boolean;
    public order!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

}

FriendLink.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        linkUrl: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        logoUrl: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        order: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        }
    },
    {
        tableName: 'FriendLink',
        paranoid: true,
        version: true,
        sequelize,
    },
);