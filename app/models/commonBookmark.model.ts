import { Model, DataTypes } from 'sequelize';
import { database } from '../dao/database';

export class Common extends Model {
    public id!: number;
    public url!: string;
    public title!: string;
    public authorName!: string;
    public tags!: string;
    public width!: number;
    public height!: number;
    public duration!: number;
    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export interface CommonInterface {
    url: string;
    title: string;
    authorName: string;
    width: number;
    height: number;
    duration: number;
    tags: string;
}

Common.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        authorName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        width: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        height: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        duration: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        tags: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },
    {
        // underscored: true,
        tableName: "common",
        sequelize: database // this bit is important
    }
);

// Common.hasOne(Picture);
// Common.hasOne(Video);

Common.sync({ force: true }).then(() => console.log("Common table created"))