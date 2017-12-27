### koa2 proxies
[![npm](https://img.shields.io/npm/dt/koa2-proxies.svg)]()
[![GitHub issues](https://img.shields.io/github/issues/hpoenixf/koa2-proxies.svg)](https://github.com/hpoenixf/koa2-proxies/issues)
[![GitHub license](https://img.shields.io/github/license/hpoenixf/koa2-proxies.svg)](https://github.com/hpoenixf/koa2-proxies/blob/master/LICENSE)
Powered by [request](https://github.com/request/request)
基于request的用于koa2的代理中间件
npm install koa2-proxies

#### example

```javascript
const koa = require('koa2')

const app = new koa()
const proxy = require('koa2-proxies')
const proxyUrl = ['/v2']
app.use(async function  (ctx, next) {
  console.log(ctx.path)
  if (proxyUrl.some(i => ctx.path.indexOf(i) === 0)) {
    await proxy({host: 'http://api.douban.com', ctx})
  } else {
    await next()
  }
})

const port = 4567
app.listen(port, () => console.log(`==> Listening at http://localhost:${port}`))

```

then visit http://127.0.0.1:4567/v2/movie/subject/26865690