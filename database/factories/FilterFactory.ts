import Factory from '@ioc:Adonis/Lucid/Factory';
import Filter from 'App/Models/Filter';
import { faker } from '@faker-js/faker';

const sexes = ['Male', 'Female', 'Other'];

export const FilterFactory = Factory
    .define(Filter, () => {
        return {
            sexe: sexes[faker.datatype.number({ min: 0, max: sexes.length - 1 })],
            age_from: faker.datatype.number({ min: 18, max: 30 }),
            age_to: faker.datatype.number({ min: 31, max: 100 }),
            location: faker.address.city(),
        }
    })
    .build();
