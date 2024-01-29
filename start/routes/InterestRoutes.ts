import Route from '@ioc:Adonis/Core/Route'

// Interest routes
Route.group(() => {
  Route.get('/', 'InterestController.index')
  Route.get('/:id', 'InterestController.show')
  Route.post('/', 'InterestController.store')
  Route.put('/:id', 'InterestController.update')
  Route.delete('/:id', 'InterestController.destroy')
}).prefix('interests')
