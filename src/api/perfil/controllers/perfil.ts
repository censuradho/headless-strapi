import { sanitize  } from '@strapi/utils'

/**
 * perfil controller
 */
import { factories } from '@strapi/strapi'

const entityUID = 'api::perfil.perfil'

export default factories.createCoreController('api::perfil.perfil', {
  async create (ctx) {
    ctx.request.body.data.user = ctx.state.user.id;
    const { user } = ctx.state

        
    const [result] = await strapi.entityService.findMany(entityUID, {
      filters: {
        user: {
          id: user.id
        }
      },
    });

    if (result) return ctx.unauthorized("This user already have an profile relation")

    const entity = await strapi.service(entityUID).create(ctx.request.body);
    return entity
  },

  async update (ctx) {
    const { id } = ctx.params;
    const { user } = ctx.state

    
    const [result] = await strapi.entityService.findMany(entityUID, {
      filters: {
        id,
        user: {
          id: user.id
        }
      },
    });

    if (!result) return ctx.unauthorized(`You can't update this entry`);
    
    const entry = await super.update(ctx)

    return entry
  },


  async find (ctx) {
    const { user } = ctx.state

    const { query } = ctx.request || {}

    const { filters } = query || {}

    const entries = await strapi.entityService.findMany(entityUID, {
      ...query,
      filters: {
        ...filters,
        user: {
          id: user.id
        }
      },
    });

    return this.transformResponse(entries)
  },

  async findOne (ctx) {
    const { id } = ctx.params;
    const { user } = ctx.state

    const { query } = ctx.request || {}

    const { filters } = query || {}

    const [article] = await strapi.entityService.findMany(entityUID, {
      ...query,
      filters: {
        ...filters,
        id,
        user: {
          id: user.id
        }
      },
    });

    if (!article) return { data: {} }

    const entry = await super.findOne(ctx)

    return this.transformResponse(entry)
  }

});
