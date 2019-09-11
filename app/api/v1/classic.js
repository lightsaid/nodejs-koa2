const Router = require('koa-router')
const { PositiveIntegerValidator } = require('../../validators/validator')
const router = new Router();

const { HttpException, ParameterException } = require('../../../core/http-exception')

router.post('/v1/:id/calssic/latest', (ctx, next)=>{
    // 传参方式 -> 常见4中
    // header
    // body
    const path = ctx.params  // 获取 :id
    const query = ctx.request.query
    const headers = ctx.request.header
    const body = ctx.request.body

    const v = new PositiveIntegerValidator().validate(ctx)

    if(!query.name){  // 已知异常
        // const error = new ParameterException('query参数没有aaa',10001,400)
        const error = new ParameterException()
        // error.requestUrl = `${ctx.method} ${ctx.path}`
        throw error
    }
    // console.log('测试时')
    // throw  new Error('API ERROR')
})

module.exports = router