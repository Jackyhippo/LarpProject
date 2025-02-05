import passport from 'passport'
import passportLocal from 'passport-local'
import User from './models/user.js'
import bcrypt from 'bcrypt'

// 引用 passportLocal 驗證策略
// 編寫 login 驗證方式
// new 策略(設定, 完成執行的function)
passport.use(
  'login',
  new passportLocal.Strategy(
    {
      // 指定讀取 req.body 的帳號欄位，預設是 username ，改為 account
      usernameField: 'account',
      // 指定讀取 req.body 的密碼欄位，預設是 password
      passwordField: 'password',
    },
    // 參數不一定是三個，會依照驗證策略不同而有所不同
    async (account, password, done) => {
      try {
        // 查詢有沒有符合帳號的使用者
        // findOne => 去資料庫找一筆資料
        const user = await User.findOne({ account: account }).orFail(new Error('ACCOUNT'))
        // 檢查密碼
        if (!bcrypt.compareSync(password, user.password)) {
          throw new Error('PASSWORD')
        }
        // 完成驗證方式，將資料帶入下一步處理
        // done(錯誤, 資料, info)
        return done(null, user, null)
      } catch (error) {
        console.log(error)
        if (error.message === 'ACCOUNT') {
          return done(null, null, { message: 'userNotFound' })
        } else if (error.message === 'PASSWORD') {
          return done(null, null, { message: 'userPasswordIncorrect' })
        } else {
          return done(null, null, { message: 'serverError' })
        }
      }
    },
  ),
)
