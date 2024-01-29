import Factory from '@ioc:Adonis/Lucid/Factory';
import Match from 'App/Models/Matche';
import { faker } from '@faker-js/faker';
import { DateTime } from 'luxon';

export const MatchFactory = Factory
    .define(Match, () => {
        return {
            user1_id: faker.datatype.number({ min: 1, max: 10 }),
            user2_id: faker.datatype.number({ min: 1, max: 10 }),
            dateMatched: DateTime.now(),
        }
    })
    .build();
