"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * article controller
 */
const strapi_1 = require("@strapi/strapi");
const articleUID = 'api::article.article';
exports.default = strapi_1.factories.createCoreController(articleUID, ({ strapi }) => ({
    async create(ctx) {
        ctx.request.body.data.author = ctx.state.user.id;
        const entity = await strapi.service(articleUID).create(ctx.request.body);
        return entity;
    },
    async update(ctx) {
        const { id } = ctx.params;
        const { user } = ctx.state;
        const [article] = await strapi.entityService.findMany(articleUID, {
            filters: {
                id,
                author: {
                    id: user.id
                }
            },
            populate: '*'
        });
        if (!article)
            return ctx.unauthorized(`You can't update this entry`);
        const entry = await super.update(ctx);
        return entry;
    },
    async delete(ctx) {
        const { user } = ctx.state;
        const { id } = ctx.request.params;
        const [article] = await strapi.entityService.findMany(articleUID, {
            filters: {
                id,
                author: {
                    id: user.id
                }
            },
            populate: '*'
        });
        if (!article)
            return ctx.unauthorized(`You can't update this entry`);
        const entry = await super.delete(ctx);
        return entry;
    }
}));
