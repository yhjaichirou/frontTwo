import axios from 'axios'
import {
    Notify
} from 'vant';
import {
    Toast
} from 'vant';

let HTTP = axios.create({
    baseURL: 'http://39.98.195.234:7001/',
    timeout: 60000,
    responseType: 'json',
    headers: {
        'token': 'miaov',
        'content-type': 'application/json',
    }
    // transformRequest:[function(data){
    //     console.log(data)
    //   data.age = 30;  //发送之前增加的属性
    //   return queryString.stringify(data);    //利用对应方法转换格式
    // }]
});
HTTP.interceptors.request.use(function(config) {
    //在发送请求之前做某事
    if (!config.headers.hideToast) {
        Toast.loading({
            message: '加载中...',
            forbidClick: true,
        });
    }
    return config;
}, function(error) {
    //请求错误时做些事
    return Promise.reject(error);
});
HTTP.interceptors.response.use(function(data) {
    Toast.clear()
    if (data.status !== 200) {
        Notify({
            type: 'warning',
            message: '请求出现错误'
        });
    } else if (!data.config.headers.hidenotify && data.data.code !== 0) {
        Notify({
            type: 'warning',
            message: data.data.msg
        });
    }
    return data.data; //只有return data后才能完成响应
})
export const HTTPS = HTTP;