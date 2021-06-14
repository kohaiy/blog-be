import * as Hapi from '@hapi/hapi';
import logger from '@/helpers/logger';
import Config from '@/config';
import AuthPlugin from './auth';

export default class Plugins {
    public static async swagger(server: Hapi.Server): Promise<void> {
        logger.info('Plugins - register swagger ui');

        try {
            await Plugins.register(server, [
                require('@hapi/vision'),
                require('@hapi/inert'),
                {
                    options: Config.swagger.options,
                    plugin: require('hapi-swagger'),
                },
            ]);
        } catch (e) {
            logger.error('Plugins - register swagger ui, err: ', e);
            throw e;
        }
    }

    public static async registerAll(server: Hapi.Server): Promise<Error | any> {
        if (process.env.NODE_ENV === 'development') {
            await Plugins.swagger(server);
        } else {
            await Plugins.register(server, [
                require('@hapi/vision'),
                require('@hapi/inert'),
            ]);
        }
        await server.register(AuthPlugin);
    }

    private static async register(
        server: Hapi.Server,
        plugin: any
    ): Promise<void> {
        return server.register(plugin);
    }
}