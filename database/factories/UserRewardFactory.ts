import Factory from '@ioc:Adonis/Lucid/Factory';
import UserReward from 'App/Models/UserReward';
import { DateTime } from 'luxon';

export const UserRewardFactory = Factory
    .define(UserReward, ({ faker }) => {
        return {
            userId: faker.datatype.number(10),
            rewardId: faker.datatype.number(10),
            dateClaimed: DateTime.now(),
        }
    })
    .build();
