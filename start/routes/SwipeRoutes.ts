import Route from '@ioc:Adonis/Core/Route'

// Swipe routes
Route.group(() => {
    Route.get('/', 'SwipeController.index')
    Route.get('/:id', 'SwipeController.show')
    Route.get('/user/:userId', 'SwipeController.showByUser')
    Route.post('/', 'SwipeController.store')
    Route.put('/:id', 'SwipeController.update')
    Route.delete('/:id', 'SwipeController.destroy')
    Route.post('/:id/reset', 'SwipeController.resetSwipes')
    Route.post('/:id/doSwipe', 'SwipeController.doSwipe')
  }).prefix('swipes')
