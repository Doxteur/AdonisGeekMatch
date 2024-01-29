import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Profile from 'App/Models/Profile';

export default class ProfileController {
    // Get all profiles
    public async index({ response }: HttpContextContract) {
        const profiles = await Profile.all();
        return response.json(profiles);
    }

    // Create a profile
    public async store({ request, response }: HttpContextContract) {
        const profileData = request.only([
            'photo1',
            'photo2',
            'bio',
            'sexe',
            'console',
            'favoriteGames',
            'storyContent',
            'theme',
            'customColor',
            'customIcon',
            'userId'
        ]);
        const profile = await Profile.create(profileData);
        return response.status(201).json(profile);
    }

    // Get a single profile
    public async show({ params, response }: HttpContextContract) {
        const profile = await Profile.find(params.id);
        if (!profile) {
            return response.status(404).json({ message: 'Profile not found' });
        }
        return response.json(profile);
    }

    // Update a profile
    public async update({ params, request, response }: HttpContextContract) {
        const profile = await Profile.find(params.id);
        if (!profile) {
            return response.status(404).json({ message: 'Profile not found' });
        }
        const profileData = request.only([
            'photo1',
            'photo2',
            'bio',
            'sexe',
            'console',
            'favoriteGames',
            'storyContent',
            'theme',
            'customColor',
            'customIcon'
        ]);
        profile.merge(profileData);
        await profile.save();
        return response.json(profile);
    }

    // Delete a profile
    public async destroy({ params, response }: HttpContextContract) {
        const profile = await Profile.find(params.id);
        if (!profile) {
            return response.status(404).json({ message: 'Profile not found' });
        }
        await profile.delete();
        return response.json({ message: 'Profile deleted' });
    }

    // Get a profile by user ID
    public async showByUser({ params, response }: HttpContextContract) {
        const profile = await Profile.query().where('user_id', params.userId).first();
        if (!profile) {
            return response.status(404).json({ message: 'Profile not found' });
        }
        return response.json(profile);
    }

    // Filter profiles
    public async filter({ request, response }: HttpContextContract) {
        const query = Profile.query();

        if (request.input('theme')) {
            query.where('theme', request.input('theme'));
        }

        const profiles = await query.exec();
        return response.json(profiles);
    }
}
