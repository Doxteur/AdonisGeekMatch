import Route from '@ioc:Adonis/Core/Route'

// User routes
Route.group(() => {
    Route.get('/', 'UserController.index')
    Route.get('/me', 'UserController.me').middleware('auth')
    Route.get('/:id', 'UserController.show')
    Route.post('/', 'UserController.store')
    Route.put('/:id', 'UserController.update')
    Route.delete('/:id', 'UserController.destroy')
    Route.get('/search', 'UserController.search')
  }).prefix('users')
