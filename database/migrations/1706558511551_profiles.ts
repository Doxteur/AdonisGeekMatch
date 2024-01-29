import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Profiles extends BaseSchema {
  protected tableName = 'profiles'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.string('photo1').nullable()
      table.string('photo2').nullable()
      table.text('bio').nullable()
      table.string('sexe').nullable()
      table.json('console').nullable()
      table.string('favorite_games').nullable()
      table.text('story_content').nullable()
      table.string('theme').nullable()
      table.string('custom_color').nullable()
      table.string('custom_icon').nullable()
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
