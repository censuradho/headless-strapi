import { sanitize } from '@strapi/utils'
/**
 * article controller
 */

import { factories } from '@strapi/strapi'

const articleEntityUID = 'api::article.article'

export default factories.createCoreController(articleEntityUID, ({ strapi }) => ({
  async create (ctx) {
    ctx.request.body.data.author = ctx.state.user.id;

    const entity = await strapi.service(articleEntityUID).create(ctx.request.body);
    return entity
  },

  async update (ctx) {
    const { id } = ctx.params;
    const { user } = ctx.state

    
    const [article] = await strapi.entityService.findMany(articleEntityUID, {
      filters: {
        id,
        author: {
          id: user.id
        }
      },
    });

    if (!article) return ctx.unauthorized(`You can't update this entry`);
    
    const entry = await super.update(ctx)

    return entry
  },

  async delete (ctx) {
    const { user } = ctx.state
    const { id } = ctx.request.params
    
    const [article] = await strapi.entityService.findMany(articleEntityUID, {
      filters: {
        id,
        author: {
          id: user.id
        }
      },
    });

    if (!article) return ctx.unauthorized(`You can't update this entry`);
    
    const entry = await super.delete(ctx)

    return entry
  },

  async find (ctx) {
    const { user } = ctx.state

    const { query } = ctx.request || {}

    const { filters } = query || {}

    const articles = await strapi.entityService.findMany(articleEntityUID, {
      filters: {
        ...filters,
        author: {
          id: user.id
        }
      },
    });

    return articles
  },

  async findOne (ctx) {
    const { id } = ctx.params;
    const { user } = ctx.state

    const { query } = ctx.request || {}

    const { filters } = query || {}

    const article = await strapi.entityService.findMany(articleEntityUID, {
      filters: {
        ...filters,
        id,
        author: {
          id: user.id
        }
      },
    });

    if (!article) return { data: {} }

    const entry = await super.findOne(ctx)

    return entry
  }
}));
