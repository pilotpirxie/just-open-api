import { Request } from 'express';
import { ParamsDictionary, Query } from 'express-serve-static-core';
import { DatabaseHelper } from '../../mikro-orm.config';

declare global {
  namespace Express {
    export interface Request {
      db: DatabaseHelper;
    }
  }
}

export type RequestPayload = { body?: object, params?: object, query?: object, header?: object };

export interface TypedRequest<A extends RequestPayload> extends Request {
  body: Required<A['body']>,
  params: Required<A['params']> & Omit<ParamsDictionary, any>,
  query: Required<A['query']> & Omit<Query, any>
}
