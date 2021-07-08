/*
 * @Author: XunL
 * @Date: 2021-07-09 01:09:20
 * @LastEditTime: 2021-07-09 01:34:45
 * @Description: file content
 */
import { createApp } from './app'

// 客户端特定引导逻辑……

const { app } = createApp()

// 这里假定 App.vue 模板中根元素具有 `id="app"`
app.$mount('#app')