import { Model, DataTypes } from 'sequelize';
import { database } from '../dao/database';

export class Video extends Model {
    public id!: number;
    public width!: number;
    public height!: number;
    public duree!: string;
    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export interface VideoInterface {
    width: number;
    height: number;
    duree: string;
}

Video.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        width: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        height: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        duree: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        tableName: "video",
        sequelize: database
    }
);

Video.sync({ force: true }).then(() => console.log("Video table created"));