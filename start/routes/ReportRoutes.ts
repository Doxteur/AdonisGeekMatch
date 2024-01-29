import Route from '@ioc:Adonis/Core/Route'

// Report routes
Route.group(() => {
  Route.get('/', 'ReportController.index')
  Route.get('/:id', 'ReportController.show')
  Route.post('/', 'ReportController.store')
  Route.put('/:id', 'ReportController.update')
  Route.delete('/:id', 'ReportController.destroy')
}).prefix('reports')
