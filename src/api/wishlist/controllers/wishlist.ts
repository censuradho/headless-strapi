/**
 * wishlist controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::wishlist.wishlist', ({ strapi }) => ({
   async create (ctx) {
     const { user } = ctx.state || {}

      const wishlist = await strapi.db.query('api::wishlist.wishlist').findOne({
        where: {
          user: { id: user.id }
        }
      })

      if (wishlist) return ctx.badRequest('user already has related wishlist')
      
      const response = await super.create(ctx);

      return response
   },

   async update (ctx) {
    const { user } = ctx.state || {}

    const wishlist = await strapi.db.query('api::wishlist.wishlist').findOne({
      where: {
        user: { id: user.id }
      },
    })

    if (!wishlist) return await super.create(ctx)

    return await super.update(ctx)
   }
}));
