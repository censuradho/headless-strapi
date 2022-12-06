import axios from 'axios'

const apiUrls = {
  development: 'https://sandbox.api.pagseguro.com',
  production: 'https://secure.api.pagseguro.com/'
}

const pagSeguroApi = axios.create({
  baseURL: apiUrls[process.env.NODE_ENV],
  
})