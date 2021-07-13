/*
 * @Author: XunL
 * @Date: 2021-07-09 01:09:20
 * @LastEditTime: 2021-07-14 02:12:29
 * @Description: file content
 */
import { createApp } from './app'

// 客户端特定引导逻辑……

const { app, router, store } = createApp()
if (window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__)
}

router.onReady(() => {
    app.$mount('#app');

})