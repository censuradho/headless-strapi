import axios from 'axios'

const apiUrls = {
  development: 'https://sandbox.pagseguro.uol.com.br',
  production: 'https://pagseguro.uol.com.br'
}

const pagSeguroApi = axios.create({
  baseURL: apiUrls[process.env.NODE_ENV]
})