import passport from 'passport'
import { StatusCodes } from 'http-status-codes'

export const login = (req, res, next) => {
  // 使用 passport 的 login 驗證方式
  // passport.authenticate(驗證方式名稱, 選項, 處理的function)
  // session: false 停用 cookie
  // (error, user, info) 對應 done() 的三個東西
  passport.authenticate('login', { session: false }, (error, user, info) => {
    console.log(error, user, info)
    // 如果沒有收到資料或發生錯誤
    if (!user || error) {
      // Local 驗證策略的錯誤，缺少指定欄位的資料
      if (info.message === 'Missing credentials') {
        info.message = 'requestFormatError'
      }
      // 一定要下 return 不然直接進到下一步，會出錯
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: info.message,
      })
    }
    // 將查詢到的登入使用者放入 req 中給後續的 controller 或 middleware 使用
    req.user = user
    // 繼續下一步
    next()
  })(req, res, next)
}
