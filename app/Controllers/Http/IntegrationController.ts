import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Integration from 'App/Models/Integration';

export default class IntegrationController {
    // Get all integrations
    public async index({ response }: HttpContextContract) {
        const integrations = await Integration.all();
        return response.json(integrations);
    }

    // Create an integration
    public async store({ request, response }: HttpContextContract) {
        const integrationData = request.only(['userId', 'platform', 'integrationToken', 'integrationDetails']);
        const integration = await Integration.create(integrationData);
        return response.status(201).json(integration);
    }

    // Get a single integration
    public async show({ params, response }: HttpContextContract) {
        const integration = await Integration.find(params.id);
        if (!integration) {
            return response.status(404).json({ message: 'Integration not found' });
        }
        return response.json(integration);
    }

    // Update an integration
    public async update({ params, request, response }: HttpContextContract) {
        const integration = await Integration.find(params.id);
        if (!integration) {
            return response.status(404).json({ message: 'Integration not found' });
        }
        const integrationData = request.only(['userId', 'platform', 'integrationToken', 'integrationDetails']);
        integration.merge(integrationData);
        await integration.save();
        return response.json(integration);
    }

    // Delete an integration
    public async destroy({ params, response }: HttpContextContract) {
        const integration = await Integration.find(params.id);
        if (!integration) {
            return response.status(404).json({ message: 'Integration not found' });
        }
        await integration.delete();
        return response.json({ message: 'Integration deleted successfully' });
    }
}
