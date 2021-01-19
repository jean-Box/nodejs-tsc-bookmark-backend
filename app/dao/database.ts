import {Sequelize} from 'sequelize';

export const database = new Sequelize({
    database: 'bookmark',
    dialect: 'sqlite',
    username: 'root',
    password: '',
    storage: ':memory:',
});