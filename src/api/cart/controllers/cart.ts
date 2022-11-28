/**
 * cart controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::cart.cart', ({ strapi }) => ({
  async updateByUserId (ctx) {

    const { userId } = ctx.request.body
    
    delete ctx.request.body.userId

    const user = await strapi.entityService.findOne('plugin::users-permissions.user', userId)

    if (!user) return ctx.badRequest('user not found')

    const [existCart] = await strapi.entityService.findMany('api::cart.cart', {
      filters: {
        user: {
          id: {
            $eq: userId
          }
        }
      }
    })


    if (existCart) {
      ctx.params.id = existCart.id

      const response = await super.update(ctx)

      return response
    }

  
    Object.assign(ctx.request.body, {
      data: {
        user: userId,
        items: []
      }
    })

    const response = await super.create(ctx)

    return response
  }
}));
