import express, { Express } from 'express';
import { RequestContext } from '@mikro-orm/core';
import { errorHandler } from './middlewares/errors';
import users from './controllers/users.controller';
import { initDatabase } from './mikro-orm.config';

const app: Express = express();

app.set('port', process.env.PORT || 3000);

(async () => {
  try {
    const db = await initDatabase();

    app.use((req, res, next) => {
      req.db = db;
      RequestContext.create(db.orm.em, next);
    });

    app.use('/users', users);

    app.use(errorHandler);

    app.listen(app.get('port'), () => {
      // eslint-disable-next-line no-console
      console.log(`Server is running at http://localhost:${app.get('port')}`);
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  }
})();
