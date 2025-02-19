import User from '../models/user.js'
import Product from '../models/product.js'
import { StatusCodes } from 'http-status-codes'
import jwt from 'jsonwebtoken'
import validator from 'validator'

// 註冊帳號
export const create = async (req, res) => {
  try {
    await User.create(req.body)
    res.status(StatusCodes.OK).json({
      success: true,
      message: '',
    })
  } catch (error) {
    console.log('controller user create', error)
    // 錯誤處理
    // 帳號重複註冊 => 回傳 409 Conflict 狀態碼
    if (error.name === 'MongoServerError' && error.code === 11000) {
      res.status(StatusCodes.CONFLICT).json({
        success: false,
        message: 'userAccountDuplicate',
      })
      // 驗證錯誤 => 回傳 400 Bad Request 狀態碼
    } else if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: error.errors[key].message,
      })
      // 上述兩種以外錯誤(默認為伺服器內部錯誤) => 回傳 500 Internal Server Error 狀態碼
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'severError',
      })
    }
  }
}

// 登入帳號
export const login = async (req, res) => {
  try {
    // jwt.sign(儲存資料, SECRET, 設定)
    // SECRET 是 jwt 拿來驗證的密鑰
    // 傳入的第一個參數是包含用戶 _id 的對象，這是 JWT 的有效資料
    // 第二個參數是密鑰 process.env.JWT_SECRET，是用來加密 JWT 的密鑰
    // 第三個參數是設定過期時間為 7 天
    const token = jwt.sign({ _id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '7 days' })
    req.user.tokens.push(token)
    await req.user.save()
    res.status(StatusCodes.OK).json({
      success: true,
      message: '',
      result: {
        token,
        account: req.user.account,
        role: req.user.role,
        cart: req.user.cartQuantity,
      },
    })
  } catch (error) {
    console.log('controller user login', error)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'serverError',
    })
  }
}

// 檢視用戶資料
export const profile = async (req, res) => {
  // 用戶成功登入後，從 req.user 中取出用戶資料，並回應
  res.status(StatusCodes.OK).json({
    success: true,
    message: '',
    result: {
      account: req.user.account,
      role: req.user.role,
      cart: req.user.cartQuantity,
    },
  })
}

// 更換新的 token
export const refresh = async (req, res) => {
  try {
    const idx = req.user.tokens.findIndex((token) => token === req.token)
    const token = jwt.sign({ _id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '7 days' })
    req.user.tokens[idx] = token
    await req.user.save()
    res.status(StatusCodes.OK).json({
      success: true,
      message: '',
      result: token,
    })
  } catch (error) {
    console.log('controller user refresh', error)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'serverError',
    })
  }
}

// 登出
export const logout = async (req, res) => {
  try {
    const idx = req.user.tokens.findIndex((token) => token === req.token)
    req.user.tokens.splice(idx, 1)
    await req.user.save()
    res.status(StatusCodes.OK).json({
      success: true,
      message: '',
    })
  } catch (error) {
    console.log('controller user logout', error)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'serverError',
    })
  }
}

// 取得購物車
export const getCart = async (req, res) => {}

// 更新購物車
export const updateCart = async (req, res) => {
  try {
    // 驗證購物車商品 ID 是否為有效的 MongoDB ObjectId
    if (!validator.isMongoId(req.body.product)) throw new Error('ID')
    // 檢查購物車有沒有商品
    const idx = req.user.cart.findIndex((item) => item.product.toString() === req.body.product)
    if (idx > -1) {
      // 如果購物車有商品，修改數量
      const quantity = req.user.cart[idx].quantity + parseInt(req.body.quantity)
      if (quantity > 0) {
        // 數量大於 0，更新購物車商品數量
        req.user.cart[idx].quantity = quantity
      } else {
        // 數量小於等於 0，刪除購物車商品
        req.user.cart.splice(idx, 1)
      }
    } else {
      // 沒有商品，檢查商品是否存在
      const product = await Product.findById(req.body.product).orFail(new Error('NOT FOUND'))
      // 檢查沒有上架，錯誤
      if (!product.sell) throw new Error('SELL')
      req.user.cart.push({ product: req.body.product, quantity: req.body.quantity })
    }
    await req.user.save()
    res.status(StatusCodes.OK).json({
      success: true,
      message: '',
      result: req.user.cartQuantity,
    })
  } catch (error) {
    console.log('controller user updateCart', error)
    if (error.name === 'CastError' || error.message === 'ID') {
      res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: 'productIdInvalid',
      })
    } else if (error.message === 'NOT FOUND') {
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: 'productNotFound',
      })
    } else if (error.message === 'SELL') {
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: 'productNotOnSell',
      })
    }
  }
}
