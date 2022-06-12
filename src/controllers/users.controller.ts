import {
  NextFunction, Request, Response, Router,
} from 'express';
import Joi from 'joi';
import validation from '../middlewares/validation';

const router = Router();

router.get('/:letter', validation({
  query: {
    letter: Joi.string().min(1).required(),
  },
}), async (req, res, next) => {
  try {
    const users = await req.db.users.find({
      name: {
        $like: `%${req.params.letter}%`,
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
