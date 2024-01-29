import Route from '@ioc:Adonis/Core/Route'

// Filter routes
Route.group(() => {
    Route.get('/', 'FilterController.index')
    Route.get('/:id', 'FilterController.show')
    Route.post('/', 'FilterController.store')
    Route.put('/:id', 'FilterController.update')
    Route.delete('/:id', 'FilterController.destroy')
    Route.get('/search', 'FilterController.search')
  }).prefix('filters')
