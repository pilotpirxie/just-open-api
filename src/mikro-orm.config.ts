import { EntityRepository, MikroORM, Options } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { User } from './entities';

const options: Options<PostgreSqlDriver> = {
  type: 'postgresql',
  dbName: 'dynamicdb',
  user: 'dynamicuser',
  password: 'mysecretpassword',
  host: 'localhost',
  port: 5432,
  entities: [User],
  forceUtcTimezone: true,
  debug: process.env.NODE_ENV !== 'production',
};

export default options;

export type DatabaseHelper = {
  users: EntityRepository<User>;
  orm: MikroORM<PostgreSqlDriver>;
}

export async function initDatabase(): Promise<DatabaseHelper> {
  const orm = await MikroORM.init<PostgreSqlDriver>(options);

  return {
    orm,
    users: orm.em.getRepository(User),
  };
}
