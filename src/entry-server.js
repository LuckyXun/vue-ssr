/*
 * @Author: XunL
 * @Date: 2021-07-09 01:09:30
 * @LastEditTime: 2021-07-14 02:27:04
 * @Description: file content
 */
import { createApp } from './app'

export default async context => {

    const { app, router, store } = createApp()
    const meta = app.$meta()
   
    router.push(context.url)
    context.meta = meta
    await new Promise(router.onReady.bind(router));
    context.rendered = () => {
        context.state = store.state
    }
    return app
}