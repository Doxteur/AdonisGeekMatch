import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Integrations extends BaseSchema {
  protected tableName = 'integrations'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.string('platform').notNullable()
      table.string('integration_token').nullable()
      table.text('integration_details').nullable()
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
