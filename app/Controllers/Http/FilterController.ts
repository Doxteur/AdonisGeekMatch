import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Filter from 'App/Models/Filter';
import { schema, rules } from '@ioc:Adonis/Core/Validator';

export default class FilterController {
    // Validate request data
    protected validateRequest(request) {
        const validationSchema = schema.create({
            sexe: schema.string.optional({ trim: true }),
            age_from: schema.number.optional([
                rules.unsigned(),
                rules.range(18, 100)
            ]),
            age_to: schema.number.optional([
                rules.unsigned(),
                rules.range(18, 100),
                rules.afterField('age_from')
            ]),
            location: schema.string.optional({ trim: true }),
        });

        return request.validate({ schema: validationSchema });
    }

    // Get all filters
    public async index({ response }: HttpContextContract) {
        const filters = await Filter.all();
        return response.json(filters);
    }

    // Add a filter
    public async store({ request, response }: HttpContextContract) {
        const validatedData = await this.validateRequest(request);
        const filter = await Filter.create(validatedData);
        return response.status(201).json(filter);
    }

    // Get one filter
    public async show({ params, response }: HttpContextContract) {
        const filter = await Filter.find(params.id);
        if (!filter) {
            return response.status(404).json({ message: 'Filter not found' });
        }
        return response.json(filter);
    }

    // Update a filter
    public async update({ params, request, response }: HttpContextContract) {
        const filter = await Filter.find(params.id);
        if (!filter) {
            return response.status(404).json({ message: 'Filter not found' });
        }

        const validatedData = await this.validateRequest(request);
        filter.merge(validatedData);
        await filter.save();
        return response.json(filter);
    }

    // Delete a filter
    public async destroy({ params, response }: HttpContextContract) {
        const filter = await Filter.find(params.id);
        if (!filter) {
            return response.status(404).json({ message: 'Filter not found' });
        }
        await filter.delete();
        return response.json({ message: 'Filter deleted' });
    }

    // Search filters
    public async search({ request, response }: HttpContextContract) {
        const query = Filter.query();

        // Sexe
        if (request.input('sexe')) {
            query.where('sexe', request.input('sexe'));
        }

        // Age
        if (request.input('age_from') && request.input('age_to')) {
            query.whereBetween('age', [request.input('age_from'), request.input('age_to')]);
        } else if (request.input('age_from')) {
            query.where('age', '>=', request.input('age_from'));
        } else if (request.input('age_to')) {
            query.where('age', '<=', request.input('age_to'));
        }

        const filters = await query.exec();
        return response.json(filters);
    }
}
