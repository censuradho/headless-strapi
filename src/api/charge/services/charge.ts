/**
 * charge service
 */

import { factories } from '@strapi/strapi';

import { pagSeguroApi } from '../../../lib/pag-seguro';

import { GenerateChargeTokenRequestRawData } from '../content-types/model';

export default factories.createCoreService('api::charge.charge', (): any => ({
  async generateCardToken (params) {
    const payload: GenerateChargeTokenRequestRawData = {
      ...params,
      payment_method: {
        ...params.payment_method,
        type: 'CREDIT_CARD'
      }
    }

    return await pagSeguroApi.post('/charges', payload)
  }
}));
