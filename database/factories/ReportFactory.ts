import Factory from '@ioc:Adonis/Lucid/Factory';
import Report from 'App/Models/Report';
import { DateTime } from 'luxon';
import { faker } from '@faker-js/faker';

export const ReportFactory = Factory
    .define(Report, () => {
        return {
            reporterId: faker.datatype.number({ min: 1, max: 10 }),
            reportedUserId: faker.datatype.number({ min: 1, max: 10 }),
            reason: faker.lorem.sentence(),
            dateReported: DateTime.now(),
        }
    })
    .build();