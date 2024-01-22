// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from "@ioc:Adonis/Core/Validator";

export default class AuthController {
  public async login({ request, auth }) {

    const newUserSchema = schema.create({
      email: schema.string(),
      password: schema.string(),
    });

    await request.validate({ schema: newUserSchema });

    const email = request.input("email");
    const password = request.input("password");
    const token = await auth.use("api").attempt(email, password);
    return token.toJSON();
  }
}
