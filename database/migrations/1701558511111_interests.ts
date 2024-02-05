import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Interests extends BaseSchema {
  protected tableName = 'interests'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('interest_type').notNullable()
      table.string('interest_value').notNullable()
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
