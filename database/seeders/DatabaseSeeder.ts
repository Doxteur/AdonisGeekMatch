import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import { UserFactory } from 'Database/factories/UserFactory';
import { UserInterestFactory } from 'Database/factories/UserInterestFactory';
import { MessageFactory } from 'Database/factories/MessageFactory';
import { ProfileFactory } from 'Database/factories/ProfileFactory';
import { UserRewardFactory } from 'Database/factories/UserRewardFactory';
import { ReportFactory } from 'Database/factories/ReportFactory';
import { RewardFactory } from 'Database/factories/RewardFactory';
import { SwipeFactory } from 'Database/factories/SwipeFactory';
import { MatchFactory } from 'Database/factories/MatchFactory';
import { InterestFactory } from 'Database/factories/InterestFactory';
import { IntegrationFactory } from 'Database/factories/IntegrationFactory';
import { FilterFactory } from 'Database/factories/FilterFactory';

export default class DatabaseSeeder extends BaseSeeder {
    public async run() {
        // Créer un utilisateur spécifique
        await UserFactory.merge({
            email: 'jimmy@example.com',
        }).create();

        // Créer des utilisateurs avec des données liées
        const users = await UserFactory
            .with('profile', 1)
            .with('swipe', 1)
            .createMany(10);

        // Utiliser UserInterestFactory pour chaque utilisateur
        for (const user of users) {
            await UserInterestFactory.merge({ userId: user.id }).createMany(3);
        }

        await MessageFactory.createMany(20);
        await ProfileFactory.createMany(10);
        await UserRewardFactory.createMany(10);
        await ReportFactory.createMany(10);
        await RewardFactory.createMany(10);
        await SwipeFactory.createMany(10);
        await MatchFactory.createMany(10);
        await InterestFactory.createMany(15);
        await IntegrationFactory.createMany(15);
        await FilterFactory.createMany(15);
    }
}
