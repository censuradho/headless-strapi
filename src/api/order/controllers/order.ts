/**
 * order controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::order.order', ({ strapi }) => ({
  async find(ctx) {
    const { user } = ctx.state

    const { data, meta } = await super.find(ctx);


    return { data, meta };

  }
}));
