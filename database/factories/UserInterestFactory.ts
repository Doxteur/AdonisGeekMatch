import Factory from '@ioc:Adonis/Lucid/Factory';
import UserInterest from 'App/Models/UserInterest';
import { faker } from '@faker-js/faker';

export const UserInterestFactory = Factory
    .define(UserInterest, () => {
        return {
            userId: faker.datatype.number({ min: 1, max: 10 }),
            interestId: faker.datatype.number({ min: 1, max: 10 }),
        }
    })
    .build();
