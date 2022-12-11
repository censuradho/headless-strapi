/**
 * charge controller
 */

import { factories } from '@strapi/strapi'

import { 
  generateChargeTokenSchemaValidation, 
  orderSchemaValidation 
} from '../content-types/validations';

const entityUUID = 'api::charge.charge'

export default factories.createCoreController(entityUUID, ({ strapi }) => ({
  async token (ctx) {
    try {

    const { body } = ctx.request
    const { order, ...charge } = body

      await generateChargeTokenSchemaValidation.validate(charge)
      await orderSchemaValidation.validate(order)

      await strapi.service('api::inventory.inventory').decrement(order.inventories)
      const { data: chargePayload } = await strapi.service(entityUUID).generateCardToken(body)
      const balance = await strapi.service('api::inventory.inventory').getBalance(order.inventories)

      const inventoriesId = order.inventories.map(value => value.id)

        const orderResult = await strapi.service('api::order.order').create({
          data: {
            inventories: inventoriesId,
            total: balance,
            user: ctx.state.user.id,
            charge: {
            ...order,
              ...chargePayload,
            }
          }
        })
  
        return orderResult
    } catch (err) {
        return ctx.badRequest(err.message, err)
      }

  }
}));
