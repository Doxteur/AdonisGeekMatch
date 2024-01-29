import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm';
import User from 'App/Models/User';

export default class Swipe extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  @column()
  public maxSwipe: number

  @column()
  public swipes_done: number

  @column()
  public likes: number

  @column()
  public dislikes: number

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>
}
