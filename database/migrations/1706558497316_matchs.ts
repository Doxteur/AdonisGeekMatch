import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Matchs extends BaseSchema {
  protected tableName = 'matchs'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user1_id').unsigned().references('id').inTable('users')
      table.integer('user2_id').unsigned().references('id').inTable('users')
      table.timestamp('date_matched', { useTz: true }).notNullable()
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
