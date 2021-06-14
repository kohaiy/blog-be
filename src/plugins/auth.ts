import { ServerRegisterPluginObject, ServerAuthScheme } from '@hapi/hapi';
import { unauthorized } from '@hapi/boom';
import User from '@/models/user';
import DataHelper from '@/helpers/data';
import logger from '@/helpers/logger';

const AuthScheme: ServerAuthScheme = function () {
    return {
        authenticate: async function (request, h) {
            const token = request.headers.authorization;

            if (!token) {
                throw unauthorized('Token not found');
            }

            try {
                const { id } = DataHelper.verifyToken(token) as { id: number };
                const user = await User.findByPk(id);
                if (!user) {
                    throw unauthorized('Token invalidate.');
                }
                return h.authenticated({ credentials: { id } });
            } catch (e) {
                logger.error(e);
                throw unauthorized('Token invalidate.');
            }

        }
    };
};

const AuthPlugin: ServerRegisterPluginObject<any> = {
    plugin: {
        name: 'Auth',
        register: (server) => {
            server.auth.scheme('AuthScheme', AuthScheme);
            server.auth.strategy('AuthScheme', 'AuthScheme');
            server.auth.default('AuthScheme');
        }
    }

};

export default AuthPlugin;