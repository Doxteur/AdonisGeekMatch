import Factory from '@ioc:Adonis/Lucid/Factory';
import Message from 'App/Models/Message';
import { faker } from '@faker-js/faker';
import { DateTime } from 'luxon';

export const MessageFactory = Factory
    .define(Message, () => {
        return {
            content: faker.lorem.sentence(),
            timestamp: DateTime.now(),
            senderId: faker.datatype.number({ min: 1, max: 10 }),
            receiverId: faker.datatype.number({ min: 1, max: 10 }),
        }
    })
    .build();
