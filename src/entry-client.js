/*
 * @Author: XunL
 * @Date: 2021-07-09 01:09:20
 * @LastEditTime: 2021-07-13 16:39:17
 * @Description: file content
 */
import { createApp } from './app'

// 客户端特定引导逻辑……

const { app, router } = createApp()

router.onReady(() => {
    app.$mount('#app')
})