import { DateTime } from 'luxon';
import Hash from '@ioc:Adonis/Core/Hash';
import {
  column,
  beforeSave,
  BaseModel,
  hasOne,
  HasOne,
  manyToMany,
  ManyToMany,
  hasMany,
  HasMany
} from '@ioc:Adonis/Lucid/Orm';
import Profile from 'App/Models/Profile';
import Interest from 'App/Models/Interest';
import Reward from 'App/Models/Reward';
import Integration from 'App/Models/Integration';
import Filter from 'App/Models/Filter';
import Swipe from 'App/Models/Swipe';

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public first_name: string

  @column()
  public name: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken: string | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => Profile)
  public profile: HasOne<typeof Profile>

  @manyToMany(() => Interest, {
    pivotTable: 'user_interests'
  })
  public interests: ManyToMany<typeof Interest>

  @manyToMany(() => Reward, {
    pivotTable: 'user_rewards'
  })
  public rewards: ManyToMany<typeof Reward>

  @hasMany(() => Integration)
  public integrations: HasMany<typeof Integration>

  @hasOne(() => Filter)
  public filter: HasOne<typeof Filter>

  @hasOne(() => Swipe)
  public swipe: HasOne<typeof Swipe>

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
