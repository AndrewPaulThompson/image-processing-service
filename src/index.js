const http = require('https')
const Koa = require('koa')
const Router = require('@koa/router')
const { processImage } = require('./image')

const app = new Koa()
const router = new Router()

router.get('/service/:url', async (ctx, next) => {
  let mimeType
  const image = await new Promise((resolve, reject) => {
    http.get(ctx.params.url, res => {
      mimeType = res.headers['content-type']
      let buffers = []
      
      res.on('data', chunk => {
        buffers.push(chunk)
      })

      res.on('end', () => {
        resolve(Buffer.concat(buffers))
      })
    })
  })

  ctx.response.set("content-type", mimeType)
  ctx.body = await processImage(image)
})

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(3000)
