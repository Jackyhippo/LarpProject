import User from '../models/user.js'
import Product from '../models/product.js'
import { StatusCodes } from 'http-status-codes'
import jwt from 'jsonwebtoken'
import validator from 'validator'
import mongoose from 'mongoose'

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
        cart: req.user.cart.length, // 修改為直接回傳購物車預約數量
        // cart: req.user.cartQuantity,
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
      cart: req.user.cart.length, // 修改為直接回傳購物車預約數量
      // cart: req.user.cartQuantity,
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
export const getCart = async (req, res) => {
  try {
    const result = await User.findById(req.user._id, 'cart').populate('cart.product')
    res.status(StatusCodes.OK).json({
      success: true,
      message: '',
      result: result.cart,
    })
  } catch (error) {
    console.log('controller user getCart', error)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'serverError',
    })
  }
}

// 更新購物車
export const updateCart = async (req, res) => {
  console.log('1111', req.body)
  try {
    // 檢查傳入的商品 ID 格式
    if (!validator.isMongoId(req.body.product)) throw new Error('ID')
    // 確保 selectedDate 是有效日期
    if (!validator.isISO8601(req.body.selectedDate)) throw new Error('DATE_INVALID')
    // 檢查是否提供了 selectedTime 並且在允許的選項內
    const allowedTimes = ['早上：08:00 ~ 12:00', '下午：01:00 ~ 05:00', '晚上：06:00 ~ 10:00']
    if (!req.body.selectedTime || !allowedTimes.includes(req.body.selectedTime)) {
      throw new Error('TIME_INVALID')
    }
    // 檢查是否為過去日期
    const selectedDate = new Date(req.body.selectedDate)
    if (selectedDate < new Date()) throw new Error('DATE_PAST')

    // 將傳入的日期轉換為相同格式以便比較
    const bookingDate = new Date(req.body.selectedDate).toISOString().split('T')[0]

    // 檢查當前用戶是否已預約該日期
    const existingCartItem = req.user.cart.findIndex((item) => {
      const itemDate = new Date(item.selectedDate).toISOString().split('T')[0]
      return (
        item.product.toString() === req.body.product &&
        itemDate === bookingDate &&
        item.selectedTime === req.body.selectedTime
      )
    })
    if (existingCartItem > -1) {
      throw new Error('DATE_DUPLICATE')
    }

    // 檢查該日期是否已被其他用戶預約
    const existingBooking = await User.findOne({
      _id: { $ne: req.user._id },
      // 排除當前用戶
      'cart.product': req.body.product,
      'cart.selectedDate': req.body.selectedDate,
      'cart.selectedTime': req.body.selectedTime,
    })
    if (existingBooking) {
      throw new Error('DATE_BOOKED')
    }
    // 沒有商品，檢查商品是否存在
    const product = await Product.findById(req.body.product).orFail(new Error('NOT FOUND'))
    // 檢查沒有上架，錯誤
    if (!product.sell) throw new Error('SELL')

    // 新增預約
    req.user.cart.push({
      product: req.body.product,
      selectedDate: bookingDate,
      selectedTime: req.body.selectedTime,
    })
    console.log('2222')

    await req.user.save()
    res.status(StatusCodes.OK).json({
      success: true,
      message: '',
      result: req.user.cart,
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
    } else if (error.message === 'DATE_INVALID') {
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: 'invalidDate',
      })
    } else if (error.message === 'DATE_PAST') {
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: 'pastDateNotAllowed',
      })
    } else if (error.message === 'TIME_INVALID') {
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: 'invalidTime',
      })
    } else if (error.message === 'DATE_DUPLICATE') {
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: 'dateAlreadyBooked',
      })
    } else if (error.message === 'DATE_BOOKED') {
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: 'dateBookedByOthers',
      })
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'serverError',
      })
    }
  }
}

export const deleteCart = async (req, res) => {
  try {
    console.log('req.body.id', req.body.id)
    const idx = req.user.cart.findIndex((item) => item._id.toString() === req.body.id)
    if (idx === -1) throw new Error('NOT FOUND')
    req.user.cart.splice(idx, 1)
    await req.user.save()
    res.status(StatusCodes.OK).json({
      success: true,
      message: '',
      result: req.user.cart,
    })
  } catch (error) {
    console.log('controller user deleteCart', error)
    if (error.message === 'NOT FOUND') {
      res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: 'cartItemNotFound',
      })
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'serverError',
      })
    }
  }
}
