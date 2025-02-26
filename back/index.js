import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import { StatusCodes } from 'http-status-codes'
import routerUser from './routers/user.js'
import routerProduct from './routers/product.js'
import routerOrder from './routers/order.js'
import cors from 'cors'
import './passport.js'

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log('資料庫連線成功')
  })
  .catch((error) => {
    console.log('資料庫連失敗')
    console.log(error)
  })

const app = express()

app.use(
  // 可以裡面都不加，就是允許全部的請求，或是寫 function 允許特定的網域請求
  cors({
    origin(origin, callback) {
      console.log(origin)
      if (
        origin === undefined ||
        origin.includes('localhost') ||
        origin.includes('127.0.0.1') ||
        origin.includes('github.io')
      ) {
        callback(null, true)
      } else {
        callback(new Error('CORS'), false)
      }
    },
  }),
)
// 這邊不會寫錯誤給 cors 因為前端看不到錯誤，除非是用 postman 才會出現錯誤提示
// 所以出現錯誤會在 postman 上看到 requestFormatError

app.use(express.json())
app.use((error, req, res, next) => {
  res.status(StatusCodes.BAD_REQUEST).json({
    success: false,
    message: 'requestFormatError',
  })
})

app.use('/user', routerUser)
app.use('/product', routerProduct)
app.use('/order', routerOrder)

app.listen(process.env.PORT || 4000, () => {
  console.log('伺服器啟動')
})
