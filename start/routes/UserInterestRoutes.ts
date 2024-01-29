import Route from '@ioc:Adonis/Core/Route'

// UserInterest routes
Route.group(() => {
  Route.get('/', 'UserInterestController.index')
  Route.get('/:id', 'UserInterestController.show')
  Route.post('/', 'UserInterestController.store')
  Route.put('/:id', 'UserInterestController.update')
  Route.delete('/:id', 'UserInterestController.destroy')
}).prefix('user_interests')
