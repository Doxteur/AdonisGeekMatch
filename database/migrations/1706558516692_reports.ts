import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Reports extends BaseSchema {
  protected tableName = 'reports'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('reporter_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.integer('reported_user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.text('reason')
      table.timestamp('date_reported', { useTz: true })
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
