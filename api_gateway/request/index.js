const axios = require('axios')

const GET = (baseUrl, url, params = {}) => {
  return axios({
    url,
    method: 'get',
    baseURL: baseUrl,
    headers: { 'Content-Type': 'application/json' },
    params: params
  }).then( res => res.data ).catch( err => err )
}

const POST = (baseUrl, url, data) => {
  return axios({
    url,
    method: 'post',
    baseURL: baseUrl,
    headers: { 'Content-Type': 'application/json' },
    data
  }).then( res => res.data ).catch( err => err )
}

const PUT = (baseUrl, url, data) => {
  return axios({
    url,
    method: 'put',
    baseURL: baseUrl,
    headers: { 'Content-Type': 'application/json' },
    data
  }).then( res => res.data ).catch( err => err )
}

const DELETE = (baseUrl, url) => {
  return axios({
    url,
    method: 'delete',
    baseURL: baseUrl,
    headers: { 'Content-Type': 'application/json' }
  }).then( res => res.data ).catch( err => err )
}

module.exports = { GET, POST, PUT, DELETE }
