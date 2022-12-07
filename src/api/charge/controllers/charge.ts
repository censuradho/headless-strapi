/**
 * charge controller
 */

import { factories } from '@strapi/strapi'
import { generateChargeTokenSchemaValidation, orderSchemaValidation } from '../content-types/validations';

const entityUUID = 'api::charge.charge'

export default factories.createCoreController(entityUUID, ({ strapi }) => ({
  async token (ctx) {
    const { body } = ctx.request
    const { order, ...charge } = body

    try {

      await generateChargeTokenSchemaValidation.validate(charge)
      await orderSchemaValidation.validate(order)

    } catch (err) {
      return ctx.badRequest(err.message, err)
    }

    try {
      const { data: charge } = await strapi.service(entityUUID).generateCardToken(body) 
      const orderResult = await strapi.service('api::order.order').create({
        data: {
          ...order,
          user: ctx.state.user.id,
          charge
        }
      })
      return orderResult
    } catch (err) {
      console.log(err)
      return ctx.badRequest(err.message, err)
    }
  }
}));
