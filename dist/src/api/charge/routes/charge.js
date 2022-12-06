"use strict";
/**
 * charge router
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    routes: [
        {
            method: 'POST',
            path: '/charge/token',
            handler: 'charge.token',
        }
    ]
};
