import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Reward from 'App/Models/Reward';

export default class RewardController {
    // Get all rewards
    public async index({ response }: HttpContextContract) {
        const rewards = await Reward.all();
        return response.json(rewards);
    }

    // Create a reward
    public async store({ request, response }: HttpContextContract) {
        const rewardData = request.only(['rewardType', 'rewardContent']);
        const reward = await Reward.create(rewardData);
        return response.status(201).json(reward);
    }

    // Get a single reward
    public async show({ params, response }: HttpContextContract) {
        const reward = await Reward.find(params.id);
        if (!reward) {
            return response.status(404).json({ message: 'Reward not found' });
        }
        return response.json(reward);
    }

    // Update a reward
    public async update({ params, request, response }: HttpContextContract) {
        const reward = await Reward.find(params.id);
        if (!reward) {
            return response.status(404).json({ message: 'Reward not found' });
        }
        reward.merge(request.only(['rewardType', 'rewardContent']));
        await reward.save();
        return response.json(reward);
    }

    // Delete a reward
    public async destroy({ params, response }: HttpContextContract) {
        const reward = await Reward.find(params.id);
        if (!reward) {
            return response.status(404).json({ message: 'Reward not found' });
        }
        await reward.delete();
        return response.json({ message: 'Reward deleted' });
    }
}
