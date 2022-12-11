"use strict";
/**
 * charge controller
 */
Object.defineProperty(exports, "__esModule", { value: true });
const strapi_1 = require("@strapi/strapi");
const validations_1 = require("../content-types/validations");
const entityUUID = 'api::charge.charge';
exports.default = strapi_1.factories.createCoreController(entityUUID, ({ strapi }) => ({
    async token(ctx) {
        try {
            const { body } = ctx.request;
            const { order, ...charge } = body;
            await validations_1.generateChargeTokenSchemaValidation.validate(charge);
            await validations_1.orderSchemaValidation.validate(order);
            await strapi.service('api::inventory.inventory').decrement(order.inventories);
            const { data: chargePayload } = await strapi.service(entityUUID).generateCardToken(body);
            const balance = await strapi.service('api::inventory.inventory').getBalance(order.inventories);
            const inventoriesId = order.inventories.map(value => value.id);
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
            });
            return orderResult;
        }
        catch (err) {
            return ctx.badRequest(err.message, err);
        }
    }
}));
