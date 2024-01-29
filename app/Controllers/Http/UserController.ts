import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import User from 'App/Models/User';

export default class UsersController {
    // Get all users
    public async index({ response }: HttpContextContract) {
        const users = await User.all();
        return response.json(users);
    }

    // Get current user
    public async me({ auth, response }: HttpContextContract) {
        if (!auth.user) {
            return response.status(401).json({ error: 'You are not logged in.' });
        }
        return response.json(auth.user);
    }

    // Create a user
    public async store({ request, response }: HttpContextContract) {
        const userData = request.only(['first_name, name', 'email', 'password', 'rememberMeToken']);
        const user = await User.create(userData);
        return response.status(201).json(user);
    }

    // Get a single user
    public async show({ params, response }: HttpContextContract) {
        const user = await User.find(params.id);
        if (!user) {
            return response.status(404).json({ message: 'User not found' });
        }
        return response.json(user);
    }

    // Update a user
    public async update({ params, request, response }: HttpContextContract) {
        const user = await User.find(params.id);
        if (!user) {
            return response.status(404).json({ message: 'User not found' });
        }
        user.merge(request.only(['first_name, name', 'email', 'password', 'rememberMeToken']));
        await user.save();
        return response.json(user);
    }

    // Delete a user
    public async destroy({ params, response }: HttpContextContract) {
        const user = await User.find(params.id);
        if (!user) {
            return response.status(404).json({ message: 'User not found' });
        }
        await user.delete();
        return response.json({ message: 'User deleted' });
    }

    // Search for users
    public async search({ request, response }: HttpContextContract) {
        const name = request.input('name');
        const users = await User.query()
            .where('name', 'like', `%${name}%`);
        return response.json(users);
    }
}
