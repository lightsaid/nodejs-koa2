const Koa = require('koa');
const parser = require('koa-bodyparser')  // 获取post请求的body参数
const InitManager = require('./core/init')
const catchError = require('./middlewares/exception')


// 应用程序对象 中间件
const app = new Koa();
app.use(catchError)

app.use(parser())
InitManager.initCore(app)


app.listen(3000)