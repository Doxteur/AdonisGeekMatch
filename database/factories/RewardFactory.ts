import Factory from '@ioc:Adonis/Lucid/Factory';
import Reward from 'App/Models/Reward';
import { faker } from '@faker-js/faker';

export const RewardFactory = Factory
    .define(Reward, () => {
        return {
            rewardType: faker.lorem.word(),
            rewardContent: faker.lorem.paragraph(),
        }
    })
    .build();
