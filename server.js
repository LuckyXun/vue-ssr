/*
 * @Author: XunL
 * @Description: 
 */
const Vue = require('vue')
const express = require('express')
const fs = require('fs')
const setupDevServer = require('./build/setup-dev-server')
const server = express()
server.use('/dist', express.static('./dist'))
const createBundleRenderer = require('vue-server-renderer').createBundleRenderer

let renderer = null;
let onReady = null;


const isProd = process.env.NODE_ENV === 'production'; // 是否是生产环境





if (isProd) {
    const serverBundle = require('./dist/vue-ssr-server-bundle.json')
    const template = fs.readFileSync('./index.template.html', 'utf-8')
    const clientManifest = require('./dist/vue-ssr-client-manifest.json')
    renderer = createBundleRenderer(serverBundle, { template, clientManifest })
} else {
    // setupDevServer 返回一个Promise
    onReady = setupDevServer(server, (serverBundle, template, clientManifest) => {
        console.log('callback')
        renderer = createBundleRenderer(serverBundle, {
            template,
            clientManifest
        })
    })
}




const render = async(req, res) => {
    try {
        console.log("render")
        console.log(renderer)
        const html = await renderer.renderToString({
            title: '拉勾教育',
            meta: `
            <meta name="description" content="拉勾教育">
          `,
            url: req.url
        })
        res.setHeader('Content-Type', 'text/html; charset=utf8')
        res.end(html)
    } catch (err) {
        console.log(err)
        res.status(500).end('Internal Server Error.')
    }
}





// 服务端路由设置为 *，意味着所有的路由都会进入这里
server.get('*', isProd ?
    render :
    async(req, res) => {
        // 等待有了 Renderer 渲染器以后，调用 render 进行渲染 ??会不会每次都进入这个Promise

        await onReady
        render(req, res)
    }
)

server.listen(3004, () => { console.log('server running at port 3000.') })