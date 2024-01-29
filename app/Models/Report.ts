import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm';
import User from 'App/Models/User';
import { DateTime } from 'luxon';

export default class Report extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public reporterId: number

  @column()
  public reportedUserId: number

  @column()
  public reason: string

  @column.dateTime()
  public dateReported: DateTime

  @belongsTo(() => User, { foreignKey: 'reporterId' })
  public reporter: BelongsTo<typeof User>

  @belongsTo(() => User, { foreignKey: 'reportedUserId' })
  public reportedUser: BelongsTo<typeof User>
}
