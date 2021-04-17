if (process.env.NODE_ENV === 'production') {
    require('module-alias')();
}
import Server from '@/server';

Server.start();
