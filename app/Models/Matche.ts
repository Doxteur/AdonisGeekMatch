import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm';
import User from 'App/Models/User';
import { DateTime } from 'luxon';

export default class Matche extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public user1_id: number

  @column()
  public user2_id: number

  @column.dateTime()
  public dateMatched: DateTime

  @belongsTo(() => User, { foreignKey: 'user1Id' })
  public user1: BelongsTo<typeof User>

  @belongsTo(() => User, { foreignKey: 'user2Id' })
  public user2: BelongsTo<typeof User>
}
