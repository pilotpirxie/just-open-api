import {
  NextFunction, Request, Response, Router,
} from 'express';
import Joi from 'joi';
import { ParamsDictionary, Query } from 'express-serve-static-core';
import validation from '../middlewares/validation';

const router = Router();

export type RequestPayload = { body?: object, params?: object, query?: object };

export interface TypedRequest<A extends RequestPayload> extends Request {
  body: Required<A['body']>,
  params: Required<A['params']> & Omit<ParamsDictionary, any>,
  query: Required<A['query']> & Omit<Query, any>
}

router.get('/', validation({
  query: {
    letter: Joi.string().min(1).required(),
  },
  body: {
    abc: Joi.string().min(0).required(),
  },
}), async (req: TypedRequest<{
  query: {
    letter: string
  },
  body: {
    abc: string,
  }
}>, res, next) => {
  try {
    const users = await req.db.users.find({
      name: {
        $like: `%${req.query.letter}${req.body.abc}%`,
      },
    }, {
      fields: ['name'],
      orderBy: [{ createdAt: -1 }],
      limit: 3,
    });

    return res.json(users);
  } catch (e) {
    return next(e);
  }
});

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await req.db.users.create({
      name: Date.now().toString(16),
      email: 'jo',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await req.db.orm.em.persistAndFlush(user);

    return res.json(user);
  } catch (e) {
    return next(e);
  }
});

export default router;
