import User from '../models/user.js'
import { StatusCodes } from 'http-status-codes'
import jwt from 'jsonwebtoken'

// 註冊帳號
export const create = async (req, res) => {
  try {
    await User.create(req.body)
    res.status(StatusCodes.OK).json({
      success: true,
      message: '',
    })
  } catch (error) {
    console.log(error)
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
    console.log(error)
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
