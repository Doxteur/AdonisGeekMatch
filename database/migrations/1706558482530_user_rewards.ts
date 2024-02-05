import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UserRewards extends BaseSchema {
  protected tableName = 'user_rewards'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('reward_id').unsigned().references('id').inTable('rewards')
      table.timestamp('date_claimed').nullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
