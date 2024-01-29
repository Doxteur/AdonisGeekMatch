import Route from '@ioc:Adonis/Core/Route'

// UserReward routes
Route.group(() => {
  Route.get('/', 'UserRewardController.index')
  Route.get('/:id', 'UserRewardController.show')
  Route.post('/', 'UserRewardController.store')
  Route.put('/:id', 'UserRewardController.update')
  Route.delete('/:id', 'UserRewardController.destroy')
}).prefix('user_rewards')
