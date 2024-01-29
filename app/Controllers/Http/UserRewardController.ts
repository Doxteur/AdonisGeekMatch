import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import UserReward from 'App/Models/UserReward';

export default class UserRewardController {
    // Get all user rewards
    public async index({ response }: HttpContextContract) {
        const userRewards = await UserReward.all();
        return response.json(userRewards);
    }

    // Create a user reward
    public async store({ request, response }: HttpContextContract) {
        const userRewardData = request.only(['userId', 'rewardId', 'dateClaimed']);
        const userReward = await UserReward.create(userRewardData);
        return response.status(201).json(userReward);
    }

    // Get a single user reward
    public async show({ params, response }: HttpContextContract) {
        const userReward = await UserReward.find(params.id);
        if (!userReward) {
            return response.status(404).json({ message: 'User Reward not found' });
        }
        return response.json(userReward);
    }

    // Update a user reward
    public async update({ params, request, response }: HttpContextContract) {
        const userReward = await UserReward.find(params.id);
        if (!userReward) {
            return response.status(404).json({ message: 'User Reward not found' });
        }
        userReward.merge(request.only(['userId', 'rewardId', 'dateClaimed']));
        await userReward.save();
        return response.json(userReward);
    }

    // Delete a user reward
    public async destroy({ params, response }: HttpContextContract) {
        const userReward = await UserReward.find(params.id);
        if (!userReward) {
            return response.status(404).json({ message: 'User Reward not found' });
        }
        await userReward.delete();
        return response.json({ message: 'User Reward deleted successfully' });
    }
}
