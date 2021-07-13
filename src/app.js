/*
 * @Author: XunL
 * @Date: 2021-07-09 01:09:09
 * @LastEditTime: 2021-07-13 16:08:16
 * @Description: file content
 */
import Vue from 'vue'
import App from './App.vue'
import { createRouter } from "./router"


// 导出一个工厂函数，用于创建新的
// 应用程序、router 和 store 实例



export function createApp() {
    const router = createRouter();

    const app = new Vue({
        router,
        render: h => h(App)
    })
    return { app, router }
}