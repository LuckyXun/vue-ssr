/*
 * @Author: XunL
 * @Description: router配置
 */
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
    // 返回一个函数，确保每次都创建新的router实例
export function createRouter() {
    return new Router({
        mode: 'history',
        routes: [{
                name: "home",
                path: "/",
                component: () =>
                    import ('@/pages/Home')
            },
            {
                path: '/about',
                name: 'about',
                component: () =>
                    import ('@/pages/About')
            },
            {
                path: '/posts',
                name: 'post-list',
                component: () =>
                    import ('@/pages/Posts')
            },
            {
                path: '*',
                name: 'error404',
                component: () =>
                    import ('@/pages/404')
            }
        ]
    })
}