"use strict";
/**
 * A set of functions called "actions" for `charge`
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    exampleAction: async (ctx, next) => {
        try {
            ctx.body = 'ok';
        }
        catch (err) {
            ctx.body = err;
        }
    },
    token: async (ctx, next) => {
    }
};
