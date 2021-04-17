import * as Hapi from '@hapi/hapi';
import * as Dotenv from 'dotenv';
import Plugins from '@/plugins';
import requireAll from '@/helpers/require-all';
import logger from '@/helpers/logger';
import boots from '@/boots';

export default class Server {
    private static _instance: Hapi.Server;

    public static async start(): Promise<Hapi.Server> {
        try {
            Dotenv.config();

            await boots();

            Server._instance = new Hapi.Server({
                host: process.env.SERVER_HOST,
                port: process.env.SERVER_PORT,
            });

            // 添加校验
            Server._instance.validator(require('joi'));

            const routes = requireAll<Hapi.ServerRoute>({
                dirname: './modules/**/apis/**',
                fileFilter: (fielname: string) => /^default\./.test(fielname)
            });
            console.log(routes.map(({ method, path }, index) => `[${index}] ${method} \t${path}`).join('\n'));

            await Server._instance.route(routes);

            await Plugins.registerAll(Server._instance);

            await Server._instance.start();
            logger.info(
                `Server - Up and running at http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`
            );
            logger.info(
                `Server - Visit http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/documentation for Swagger docs`
            );
            return Server._instance;
        } catch (e) {
            logger.error(e);
            throw e;
        }

    }

    public static instance(): Hapi.Server {
        return Server._instance;
    }
}
