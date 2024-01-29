import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm';
import User from 'App/Models/User';
import { DateTime } from 'luxon';

export default class Message extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public content: string

  @column.dateTime()
  public timestamp: DateTime

  @column()
  public senderId: number

  @column()
  public receiverId: number

  @belongsTo(() => User, { foreignKey: 'senderId' })
  public sender: BelongsTo<typeof User>

  @belongsTo(() => User, { foreignKey: 'receiverId' })
  public receiver: BelongsTo<typeof User>
}
