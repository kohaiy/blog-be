import {
    Optional,
    Model,
    DataTypes,
} from 'sequelize';
import { sequelize } from '@/helpers/db';

interface ArticleStatAttributes {
    id: number;
    viewTotal: number;
    likeTotal: number;
}

type ArticleStatCreationAttributes = Optional<ArticleStatAttributes, 'id'>

export default class ArticleStat extends Model<ArticleStatAttributes, ArticleStatCreationAttributes> implements ArticleStatAttributes {
    public id!: number;
    public viewTotal!: number;
    public likeTotal!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

}

ArticleStat.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        viewTotal: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: 0,
        },
        likeTotal: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: 0,
        }
    },
    {
        tableName: 'ArticleStat',
        paranoid: true,
        version: true,
        sequelize,
    },
);