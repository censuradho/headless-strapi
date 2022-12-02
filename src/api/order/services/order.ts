/**
 * order service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::order.order', ({ strapi }): any => ({
  async find(params) {
    console.log(params)
    // some logic here
    const { results, pagination } = await super.find(params);
    // some more logic
  
    return { results, pagination };
  }
}));
