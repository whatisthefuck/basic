
import Vue from 'vue'
//引入axios
import axios from 'axios'
import Qs from 'qs'
import { storage } from './storage.js'
axios.defaults.baseURL = '/api';
const get=(url,params)=>{
  return axios({
    method:'get',
    url,
    params,
  })
}
const post=(url,params)=>{
  return axios({
    method:'post',
    url,
    data:Qs.stringify(params),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
  })
}
//请求拦截
axios.interceptors.request.use(config => {
  if (storage.get('token')) {
      config.headers.Authorization = `token ${storage.get('token')}`;
  }
  return config;
}, err => {
  return Promise.reject(err);
})
Vue.prototype.get=get;
Vue.prototype.post=post;