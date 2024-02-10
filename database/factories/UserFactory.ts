import Factory from '@ioc:Adonis/Lucid/Factory';
import User from 'App/Models/User';
import Hash from '@ioc:Adonis/Core/Hash';
import { ProfileFactory } from '../factories/ProfileFactory';
import { SwipeFactory } from '../factories/SwipeFactory';

export const UserFactory = Factory
  .define(User, async ({ faker }) => {
    return {
      email: faker.internet.email(),
      password: 'password',
      first_name: faker.name.firstName(),
      name: faker.name.lastName(),
    }
  })
  .relation('profile', () => ProfileFactory)
  .relation('swipe', () => SwipeFactory)
  .build();
