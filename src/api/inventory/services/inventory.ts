/**
 * inventory service
 */

import utils  from '@strapi/utils'

import { factories } from '@strapi/strapi';

const { ApplicationError } = utils.errors;

type Inventories = Array<{ id: number, amount: number }>

export default factories.createCoreService('api::inventory.inventory', ({ strapi }): any => ({
  async decrement (inventories: Inventories) {
    await this.checkStock(inventories)

    for (const inventory of inventories) {
      const { id, amount  } = inventory

      const entry =  await strapi.entityService.findOne('api::inventory.inventory', id, {
        populate: ['*']
      })

      await strapi.entityService.update('api::inventory.inventory', id, {
        data: { 
          stock: entry.stock - amount
        }
      })
    }
  },
  async checkStock (inventories: Inventories) {
    for (const inventory of inventories) {
      const { id, amount } = inventory

      const entry =  await strapi.entityService.findOne('api::inventory.inventory', id)
  
      if (!entry) throw new ApplicationError('entry not found', inventory)
  
      const canDecrement = entry.stock >= amount
  
      if (!canDecrement) throw new ApplicationError('no product stock, can not decrement', inventory)
    }
  },

  async getBalance (inventories: Inventories) {

    const balance = []

    for (const inventory of inventories) {
      const { id, amount } = inventory
      const entry =  await strapi.entityService.findOne('api::inventory.inventory', id, {
        populate: ['product']
      })

      const total = entry.product.price * amount

      balance.push(total)
    }

    return balance.reduce((prev, next) => prev + next)
  }
}));
