import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import UserInterest from 'App/Models/UserInterest';

export default class UserInterestController {
    // Get all user interests
    public async index({ response }: HttpContextContract) {
        const userInterests = await UserInterest.all();
        return response.json(userInterests);
    }

    // Create a user interest
    public async store({ request, response }: HttpContextContract) {
        const userInterestData = request.only(['userId', 'interestId']);
        const userInterest = await UserInterest.create(userInterestData);
        return response.status(201).json(userInterest);
    }

    // Get a single user interest
    public async show({ params, response }: HttpContextContract) {
        const userInterest = await UserInterest.find(params.id);
        if (!userInterest) {
            return response.status(404).json({ message: 'User Interest not found' });
        }
        return response.json(userInterest);
    }

    // Update a user interest
    public async update({ params, request, response }: HttpContextContract) {
        const userInterest = await UserInterest.find(params.id);
        if (!userInterest) {
            return response.status(404).json({ message: 'User Interest not found' });
        }
        userInterest.merge(request.only(['userId', 'interestId']));
        await userInterest.save();
        return response.json(userInterest);
    }

    // Delete a user interest
    public async destroy({ params, response }: HttpContextContract) {
        const userInterest = await UserInterest.find(params.id);
        if (!userInterest) {
            return response.status(404).json({ message: 'User Interest not found' });
        }
        await userInterest.delete();
        return response.json({ message: 'User Interest deleted successfully' });
    }
}
