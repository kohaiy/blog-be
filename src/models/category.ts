import {
    Optional,
    Model,
    DataTypes,
} from 'sequelize';
import { sequelize } from '@/helpers/db';

interface CategoryAttributes {
    id: number;
    name: string;
    pid: number | null;
    icon: string | null;
    description: string | null;
}

type CategoryCreationAttributes = Optional<CategoryAttributes, 'id'>

export default class Category extends Model<CategoryAttributes, CategoryCreationAttributes> implements CategoryAttributes {
    public id!: number;
    public name!: string;
    public pid!: number | null;
    public icon!: string | null;
    public description!: string | null;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

}

Category.init(
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
        pid: {
            type: DataTypes.INTEGER.UNSIGNED,
        },
        icon: {
            type: new DataTypes.STRING(50),
        },
        description: {
            type: new DataTypes.STRING(255),
        },
    },
    {
        tableName: 'category',
        paranoid: true,
        version: true,
        sequelize,
    },
);