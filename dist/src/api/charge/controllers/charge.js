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
        try {
            await validations_1.generateChargeTokenSchemaValidation.validate(body);
        }
        catch (err) {
            return ctx.badRequest(err.message, err);
        }
        try {
            const { data } = await strapi.service(entityUUID).generateCardToken(body);
            return data;
        }
        catch (err) {
            console.log(err);
            return ctx.badRequest(err.message, err);
        }
    }
}));
