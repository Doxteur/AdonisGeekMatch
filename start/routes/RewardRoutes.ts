import Route from '@ioc:Adonis/Core/Route'

// Reward routes
Route.group(() => {
  Route.get('/', 'RewardController.index')
  Route.get('/:id', 'RewardController.show')
  Route.post('/', 'RewardController.store')
  Route.put('/:id', 'RewardController.update')
  Route.delete('/:id', 'RewardController.destroy')
}).prefix('rewards')
