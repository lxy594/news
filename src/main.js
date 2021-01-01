import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'


// 对 vue 本身进行改造 以后内部的组件可以 this.$axios 访问请求
Vue.prototype.$axios = axios
    // vant组件
import Vant, { Toast } from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);


// element组件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


Vue.use(ElementUI);


// 封装一个基本路径 
axios.defaults.baseURL = "http://157.122.54.189:9083"
    // axios.defaults.baseURL = "http://liangwei.tech:3000"
    //4.拦截器
    //4.1固定写法
axios.interceptors.response.use(res => {
    console.log('路过的将数据返回');
    const errorcode = /^4\d{2}$/
    if (errorcode.test(res.data.statusCode)) {
        // 弹出错误的提示登录失败
        Toast.fail('密码或用户名错误' || '系统错误')
    }
    // 所有的信息校验错误应该返回到登录框
    if (res.data.message == "用户信息验证失败") {
        // 删除token userId
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        router.replace('/Login')
    }
    return res;
});

//header的请求拦截器
//不管在哪一个页面那个请求只要调用axios发出的 会被拦截会自动拦截它没有带但是有我自动补上 
//然后把其他的header删掉
axios.interceptors.request.use(config => {
    // Do something before request is sent
    if (!config.headers.Authorization && localStorage.getItem('token')) {
        config.headers.Authorization = localStorage.getItem('token')
    }
    return config;
})

// 添加全局过滤器
//传入两个参数 ,过滤器名还有函数的名称
Vue.filter('fixImgurl', (oldurl) => {

    // 为了避免图片的不完整 带http:/就是完整的直接返回 不完整就拼接
    if (oldurl.indexOf("http") > -1) {
        return oldurl;
    } else {
        return axios.defaults.baseURL + oldurl;
    }
})


Vue.config.productionTip = false;

new Vue({
    router,
    render: function(h) { return h(App) }
}).$mount('#app')