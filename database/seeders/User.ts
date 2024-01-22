import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import User from "App/Models/User";

export default class extends BaseSeeder {
  // Write your database queries inside the run method

  public async run() {
    await User.createMany([
      {
        email: "jimmy@example.com",
        password: "secret"
      },
      {
        email: "azea@test.com",
        password: "secret",
      },
    ]);
  }
}
