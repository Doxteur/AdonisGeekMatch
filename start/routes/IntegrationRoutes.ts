import Route from '@ioc:Adonis/Core/Route'

// Integration routes
Route.group(() => {
  Route.get('/', 'IntegrationController.index')
  Route.get('/:id', 'IntegrationController.show')
  Route.post('/', 'IntegrationController.store')
  Route.put('/:id', 'IntegrationController.update')
  Route.delete('/:id', 'IntegrationController.destroy')
}).prefix('integrations')
