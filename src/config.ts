import * as HapiSwagger from 'hapi-swagger';
import { Options as SequelizeOptions } from 'sequelize';
import logger from '@/helpers/logger';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const pack = require('../package');

const swaggerOptions: HapiSwagger.RegisterOptions = {
    info: {
        title: `${pack.name} API Documentation`,
        version: pack.version,
        contact: {
            name: 'kohai',
            email: 'i@kohai.top',
        },
    },
    grouping: 'tags',
    sortEndpoints: 'ordered',
    securityDefinitions: {
        Bearer: {
            type: 'apiKey',
            name: 'Authorization',
            in: 'header',
            'x-keyPrefix': 'Bearer ',
        },
    },
    security: [{ Bearer: [] }],
    // documentationPath: ''
};

export const sequelizeOptions: SequelizeOptions = {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 3306,
    database: process.env.DB_DB,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    dialect: 'mysql',
    timezone: '+08:00',
    logging: (msg) => logger.debug(msg),
};

export default {
    swagger: {
        options: swaggerOptions,
    },
    sequelizeOptions,
};
