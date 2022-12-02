"use strict";
/**
 * order controller
 */
Object.defineProperty(exports, "__esModule", { value: true });
const strapi_1 = require("@strapi/strapi");
exports.default = strapi_1.factories.createCoreController('api::order.order', ({ strapi }) => ({
    async find(ctx) {
        const { user } = ctx.state;
        const { data, meta } = await super.find(ctx);
        return { data, meta };
    }
}));
