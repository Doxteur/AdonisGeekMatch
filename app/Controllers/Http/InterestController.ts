import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Interest from 'App/Models/Interest';

export default class InterestController {
    // Get all interests
    public async index({ response }: HttpContextContract) {
        const interests = await Interest.all();
        return response.json(interests);
    }

    // Create an interest
    public async store({ request, response }: HttpContextContract) {
        const interestData = request.only(['interestType', 'interestValue']);
        const interest = await Interest.create(interestData);
        return response.status(201).json(interest);
    }

    // Get a single interest
    public async show({ params, response }: HttpContextContract) {
        const interest = await Interest.find(params.id);
        if (!interest) {
            return response.status(404).json({ message: 'Interest not found' });
        }
        return response.json(interest);
    }

    // Update an interest
    public async update({ params, request, response }: HttpContextContract) {
        const interest = await Interest.find(params.id);
        if (!interest) {
            return response.status(404).json({ message: 'Interest not found' });
        }
        interest.merge(request.only(['interestType', 'interestValue']));
        await interest.save();
        return response.json(interest);
    }

    // Delete an interest
    public async destroy({ params, response }: HttpContextContract) {
        const interest = await Interest.find(params.id);
        if (!interest) {
            return response.status(404).json({ message: 'Interest not found' });
        }
        await interest.delete();
        return response.json({ message: 'Interest deleted' });
    }
}
