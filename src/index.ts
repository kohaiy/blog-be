if (process.env.NODE_ENV === 'production') {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require('module-alias')();
}
import Server from '@/server';

Server.start();
