import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm';
import User from 'App/Models/User';

export default class Filter extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  @column()
  public sexe: string

  @column()
  public ageFrom: number

  @column()
  public ageTo: number

  @column()
  public location: string

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>
}
