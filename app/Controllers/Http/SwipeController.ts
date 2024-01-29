import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Swipe from 'App/Models/Swipe';

export default class SwipeController {
    // Get all swipes
    public async index({ response }: HttpContextContract) {
        const swipes = await Swipe.all();
        return response.json(swipes);
    }

    // Create a swipe
    public async store({ request, response }: HttpContextContract) {
        const swipeData = request.only(['userId', 'maxSwipe', 'swipes_done', 'likes', 'dislikes']);
        const swipe = await Swipe.create(swipeData);
        return response.status(201).json(swipe);
    }

    // Get a single swipe
    public async show({ params, response }: HttpContextContract) {
        const swipe = await Swipe.find(params.id);
        if (!swipe) {
            return response.status(404).json({ message: 'Swipe not found' });
        }
        return response.json(swipe);
    }

    // Update a swipe
    public async update({ params, request, response }: HttpContextContract) {
        const swipe = await Swipe.find(params.id);
        if (!swipe) {
            return response.status(404).json({ message: 'Swipe not found' });
        }
        swipe.merge(request.only(['userId', 'maxSwipe', 'swipes_done', 'likes', 'dislikes']));
        await swipe.save();
        return response.json(swipe);
    }

    // Delete a swipe
    public async destroy({ params, response }: HttpContextContract) {
        const swipe = await Swipe.find(params.id);
        if (!swipe) {
            return response.status(404).json({ message: 'Swipe not found' });
        }
        await swipe.delete();
        return response.json({ message: 'Swipe deleted' });
    }

    // Reset swipes
    public async resetSwipes({ params, response }: HttpContextContract) {
        const swipe = await Swipe.find(params.id);
        if (!swipe) {
            return response.status(404).json({ message: 'Swipe not found' });
        }

        swipe.swipes_done = 0;
        await swipe.save();

        return response.json({ message: 'Swipes reset' });
    }

    // Swipe action (like or dislike)
    public async doSwipe({ request, params, response }: HttpContextContract) {
        const swipe = await Swipe.find(params.id);
        if (!swipe) {
            return response.status(404).json({ message: 'Swipe not found' });
        }

        const action = request.input('action');
        if (action === 'like') {
            swipe.likes++;
        } else if (action === 'dislike') {
            swipe.dislikes++;
        } else {
            return response.status(400).json({ message: 'Invalid action' });
        }

        swipe.swipes_done++;
        await swipe.save();

        return response.json(swipe);
    }

    // Get swipe by user ID
    public async showByUser({ params, response }: HttpContextContract) {
        const swipe = await Swipe.query().where('user_id', params.user_id).first();
        if (!swipe) {
            return response.status(404).json({ message: 'Swipe not found for the user' });
        }

        return response.json(swipe);
    }
}
