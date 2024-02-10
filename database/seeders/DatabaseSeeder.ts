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

    }
}
