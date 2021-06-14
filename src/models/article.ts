import {
    Optional,
    Model,
    DataTypes,
} from 'sequelize';
import { sequelize } from '@/helpers/db';

export interface ArticleAttributes {
    id: number;
    userId: number;
    categoryId: number;
    articleStatId: number;
    name: string;
    linkName: string;
    content: string;
    tags: string[];
    abstract: string;
    isActive: boolean;
}

type ArticleCreationAttributes = Optional<ArticleAttributes, 'id'>

export default class Article extends Model<ArticleAttributes, ArticleCreationAttributes> implements ArticleAttributes {
    public id!: number;
    public userId!: number;
    public categoryId!: number;
    public articleStatId!: number;
    public name!: string;
    public linkName!: string;
    public content!: string;
    public tags!: string[];
    public abstract!: string;
    public isActive!: boolean;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

}

Article.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        categoryId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        articleStatId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        name: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        },
        linkName: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        },
        content: {
            type: new DataTypes.TEXT,
            allowNull: false,
        },
        tags: {
            type: DataTypes.JSON,
            allowNull: false,
            defaultValue: () => [],
        },
        abstract: {
            type: DataTypes.STRING(500),
            allowNull: false,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    },
    {
        tableName: 'Article',
        paranoid: true,
        version: true,
        sequelize,
    },
);