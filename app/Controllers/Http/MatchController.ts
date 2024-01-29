import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Matche from 'App/Models/Matche';
//import Auth from '@ioc:Adonis/Addons/Auth';

export default class MatchController {
    // Get all matches
    public async index({ response }: HttpContextContract) {
        const matches = await Matche.all();
        return response.json(matches);
    }

    // Create a match
    public async store({ request, response }: HttpContextContract) {
        const matchData = request.only(['user1_id', 'user2_id', 'dateMatched']);
        const match = await Matche.create(matchData);
        return response.status(201).json(match);
    }

    // Get a single match
    public async show({ params, response }: HttpContextContract) {
        const match = await Matche.find(params.id);
        if (!match) {
            return response.status(404).json({ message: 'Match not found' });
        }
        return response.json(match);
    }

    // Update a match
    public async update({ params, request, response }: HttpContextContract) {
        const match = await Matche.find(params.id);
        if (!match) {
            return response.status(404).json({ message: 'Match not found' });
        }
        match.merge(request.only(['user1_id', 'user2_id', 'dateMatched']));
        await match.save();
        return response.json(match);
    }

    // Delete a match
    public async destroy({ params, response }: HttpContextContract) {
        const match = await Matche.find(params.id);
        if (!match) {
            return response.status(404).json({ message: 'Match not found' });
        }
        await match.delete();
        return response.json({ message: 'Match deleted' });
    }

    // Get matches for a user
    public async matchesForUser({ params, response }: HttpContextContract) {
        const matches = await Matche.query()
            .where('user1_id', params.userId)
            .orWhere('user2_id', params.userId)
            .exec();
        return response.json(matches);
    }

    // "Unmatch" a person
    public async unmatch({ auth, params, response }: HttpContextContract) {
        const match = await Matche.find(params.id);
        if (!match) {
            return response.status(404).json({ message: 'Match not found' });
        }

        const user = await auth.authenticate();
        if (user.id !== match.user1_id && user.id !== match.user2_id) {
            return response.status(403).json({ message: 'Unauthorized action' });
        }

        await match.delete();
        return response.json({ message: 'Unmatched successfully' });
    }
}
