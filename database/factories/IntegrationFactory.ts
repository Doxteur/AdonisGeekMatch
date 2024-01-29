import Factory from '@ioc:Adonis/Lucid/Factory';
import Integration from 'App/Models/Integration';
import { faker } from '@faker-js/faker';

const platforms = ['Platform1', 'Platform2', 'Platform3'];

export const IntegrationFactory = Factory
    .define(Integration, () => {
        return {
            userId: faker.datatype.number({ min: 1, max: 10 }),
            platform: platforms[faker.datatype.number({ min: 0, max: platforms.length - 1 })],
            integrationToken: faker.datatype.uuid(),
            integrationDetails: faker.lorem.sentence(),
        }
    })
    .build();
