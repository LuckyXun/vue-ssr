/*
 * @Author: XunL
 * @Date: 2021-07-09 01:09:09
 * @LastEditTime: 2021-07-14 02:03:38
 * @Description: file content
 */
import Vue from 'vue'
import App from './App.vue'
import VueMeta from 'vue-meta'


import { createStore } from './store'
import { createRouter } from "./router"
Vue.use(VueMeta)



// 导出一个工厂函数，用于创建新的
// 应用程序、router 和 store 实例
Vue.mixin({
    metaInfo: {
        titleTemplate: '%s - Xun!',
        htmlAttrs: {
            lang: 'cn',
            amp: true
        }
    }
})


export function createApp() {
    const router = createRouter();
    const store = createStore();
    const app = new Vue({
        store,
        router,
        render: h => h(App)
    })
    return { app, router, store }
}