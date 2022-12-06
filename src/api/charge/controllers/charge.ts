/**
 * charge controller
 */

import { factories } from '@strapi/strapi'
import { generateChargeTokenSchemaValidation } from '../content-types/validations';

export default factories.createCoreController('api::charge.charge', ({ strapi }) => ({
  async token (ctx) {
    const { body } = ctx.request

    try {
      await generateChargeTokenSchemaValidation.validate(body)
    } catch (err) {
      return ctx.badRequest(err.message, err)
    }

    return {}
  }
}));
