// import axios from 'axios';
import config from '../config';
import {
  URLEncode
} from "../plugins/until";
const instance = axios.create({
  baseURL: config.baseUrl,
  timeout: 30000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add a request interceptor
instance.interceptors.request.use(function (opts) {
  return opts;
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
  if (response.status === 200) {
    return response.data;
  } else {
    return Promise.reject(response);
  }
}, function (error) {
  // 错误处理 考虑注册登录进入页面，时间过久，失效。
  if (error.response.status === 302) {
    // 未在微信端登陆过，请求后台接口带上当前页面路径。
    const url = URLEncode(location.href);
    location.href = "http://itp.jsure.com/home/validateCode?callbackUrl=" + url;
  } else if (error.response.status === 403) {
    // 已经在微信端登录过，未注册过。
    const url = URLEncode(location.href);
    // 防止页面进入循环
    if (location.href.indexOf('register') > 0 && location.href.indexOf('registerResult') < 0) {} else {
      alert("请先注册")
      setTimeout(() => {
        location.href = "http://itp.jsure.com/home/validateCode?callbackUrl=" + url
      }, 2000)
    }
  } else if (error.response.status >= 500) {
    alert("服务器错误！请稍后再试！")
  }
  return Promise.reject(error);
});
const http = {
  request(opts) {
    return instance.request(opts);
  },
  get(url, params, opts) {
    opts = opts || {};
    opts.method = 'get';
    opts.url = url;
    if (params) {
      opts.params = params;
    }
    return this.request(opts);
  },

  delete(url, params, opts) {
    opts = opts || {};
    opts.method = 'delete';
    opts.url = url;
    if (params) {
      opts.params = params;
    }
    return this.request(opts);
  },

  post(url, data, opts) {
    opts = opts || {};
    opts.method = 'post';
    opts.url = url;
    if (data) {
      opts.data = data;
    }
    return this.request(opts);
  },

  put(url, data, opts) {
    opts = opts || {};
    opts.method = 'put';
    opts.url = url;
    if (data) {
      opts.data = data;
    }
    return this.request(opts);
  },

  patch(url, data, opts) {
    opts = opts || {};
    opts.method = 'patch';
    opts.url = url;
    if (data) {
      opts.data = data;
    }
    return this.request(opts);
  }
};

export default http;
