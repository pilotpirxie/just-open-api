import {
  NextFunction, Request, Response, Router,
} from 'express';

const router = Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await req.db.users.find({
      name: {
        $like: '%a%',
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
