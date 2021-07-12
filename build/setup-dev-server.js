const fs = require('fs');
const path = require('path')
const webpack = require('webpack')
const chokidar = require('chokidar')

const devMiddleware = require('webpack-dev-middleware') //使用内存文件中间件
const hotMiddleware = require('webpack-hot-middleware') //热更新中间件


const resolve = file => path.resolve(__dirname, file);

module.exports = (server, callback) => {
    let ready
    const onReady = new Promise(resolve => ready = resolve); //ready 设置为该Promise的resolve，用于阻塞该Promise

    let template
    let serverBundle
    let clientManifest

    // 执行构建
    const update = () => {
        //只有三个要素同时存在时，才继续往下进行，promise进入到下一步
        if (template && serverBundle && clientManifest) {
            ready()
            callback(serverBundle, template, clientManifest)
        }
    }
    const templatePath = resolve('../index.template.html')
    template = fs.readFileSync(templatePath, 'utf-8');
    update();


    // 监听模板文件的改变
    chokidar.watch('templatePath').on('change', () => {
        template = fs.readFileSync(templatePath, 'utf-8');
        update()
    })

    // 监听服务端文件变化
    const serverConfig = require('./webpack.server.config.js')
    const serverCompiler = webpack(serverConfig)
    const serverDevMiddleware = devMiddleware(serverCompiler, {
        logLevel: 'silent' // 关闭日志输出，由 FriendlyErrorsWebpackPlugin 处理
    })
    serverCompiler.hooks.done.tap('server', () => {
        console.log("服务端构建")
        serverBundle = JSON.parse(
            // 使用内存中的文件系统
            serverDevMiddleware.fileSystem.readFileSync(resolve('../dist/vue-ssr-server-bundle.json'), 'utf-8')
        )
        update()
    })

    // 监听客户端文件
    // 监视构建 clientManifest -> 调用 update -> 更新 Renderer 渲染器
    const clientConfig = require('./webpack.client.config')
    clientConfig.plugins.push(new webpack.HotModuleReplacementPlugin())
    clientConfig.entry.app = [
        'webpack-hot-middleware/client?quiet=true&reload=true', // 和服务端交互处理热更新一个客户端脚本
        clientConfig.entry.app
    ]
    clientConfig.output.filename = '[name].js' // 热更新模式下确保一致的 hash
    const clientCompiler = webpack(clientConfig)
    const clientDevMiddleware = devMiddleware(clientCompiler, {
        publicPath: clientConfig.output.publicPath,
        logLevel: 'silent' // 关闭日志输出，由 FriendlyErrorsWebpackPlugin 处理
    })
    clientCompiler.hooks.done.tap('client', () => {
        console.log("客户端构建")
        clientManifest = JSON.parse(
            clientDevMiddleware.fileSystem.readFileSync(resolve('../dist/vue-ssr-client-manifest.json'), 'utf-8')
        )
        update()
    })
    server.use(hotMiddleware(clientCompiler, {
        log: false // 关闭它本身的日志输出
    }))

    // 使用内存中的文件系统
    server.use(clientDevMiddleware)



    return onReady
}