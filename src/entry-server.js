/*
 * @Author: XunL
 * @Date: 2021-07-09 01:09:30
 * @LastEditTime: 2021-07-13 16:43:19
 * @Description: file content
 */
import { createApp } from './app'

export default async context => {
    const { app, router } = createApp()
    router.push(context.url)
    await new Promise(router.onReady.bind(router));
    return app
}