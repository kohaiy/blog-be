import { ServerRoute, RouteOptions, Lifecycle, Request, ResponseToolkit } from '@hapi/hapi';
import { notFound, badRequest, badImplementation } from '@hapi/boom';
import { errorResponse, NotFound, BadRequest } from '@/helpers/error';
import logger from '@/helpers/logger';

export function defineRoute(route: ServerRoute): ServerRoute {
    route.path = `/api${route.path}`;
    if (!(route.options instanceof Function)) {
        const routeOptions = route.options as RouteOptions;
        if (routeOptions.response && routeOptions.response.status) {
            routeOptions.response.status = {
                ...routeOptions.response.status,
                ...errorResponse,
            };
            routeOptions.response.failAction = (request, h, error) => {
                logger.error(error?.message);
                return badImplementation();
            };
            if (routeOptions.validate) {
                routeOptions.validate.failAction = (request, h, error) => {
                    logger.error(error?.message);
                    return badRequest(error?.message);
                };
            }
        }
    }
    if (route.handler && route.handler instanceof Function) {
        const handler = route.handler as Lifecycle.Method;
        route.handler = (request: Request, h: ResponseToolkit, err?: Error | undefined) => {
            return Promise
                .resolve(handler.apply(null, [request, h, err]))
                .catch((error: Error) => {
                    const { method, path, params, query, payload } = request;
                    logger.error(JSON.stringify({ method, path, params, query, payload }, null, 2));
                    logger.error(error.stack);
                    if (error instanceof NotFound) {
                        return notFound(error.message);
                    }
                    if (error instanceof BadRequest) {
                        return badRequest(error.message);
                    }
                    return badImplementation(error.message);
                });
        }
    }
    return route;
};

export interface OptionalRoute {
    handler: ServerRoute['handler'];
    options?: ServerRoute['options'];
}
export function defineOptionalRoute(route: OptionalRoute): OptionalRoute {
    return route;
};
