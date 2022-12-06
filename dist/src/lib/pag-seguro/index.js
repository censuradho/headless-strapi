"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pagSeguroApi = void 0;
const axios_1 = __importDefault(require("axios"));
const apiUrls = {
    development: 'https://sandbox.api.pagseguro.com',
    production: 'https://secure.api.pagseguro.com/'
};
exports.pagSeguroApi = axios_1.default.create({
    baseURL: apiUrls[process.env.NODE_ENV],
    headers: {
        Authorization: `Bearer ${process.env.PAGSEGURO_SELLER_TOKEN}`,
        'Content-Type': 'application/json'
    }
});
