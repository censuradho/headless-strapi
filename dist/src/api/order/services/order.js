"use strict";
/**
 * order service
 */
Object.defineProperty(exports, "__esModule", { value: true });
const strapi_1 = require("@strapi/strapi");
exports.default = strapi_1.factories.createCoreService('api::order.order', ({ strapi }) => ({
    async find(params) {
        console.log(params);
        // some logic here
        const { results, pagination } = await super.find(params);
        // some more logic
        return { results, pagination };
    }
}));
