import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Message from 'App/Models/Message';
import Ws from '../../Services/Ws';

export default class MessageController {
    // Get all messages
    public async index({ response }: HttpContextContract) {
        const messages = await Message.all();
        return response.json(messages);
    }

    // Create a message
    public async store({ request, response }: HttpContextContract) {
        console.log("store function called with data:", request.body());
        const messageData = request.only(['content', 'timestamp', 'senderId', 'receiverId']);
        console.log("Creating message with:", messageData);
        const message = await Message.create(messageData);
        console.log("Message created:", message);

        // Générer l'identifiant de la salle (roomId) en utilisant senderId et receiverId
        const roomId = `${Math.min(message.senderId, message.receiverId)}-${Math.max(message.senderId, message.receiverId)}`;
        console.log(`Emitting message to room: ${roomId}`, message);

        // Émettre le message à la salle spécifiée
        Ws.io.to(roomId).emit('chat.message', message);

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
