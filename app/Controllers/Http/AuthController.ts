import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import User from 'App/Models/User';
import Hash from '@ioc:Adonis/Core/Hash';
import { schema, rules } from '@ioc:Adonis/Core/Validator';

export default class AuthController {
    // Handle user authentication
    public async login({ request, auth, response }: HttpContextContract) {
        const validationSchema = schema.create({
            email: schema.string({}, [rules.email()]),
            password: schema.string(),
        });

        const validatedData = await request.validate({ schema: validationSchema });
        const email = validatedData.email;
        const password = validatedData.password;

        // Attempt to authenticate the user
        const user = await auth.attempt(email, password);
        if (user) {
            const token = await auth.use('api').generate(user);
            return response.json({ token: token.token, user: user });
        } else {
            return response.status(401).json({ error: 'Invalid credentials' });
        }
    }

    // Logout
    public async logout({ auth, response }: HttpContextContract) {
        await auth.use('api').revoke();
        return response.json({ message: 'Successfully logged out' });
    }

    // Register a new user
    public async register({ request, response }: HttpContextContract) {
        const validationSchema = schema.create({
            first_name: schema.string({ trim: true }),
            name: schema.string({ trim: true }),
            email: schema.string({}, [rules.email(), rules.unique({ table: 'users', column: 'email' })]),
            password: schema.string({ trim: true }, [rules.minLength(6)])
        });

        const validatedData = await request.validate({ schema: validationSchema });
        const user = new User();
        user.first_name = validatedData.first_name;
        user.name = validatedData.name;
        user.email = validatedData.email;
        user.password = await Hash.make(validatedData.password);
        await user.save();

        // Generate token for the user
        const token = await auth.use('api').generate(user);
        return response.status(201).json({ user: user, token: token.token });
    }
}
