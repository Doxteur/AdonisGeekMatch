import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Rewards extends BaseSchema {
  protected tableName = 'rewards'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('reward_type').notNullable()
      table.text('reward_content').notNullable()
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
