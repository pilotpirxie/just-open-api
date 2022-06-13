import { Router } from 'express';
import Joi from 'joi';
import validation from '../middlewares/validation';
import { TypedRequest } from '../types/express';

const router = Router();

const schema = {
  query: {
    letter: Joi.string().length(1).required(),
  },
};

router.get('/', validation(schema), async (req: TypedRequest<typeof schema>, res, next) => {
  try {
    const { letter } = req.query;
    const users = await req.db.users.find({
      name: {
        $like: `%${letter}%`,
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

router.post('/', async (req, res, next) => {
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
