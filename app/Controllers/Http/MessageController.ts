import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Message from 'App/Models/Message';

export default class MessageController {
    // Get all messages
    public async index({ response }: HttpContextContract) {
        const messages = await Message.all();
        return response.json(messages);
    }

    // Create a message
    public async store({ request, response }: HttpContextContract) {
        const messageData = request.only(['content', 'timestamp', 'senderId', 'receiverId']);
        const message = await Message.create(messageData);
        return response.status(201).json(message);
    }

    // Get a single message
    public async show({ params, response }: HttpContextContract) {
        const message = await Message.find(params.id);
        if (!message) {
            return response.status(404).json({ message: 'Message not found' });
        }
        return response.json(message);
    }

    // Update a message
    public async update({ params, request, response }: HttpContextContract) {
        const message = await Message.find(params.id);
        if (!message) {
            return response.status(404).json({ message: 'Message not found' });
        }
        message.merge(request.only(['content', 'timestamp', 'senderId', 'receiverId']));
        await message.save();
        return response.json(message);
    }

    // Delete a message
    public async destroy({ params, response }: HttpContextContract) {
        const message = await Message.find(params.id);
        if (!message) {
            return response.status(404).json({ message: 'Message not found' });
        }
        await message.delete();
        return response.json({ message: 'Message deleted' });
    }
}
