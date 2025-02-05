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

export const login = async (req, res) => {
  try {
    // jwt.sign(儲存資料, SECRET, 設定)
    const token = jwt.sign({ _id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '7 days' })
  } catch (error) {
    console.log(error)
  }
}
