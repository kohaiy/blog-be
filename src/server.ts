import * as fs from 'fs';
import * as sysPath from 'path';
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

            boots();

            Server._instance = new Hapi.Server({
                host: process.env.SERVER_HOST,
                port: process.env.SERVER_PORT,
            });

            // 添加校验
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            Server._instance.validator(require('joi'));
            await Plugins.registerAll(Server._instance);

            const routes = requireAll<Hapi.ServerRoute>({
                dirname: './modules/**/apis/**',
                fileFilter: (fielname: string) => /^default\./.test(fielname)
            });
            console.log(routes.map(({ method, path }, index) => `[${index}] ${method} \t${path}`).join('\n'));

            Server._instance.route(routes);

            const publicPath = sysPath.join(sysPath.resolve(), process.env.PUBLIC_PATH || 'public');
            Server._instance.route({
                method: 'GET',
                path: '/{path*}',
                handler(req, h: any) {
                    let filePath = sysPath.join(publicPath, req.path);
                    
                    if (fs.existsSync(filePath)) {
                        const stat = fs.statSync(filePath);
                        
                        if (stat.isFile()) { return h.file(filePath, { confine: false }); }
                        if (stat.isDirectory()) {
                            filePath = sysPath.join(publicPath, req.path, 'index.html');
                            if (fs.existsSync(filePath)) {
                                return h.file(filePath, { confine: false });
                            }
                        }
                    }
                    return h.file(sysPath.join(publicPath, 'index.html'), {
                        confine: false,
                    });
                },
                options: { auth: false },
            });

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
