import axios from 'axios'

const apiUrls = {
  development: 'https://sandbox.api.pagseguro.com',
  production: 'https://secure.api.pagseguro.com'
}

export const pagSeguroApi = axios.create({
  baseURL: apiUrls[process.env.NODE_ENV],
  headers: {
    Authorization: process.env.PAGSEGURO_SELLER_TOKEN,
    'Content-Type': 'application/json'
  }
})
