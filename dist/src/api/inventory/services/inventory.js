"use strict";
/**
 * inventory service
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = __importDefault(require("@strapi/utils"));
const strapi_1 = require("@strapi/strapi");
const { ApplicationError } = utils_1.default.errors;
exports.default = strapi_1.factories.createCoreService('api::inventory.inventory', ({ strapi }) => ({
    async decrement(inventories) {
        await this.checkStock(inventories);
        for (const inventory of inventories) {
            const { id, amount } = inventory;
            const entry = await strapi.entityService.findOne('api::inventory.inventory', id, {
                populate: ['*']
            });
            await strapi.entityService.update('api::inventory.inventory', id, {
                data: {
                    stock: entry.stock - amount
                }
            });
        }
    },
    async checkStock(inventories) {
        for (const inventory of inventories) {
            const { id, amount } = inventory;
            const entry = await strapi.entityService.findOne('api::inventory.inventory', id);
            if (!entry)
                throw new ApplicationError('entry not found', inventory);
            const canDecrement = entry.stock >= amount;
            if (!canDecrement)
                throw new ApplicationError('no product stock, can not decrement', inventory);
        }
    },
    async getBalance(inventories) {
        const balance = [];
        for (const inventory of inventories) {
            const { id, amount } = inventory;
            const entry = await strapi.entityService.findOne('api::inventory.inventory', id, {
                populate: ['product']
            });
            const total = entry.product.price * amount;
            balance.push(total);
        }
        return balance.reduce((prev, next) => prev + next);
    }
}));
