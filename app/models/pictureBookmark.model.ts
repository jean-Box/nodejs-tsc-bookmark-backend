import { Model, DataTypes } from 'sequelize';
import { database } from '../dao/database';

export class Picture extends Model {
    public id!: number;
    public width!: number;
    public height!: number;
    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export interface PictureInterface {
    width: number;
    height: number;
}

Picture.init(
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
        }
    },
    {
        // underscored: true,
        tableName: "picture",
        sequelize: database
    }
);


Picture.sync({ force: true }).then(() => console.log("picture table created"));