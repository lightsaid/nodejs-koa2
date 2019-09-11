const Koa = require('koa');

// 应用程序对象 中间件
const app = new Koa();

// 发送HTTP KOA 接收HTTP
// 中间件-> 函数
   
function test(){
    console.log('hello 7zeroc')
}

// 注册函数到app(koa)上,就是中间件,可以注册多个中间件,默认执行第一个
// app.use(test)
app.use(async (ctx,next)=>{
    // ctx 执行上下文
    // next 下一个中间件
    console.log('hello 7zeroc')
    // await 有求值的作用, 中间件 next() 默认会返回一个Promise,但是await会取Promise的值返回,所以不加async/await是返回Promise的
    const aa = await next()  

    console.log(1)
})

app.use(async (ctx, next)=>{
    console.log('hello lazy')
    await next()
    console.log(2)
})

// 总结 中间件 app.use(async (ctx,next)=>{ await next() })  一定要加上 async 和 await, 
// 为啥? 中间执行是一个洋葱模型,而nodejs是异步编程,当代码逻辑赋值执行事件长了,很难确定所有函数
//执行的顺序,加上async和await是确保中间件执行顺序是洋葱模型


// // async,await理解 待研究
// async function test(){
//     var bb = await fn();
//     console.log('bb=>>>',bb)
// }

// function fn(){
//     // setTimeout(()=>{
//     //     console.log(111)
//         return 'async,await理解';
//     // },1000)
// }

// test()

app.listen(3000)