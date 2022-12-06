"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    routes: [
        {
            method: 'GET',
            path: '/charge',
            handler: 'charge.exampleAction',
            config: {
                policies: [],
                middlewares: [],
            },
        },
        {
            method: 'POST',
            path: '/charge/token',
            handler: 'charge.token',
            config: {
                policies: [],
                middlewares: [],
            },
        },
    ],
};
