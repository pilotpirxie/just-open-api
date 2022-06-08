import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'users' })
export class User {
  @PrimaryKey()
    id!: number;

  @Property()
    name!: string;

  @Property()
    email!: string;

  @Property({
    defaultRaw: 'NOW()',
  })
    createdAt: Date = new Date();

  @Property({
    defaultRaw: 'NOW()',
    onUpdate: () => new Date(),
  })
    updatedAt: Date = new Date();
}
