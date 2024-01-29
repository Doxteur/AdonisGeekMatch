import Factory from '@ioc:Adonis/Lucid/Factory';
import Profile from 'App/Models/Profile';
import { faker } from '@faker-js/faker';

const sexes = ['Male', 'Female', 'Other'];
const consoles = ['Xbox', 'PlayStation', 'PC', 'Switch'];

export const ProfileFactory = Factory
    .define(Profile, () => {
        return {
            photo1: faker.image.imageUrl(),
            photo2: faker.image.imageUrl(),
            bio: faker.lorem.sentence(),
            sexe: sexes[faker.datatype.number({ min: 0, max: sexes.length - 1 })],
            console: [consoles[faker.datatype.number({ min: 0, max: consoles.length - 1 })]],
            favoriteGames: faker.lorem.words(3),
            storyContent: faker.lorem.paragraph(),
            theme: faker.lorem.word(),
            customColor: faker.internet.color(),
            customIcon: faker.image.imageUrl(),
            userId: faker.datatype.number({ min: 1, max: 10 }),
        }
    })
    .build();
