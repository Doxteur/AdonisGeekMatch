import { BaseModel, column, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm';
import User from 'App/Models/User';

export default class Reward extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public rewardType: string

  @column()
  public rewardContent: string

  @manyToMany(() => User, {
    pivotTable: 'user_rewards'
  })
  public users: ManyToMany<typeof User>
}
