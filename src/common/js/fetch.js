import axios from 'axios'

let config = {
  headers: {
    'Content-Type': 'application/json'
  },
  responseType: 'json',
  transformResponse: [
    function(data) {
      return data
    }
  ]
}

axios.interceptors.response.use(function(res) {
  return res.data
})

export function get(url) {
  return axios.get(url, config)
}

export function post(url, data) {
  return axios.post(url, data, config)
}

export function put(url, data) {
  return axios.put(url, data, config)
}

export function deletes(url, data) {
  return axios.delete(url, data, config)
}