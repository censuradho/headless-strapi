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
        const { body } = ctx.request;
        const { order, ...charge } = body;
        try {
            await validations_1.generateChargeTokenSchemaValidation.validate(charge);
            await validations_1.orderSchemaValidation.validate(order);
        }
        catch (err) {
            return ctx.badRequest(err.message, err);
        }
        try {
            const { data: charge } = await strapi.service(entityUUID).generateCardToken(body);
            const orderResult = await strapi.service('api::order.order').create({
                data: {
                    ...order,
                    user: ctx.state.user.id,
                    charge
                }
            });
            return orderResult;
        }
        catch (err) {
            console.log(err);
            return ctx.badRequest(err.message, err);
        }
    }
}));
