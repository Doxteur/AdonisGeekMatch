import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm';
import User from 'App/Models/User';
import Reward from 'App/Models/Reward';
import { DateTime } from 'luxon';

export default class UserReward extends BaseModel {
  public static table = 'user_rewards';

  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  @column()
  public rewardId: number

  @column.dateTime()
  public dateClaimed: DateTime

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @belongsTo(() => Reward)
  public reward: BelongsTo<typeof Reward>
}
