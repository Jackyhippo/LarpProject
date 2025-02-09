import passport from 'passport'
import passportLocal from 'passport-local'
import User from './models/user.js'
import bcrypt from 'bcrypt'
import passportJWT from 'passport-jwt'

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

// 引用 passportJWT 驗證策略
// 編寫 jwt 驗證方式
passport.use(
  'jwt',
  new passportJWT.Strategy(
    {
      // jwt 的位置
      jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
      // secret
      secretOrKey: process.env.JWT_SECRET,
      // 讓後面的 function 能使用 req
      passReqToCallback: true,
    },
    // req = 請求資訊，有設定 passReqToCallback 才能用
    // payload = 解碼後的資料
    // done = 下一步
    async (req, payload, done) => {
      try {
        // 因為沒有提供原始的 jwt，所以利用套件的語法取得
        // const token = req.headers.authorization.split(' ')[1] => 自己寫
        const token = passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken()(req)
        // 用解碼的資料查詢有沒有使用者
        const user = await User.findById(payload._id).orFail(new Error('USER'))
        // 找到使用者後，檢查資料庫有沒有這個 jwt
        if (!user.tokens.includes(token)) {
          throw new Error('TOKEN')
        }
        // 都沒問題，下一步
        return done(null, { user, token }, null)
      } catch (error) {
        console.log(error)
        if (error.message === 'USER') {
          return done(null, null, { message: 'userNotFound' })
        } else if (error.message === 'TOKEN') {
          return done(null, null, { message: 'userTokenInvalid' })
        } else {
          return done(null, null, { message: 'serverError' })
        }
      }
    },
  ),
)
