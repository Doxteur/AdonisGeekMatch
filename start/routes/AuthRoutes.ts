import Route from '@ioc:Adonis/Core/Route'

// Auth routes
Route.post('/login', 'AuthController.login')
Route.post('/logout', 'AuthController.logout')
Route.post('/register', 'AuthController.register')