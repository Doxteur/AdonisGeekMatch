import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm';
import User from 'App/Models/User';
import Interest from 'App/Models/Interest';

export default class UserInterest extends BaseModel {
  public static table = 'user_interests';

  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  @column()
  public interestId: number

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @belongsTo(() => Interest)
  public interest: BelongsTo<typeof Interest>
}
