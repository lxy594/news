import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../views/home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import User from '../views/User.vue'
// 编辑用户名
import Complice from '../views/Complice.vue'

import Focus from '../views/Focus.vue'
// 测试用户
import Text from '../views/Text.vue'
import Index from '../views/Index.vue'
// 收藏页
import collect from '../views/collect.vue'
//搜索页
import Search from '../views/Search.vue'
// 文章详情
import details from '../views/details.vue'
// 栏目管理
import Manage from '../views/Manage.vue'
// 精彩更贴
import Wondercom from '../views/Wondercom.vue'
// 我的跟帖
import Comment from '../views/Comment.vue'
Vue.use(VueRouter)

const routes = [{
        path: '/home',
        name: 'home',
        component: home
    }, {
        path: '/login',
        name: 'Login',
        component: Login
    }, {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/User',
        name: 'User',
        component: User,
        meta: {
            needAuth: true
        }
    },
    {
        path: '/Complice',
        component: Complice,
        meta: {
            needAuth: true
        }
    },
    {
        path: '/focus',
        component: Focus,
        meta: {
            needAuth: true
        }
    },
    {
        path: '/text',
        component: Text,
        meta: {
            needAuth: true
        }
    },
    {
        path: '/',
        component: Index,
        name: 'Index'
    },
    {
        path: '/collect',
        component: collect,
        name: 'collect',
        meta: {
            needAuth: true
        }
    },
    {
        path: '/search',
        component: Search,
        name: 'Search',
        meta: {
            needAuth: true
        }
    },
    {
        path: '/details/:id',
        component: details,
        name: 'details'
    },
    {
        path: '/manage',
        component: Manage,
        name: 'Manage'
    },
    // 精彩更贴
    {
        path: '/wondercom/:id',
        component: Wondercom,
        name: 'Wondercom'
    },
    // 我的跟帖
    {
        path: '/comment',
        component: Comment,
        name: 'Comment'
    }

]

const router = new VueRouter({
    routes
})

//路由守卫实现未登录无法进入个人中心, 自动跳转到登录页
router.beforeEach((to, from, next) => {
    console.log(to.meta);
    // 1.用if判断:如果进入的是编辑资料也踢出去
    // if (to.path == '/User' || to.path == '/Complice') {


    // 第二种方法以数组的方式 怕多个  const pageNedd = ['/User', '/Complice'], if (pageNedd.indexOf(to.pat) > -1)

    // const pageNedd = ['/User', '/Complice']
    // if (pageNedd.indexOf(to.path) > -1) {

    // 3.第三种判断方法, 可以给页面路由配置设置 meta, 在这里判断即可 
    // 就编辑资料还有个人中心那个需要给他加meta
    if (to.meta.needAuth) {
        if (localStorage.getItem('token')) {
            // 存在就放行
            //因为异步回调所以用return防止后面
            return next()
        } else {
            //如果不存在跳转到登录页面
            return router.push('/Login')
        }
    }
    return next()

})

export default router