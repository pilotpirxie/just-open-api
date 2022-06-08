import { DatabaseHelper } from '../../mikro-orm.config';

declare global {
  namespace Express {
    export interface Request {
      db: DatabaseHelper;
    }
  }
}
