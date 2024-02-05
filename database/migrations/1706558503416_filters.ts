import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Filters extends BaseSchema {
  protected tableName = 'filters'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.string('sexe').nullable()
      table.integer('age_from').nullable()
      table.integer('age_to').nullable()
      table.string('location').nullable()
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
