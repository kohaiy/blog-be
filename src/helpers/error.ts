import * as Joi from 'joi';

export class Internal extends Error { }
export class BadRequest extends Error { }
export class Unauthorized extends Error { }
export class NotFound extends Error { }

export const errorResponse = {
    400: Joi.object({
        statusCode: Joi.number().default(400),
        error: Joi.string().default('Bad Request'),
        message: Joi.string(),
    }).label('BadRequest'),
    401: Joi.object({
        statusCode: Joi.number().default(401),
        error: Joi.string().default('Unauthorized'),
        message: Joi.string(),
    }).label('Unauthorized'),
    404: Joi.object({
        statusCode: Joi.number().default(404),
        error: Joi.string().default('Not Found'),
        message: Joi.string(),
    }).label('NotFound'),
    500: Joi.object({
        statusCode: Joi.number().default(500),
        error: Joi.string().default('Internal Server Error'),
        message: Joi.string(),
    }).label('InternalServerError'),
};