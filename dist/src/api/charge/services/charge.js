"use strict";
/**
 * charge service
 */
Object.defineProperty(exports, "__esModule", { value: true });
const strapi_1 = require("@strapi/strapi");
const pag_seguro_1 = require("../../../lib/pag-seguro");
exports.default = strapi_1.factories.createCoreService('api::charge.charge', () => ({
    async generateCardToken(params) {
        const payload = {
            ...params,
            payment_method: {
                ...params.payment_method,
                type: 'CREDIT_CARD'
            }
        };
        return await pag_seguro_1.pagSeguroApi.post('/charges', payload);
    }
}));
