/**
 * charge router
 */

export default {
  routes: [
    {
      method: 'POST',
      path: '/charge/token',
      handler: 'charge.token',
    }
  ]
}