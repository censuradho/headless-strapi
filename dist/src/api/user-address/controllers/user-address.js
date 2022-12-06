"use strict";
/**
 * user-address controller
 */
Object.defineProperty(exports, "__esModule", { value: true });
const strapi_1 = require("@strapi/strapi");
const entityUID = 'api::user-address.user-address';
exports.default = strapi_1.factories.createCoreController(entityUID, ({ strapi }) => ({
    async create(ctx) {
        ctx.request.body.data.user = ctx.state.user.id;
        const { user } = ctx.state;
        const [result] = await strapi.entityService.findMany(entityUID, {
            filters: {
                user: {
                    id: user.id
                }
            },
        });
        if (result)
            return ctx.unauthorized("This user already have an address relation");
        const entity = await strapi.service(entityUID).create(ctx.request.body);
        return entity;
    },
    async update(ctx) {
        const { id } = ctx.params;
        const { user } = ctx.state;
        const [result] = await strapi.entityService.findMany(entityUID, {
            filters: {
                id,
                user: {
                    id: user.id
                }
            },
        });
        if (!result)
            return ctx.unauthorized(`You can't update this entry`);
        const entry = await super.update(ctx);
        return entry;
    },
    async find(ctx) {
        const { user } = ctx.state;
        const { query } = ctx.request || {};
        const { filters } = query || {};
        const entries = await strapi.entityService.findMany(entityUID, {
            ...query,
            filters: {
                ...filters,
                user: {
                    id: user.id
                }
            },
        });
        return this.transformResponse(entries);
    },
    async findOne(ctx) {
        const { id } = ctx.params;
        const { user } = ctx.state;
        const { query } = ctx.request || {};
        const { filters } = query || {};
        const [savedEntry] = await strapi.entityService.findMany(entityUID, {
            ...query,
            filters: {
                ...filters,
                id,
                user: {
                    id: user.id
                }
            },
        });
        if (!savedEntry)
            return { data: {} };
        return this.transformResponse(savedEntry);
    }
}));
