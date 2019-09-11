
const { HttpException } = require('../core/http-exception')

// 全局处理异常,相当于在所以的中间件代码最外层加了一层try{}catch(error){}
// AOP 面向切面编程
// 监听错误
// 输出一段有意义的提示信息
const catchError = async (ctx,next) => {
    try {
        await next()
    } catch(error){
        if(global.config.envirronment === 'dev'){
            // throw error // 抛出异常后,后面的代码不会被执行,在控制台显示异常,方便开发者查找问题
        }
        // 以下是生产环境的异常,抛出给开发者和用户
        if(error instanceof HttpException) {  // 存在这个errorCode,已知类型的错误,这是自己定义的errorCode
            ctx.body = {
                msg: error.msg,
                error_code: error.errorCode,
                request: `${ctx.method} ${ctx.path}`
            }
            ctx.status = error.code;
        }else{
            ctx.body = {
                msg: '未知的异常',
                error_code: 999,
                request: `${ctx.method} ${ctx.path}`
            }
            ctx.status = 500;
        }

        // error 堆栈调用信息
        // error 简化明了的信息 给前端
        // HTTP Status Code 2xx 3xx 4xx 5xx
        // ctx.body = '服务器有点任性'
        /**
         * 错误返回参数
         * message
         * error_code 开发者前后端约定去定义
         * request_url  当前请求的url
         *  */

        // 已知型参数,
        // 未知型参数 程序潜在的错误, 无意识的 根本不知道它出错
    }
}

module.exports = catchError