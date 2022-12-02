"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * article controller
 */
const strapi_1 = require("@strapi/strapi");
const entityUID = 'api::article.article';
exports.default = strapi_1.factories.createCoreController(entityUID, ({ strapi }) => ({
    async create(ctx) {
        ctx.request.body.data.author = ctx.state.user.id;
        const entity = await strapi.service(entityUID).create(ctx.request.body);
        return entity;
    },
    async update(ctx) {
        const { id } = ctx.params;
        const { user } = ctx.state;
        const [article] = await strapi.entityService.findMany(entityUID, {
            filters: {
                id,
                author: {
                    id: user.id
                }
            },
        });
        if (!article)
            return ctx.unauthorized(`You can't update this entry`);
        const entry = await super.update(ctx);
        return entry;
    },
    async delete(ctx) {
        const { user } = ctx.state;
        const { id } = ctx.request.params;
        const [article] = await strapi.entityService.findMany(entityUID, {
            filters: {
                id,
                author: {
                    id: user.id
                }
            },
        });
        if (!article)
            return ctx.unauthorized(`You can't update this entry`);
        const entry = await super.delete(ctx);
        return entry;
    },
    async find(ctx) {
        const { user } = ctx.state;
        const { query } = ctx.request || {};
        const { filters } = query || {};
        const articles = await strapi.entityService.findMany(entityUID, {
            filters: {
                ...filters,
                author: {
                    id: user.id
                }
            },
        });
        return articles;
    },
    async findOne(ctx) {
        const { id } = ctx.params;
        const { user } = ctx.state;
        const { query } = ctx.request || {};
        const { filters } = query || {};
        const article = await strapi.entityService.findMany(entityUID, {
            ...query,
            filters: {
                ...filters,
                id,
                author: {
                    id: user.id
                }
            },
        });
        if (!article)
            return { data: {} };
        const entry = await super.findOne(ctx);
        return entry;
    }
}));
