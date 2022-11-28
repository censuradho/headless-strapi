export default {
  routes: [
    {
      method: 'PUT',
      path: '/cart', 
      handler: 'cart.updateByUserId',
    }
  ]
}