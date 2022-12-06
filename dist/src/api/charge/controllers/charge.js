"use strict";
/**
 * charge controller
 */
Object.defineProperty(exports, "__esModule", { value: true });
const strapi_1 = require("@strapi/strapi");
const validations_1 = require("../content-types/validations");
exports.default = strapi_1.factories.createCoreController('api::charge.charge', ({ strapi }) => ({
    async token(ctx) {
        const { body } = ctx.request;
        try {
            await validations_1.generateChargeTokenSchemaValidation.validate(body);
        }
        catch (err) {
            return ctx.badRequest(err.message, err);
        }
        return {};
    }
}));
