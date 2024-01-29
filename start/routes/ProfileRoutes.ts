import Route from '@ioc:Adonis/Core/Route'

// Profile routes
Route.group(() => {
    Route.get('/', 'ProfileController.index')
    Route.get('/:id', 'ProfileController.show')
    Route.get('/user/:userId', 'ProfileController.showByUser')
    Route.post('/', 'ProfileController.store')
    Route.put('/:id', 'ProfileController.update')
    Route.delete('/:id', 'ProfileController.destroy')
    Route.get('/filter', 'ProfileController.filter')
  }).prefix('profiles')
