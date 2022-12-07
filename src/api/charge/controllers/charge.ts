/**
 * charge controller
 */

import { factories } from '@strapi/strapi'
import { generateChargeTokenSchemaValidation } from '../content-types/validations';

const entityUUID = 'api::charge.charge'

export default factories.createCoreController(entityUUID, ({ strapi }) => ({
  async token (ctx) {
    const { body } = ctx.request

    try {
      await generateChargeTokenSchemaValidation.validate(body)
    } catch (err) {
      return ctx.badRequest(err.message, err)
    }

    try {
      const { data } = await strapi.service(entityUUID).generateCardToken(body) 

      return data
    } catch (err) {
      console.log(err)
      return ctx.badRequest(err.message, err)
    }
  }
}));
