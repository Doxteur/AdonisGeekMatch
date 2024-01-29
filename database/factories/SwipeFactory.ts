import Factory from '@ioc:Adonis/Lucid/Factory';
import Swipe from 'App/Models/Swipe';
import { faker } from '@faker-js/faker';

export const SwipeFactory = Factory
    .define(Swipe, () => {
        return {
            userId: faker.datatype.number({ min: 1, max: 10 }),
            maxSwipe: faker.datatype.number({ min: 50, max: 200 }),
            swipes_done: faker.datatype.number({ min: 0, max: 50 }),
            likes: faker.datatype.number({ min: 0, max: 50 }),
            dislikes: faker.datatype.number({ min: 0, max: 50 }),
        }
    })
    .build();
