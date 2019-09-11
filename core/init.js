const Router = require('koa-router')
const requireDirectory = require('require-directory') // 批量导入
const config = require('../config/config')

class InitManager{

    static initCore(app){
        // 入口方法
        InitManager.app = app;
        InitManager.initLoadRouter();
        InitManager.loadConfig();
    }

    static loadConfig(path=''){
        const configPath = path || process.cwd() + '/config/config.js'
        const config = require(configPath)
        global.config = config;
    }

    static initLoadRouter(){
        const apiDirectory = `${process.cwd()}/app/api`; // 获取决定路径
        requireDirectory(module, apiDirectory,{
            visit: whenLoadModule
        })

        function whenLoadModule(router) {
            if (router instanceof Router) {
                InitManager.app.use(router.routes())
            }
        }
        
    }
}

module.exports = InitManager