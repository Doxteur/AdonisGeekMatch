import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm';
import User from 'App/Models/User';

export default class Profile extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public photo1: string

  @column()
  public photo2: string

  @column()
  public bio: string

  @column()
  public sexe: string

  @column()
  public console: string[]

  @column()
  public favoriteGames: string

  @column()
  public storyContent: string

  @column()
  public theme: string

  @column()
  public customColor: string

  @column()
  public customIcon: string

  @column()
  public userId: number

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>
}
