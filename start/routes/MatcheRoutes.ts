import Route from '@ioc:Adonis/Core/Route'

// Match routes
Route.group(() => {
  Route.get('/', 'MatchController.index')
  Route.get('/:id', 'MatchController.show')
  Route.post('/', 'MatchController.store')
  Route.put('/:id', 'MatchController.update')
  Route.delete('/:id', 'MatchController.destroy')
  Route.get('/user/:userId', 'MatchController.matchesForUser')
  Route.post('/:id/unmatch', 'MatchController.unmatch')
}).prefix('matches')
