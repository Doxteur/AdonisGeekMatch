/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

import './routes/AuthRoutes'
import './routes/FilterRoutes'
import './routes/IntegrationRoutes'
import './routes/InterestRoutes'
import './routes/MatcheRoutes'
import './routes/MessageRoutes'
import './routes/ProfileRoutes'
import './routes/ReportRoutes'
import './routes/RewardRoutes'
import './routes/SwipeRoutes'
import './routes/UserInterestRoutes'
import './routes/UserRewardRoutes'
import './routes/UserRoutes'

// Route that need authentication
/*
Route.group(() => {
  Route.get('users', 'UserController.me')
}).middleware('auth:api')
*/

// Testing routes
Route.group(() => {
  Route.get('/monitor/status', async ({ response }) => {
    return response.json({ message: 'API Working as expected!' })
  })
}).prefix('testing')