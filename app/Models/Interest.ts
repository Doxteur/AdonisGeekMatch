import { BaseModel, column, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm';
import User from 'App/Models/User';

export default class Interest extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public interestType: string

  @column()
  public interestValue: string

  @manyToMany(() => User, {
    pivotTable: 'user_interests'
  })
  public users: ManyToMany<typeof User>
}
