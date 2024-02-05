import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Swipes extends BaseSchema {
  protected tableName = 'swipes'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('max_swipe').notNullable()
      table.integer('swipes_done').defaultTo(0)
      table.integer('likes').defaultTo(0)
      table.integer('dislikes').defaultTo(0)
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
