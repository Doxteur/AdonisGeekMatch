import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import User from 'App/Models/User';
import Hash from '@ioc:Adonis/Core/Hash';
import { schema, rules } from '@ioc:Adonis/Core/Validator';
import Env from '@ioc:Adonis/Core/Env';
import axios from 'axios';

export default class AuthController {
    // Handle user authentication
    public async login({ request, auth, response }: HttpContextContract) {
        const validationSchema = schema.create({
            email: schema.string({}, [rules.email()]),
            password: schema.string(),
        });
        console.log('back', validationSchema)

        const validatedData = await request.validate({ schema: validationSchema });
        const email = validatedData.email;
        const password = validatedData.password;

        console.log('back2', validatedData)

        // Attempt to authenticate the user
        const user = await auth.attempt(email, password);
        console.log('back3', user)
        if (user) {
            const token = await auth.use('api').generate(user);
            console.log('back4', token)
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
    public async register({ request, response, auth }: HttpContextContract) {
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

    // Google Login
    public async googleLogin({ request, auth, response }: HttpContextContract) {
        try {
            const { token } = request.only(['token']);
            const googleResponse = await axios.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`);
            const googleUser = googleResponse.data;

            let user = await User.findBy('email', googleUser.email);
            if (!user) {
                user = await User.create({
                    email: googleUser.email,
                    password: await Hash.make(Env.get('USER_DEFAULT_PASSWORD', 'defaultPassword')),
                });
            }

            const jwtToken = await auth.use('api').generate(user);
            return response.json({ message: 'Connexion Google réussie', token: jwtToken.token, user });
        } catch (error) {
            console.error(error);
            return response.internalServerError({ message: 'Erreur lors de la connexion Google' });
        }
    }

    // Facebook Login
    public async facebookLogin({ request, response, auth }: HttpContextContract) {
        try {
            const { token } = request.only(['token']);
            const appId = Env.get('FACEBOOK_APP_ID');
            const appSecret = Env.get('FACEBOOK_APP_SECRET');
            const facebookResponse = await axios.get(`https://graph.facebook.com/debug_token?input_token=${token}&access_token=${appId}|${appSecret}`);
            const facebookData = facebookResponse.data.data;
            let user = await User.findBy('facebookId', facebookData.user_id);
            if (!user) {
                user = await User.create({
                    //facebookId: facebookData.user_id,
                    // Assurez-vous d'ajouter les champs nécessaires ici
                });
            }
            const jwtToken = await auth.use('api').generate(user); // Renommé pour éviter le conflit
            return response.json({ message: 'Connexion Facebook réussie', token: jwtToken.token, user });
        } catch (error) {
            console.error(error);
            return response.internalServerError({ message: 'Erreur lors de la connexion Facebook' });
        }
    }
}
