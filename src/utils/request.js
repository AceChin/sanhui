import axios from 'axios';
import { Message } from 'element-ui';
import { getToken,removeToken } from '@/utils/storage'
axios.defaults.timeout = 30000;
// axios.defaults.baseURL = 'http://192.168.1.30:10002';


// http request 拦截器
axios.interceptors.request.use(
  (config) => {
    config.data = JSON.stringify(config.data);
    config.headers = {
      'Content-Type': 'application/json'
    };
    // if (getToken()) {
    //   config.headers['X-Authorization'] = getToken();
    // }
   
    return config;
  },
  error => Promise.reject(err),
);


// http response 拦截器
axios.interceptors.response.use(
  (response) => {
    if (response.data.code == 401) {
      Message({
        message:response.data.message,
        type: 'error',
        duration: 5 * 1000
      })
      removeToken()
    }
    return response;
  },
  error => Promise.reject(error),
);
/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function fetch(url, params = {},configs={}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params,
      ...configs
    })
      .then((response) => {
        if(configs.original){  //用于配置要求返回响应原文
          resolve(response);
        }else{
          resolve(response.data);
        }        
      })
      .catch((err) => {
        reject(err);
      });
  });
}


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then((response) => {
        resolve(response.data);
      }, (err) => {
        reject(err);
      });
  });
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, data)
      .then((response) => {
        resolve(response.data);
      }, (err) => {
        reject(err);
      });
  });
}

