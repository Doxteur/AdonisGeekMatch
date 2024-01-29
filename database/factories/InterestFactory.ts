import Factory from '@ioc:Adonis/Lucid/Factory';
import Interest from 'App/Models/Interest';
import { faker } from '@faker-js/faker';

export const InterestFactory = Factory
    .define(Interest, () => {
        return {
            interestType: faker.lorem.word(),
            interestValue: faker.lorem.words(3),
        }
    })
    .build();
