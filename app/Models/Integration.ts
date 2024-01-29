import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm';
import User from 'App/Models/User';

export default class Integration extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  @column()
  public platform: string

  @column()
  public integrationToken: string

  @column()
  public integrationDetails: string

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>
}
