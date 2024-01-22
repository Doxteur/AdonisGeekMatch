import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from "App/Models/User";

export default class UsersController {

    public async me({ auth }: HttpContextContract) {
        if(!auth.check()) return {error: 'You are not logged in.'};
        return auth.user;
    }
}
