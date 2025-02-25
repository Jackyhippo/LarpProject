import { Schema, model, ObjectId, Error } from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcrypt'
import UserRole from '../enums/UserRole.js'

const cartSchema = new Schema({
  product: {
    type: ObjectId,
    ref: 'products',
    required: [true, 'userCartProductRequired'],
  },
  selectedDate: {
    type: Date,
    required: [true, 'userCartSelectedDateRequired'],
    validate: {
      validator: function (value) {
        // 確保日期不是過去的日期
        return value >= new Date().setHours(0, 0, 0, 0)
      },
      message: 'userCartSelectedDateInvalid',
    },
    // 存入資料庫時轉換格式
    set: function (value) {
      if (value) {
        return new Date(value).toISOString().split('T')[0]
      }
      return value
    },
  },
  selectedTime: {
    type: String,
    required: [true, 'userCartSelectedTimeRequired'],
    enum: {
      values: ['早上：08:00 ~ 12:00', '下午：01:00 ~ 05:00', '晚上：06:00 ~ 10:00'],
      message: 'userCartSelectedTimeInvalid',
    },
  },
})
// 加入複合索引確保同一個商品在同一天不會被重複預約
cartSchema.index({ product: 1, selectedDate: 1 }, { unique: true })

// schema = 藍圖
const schema = new Schema(
  {
    account: {
      type: String,
      required: [true, 'userAccountRequired'],
      minlength: [4, 'userAccountTooShort'],
      maxlength: [20, 'userAccountTooLong'],
      // 唯一性
      unique: true,
      validate: {
        validator(value) {
          // 使用 validator 的 isAlphanumeric 判斷是否為英、數字
          return validator.isAlphanumeric(value)
        },
        message: 'userAccountInvalid',
      },
    },
    password: {
      type: String,
      required: [true, 'userPasswordRequired'],
    },
    email: {
      type: String,
      required: [true, 'userEmailRequired'],
      unique: true,
      validate: {
        validator(value) {
          return validator.isEmail(value)
        },
        message: 'userEmailInvalid',
      },
    },
    // 保存登入的 jwt
    tokens: {
      type: [String],
    },
    role: {
      type: Number,
      default: UserRole.USER,
    },
    cart: {
      type: [cartSchema],
    },
  },
  {
    // 告訴 Mongoose 不要在每個文檔中自動創建 _v 字段（這是 Mongoose 用來追踪文檔版本的）。
    versionKey: false,
    // 會自動創建 createdAt 和 updatedAt 兩個時間戳字段，方便追踪文檔的創建和更新時間。
    timestamps: true,
  },
)

// schema.virtual(欄位名稱).get(資料產生方式)
// 建立不存在的動態虛擬欄位
// 資料產生方式 function 內的 this 代表一筆資料
// 改為預約數量
schema.virtual('bookingCount').get(function () {
  return this.cart.length
})
// schema.virtual('cartQuantity').get(function () {
//   const user = this
//   return user.cart.reduce((total, current) => {
//     return total + current.quantity
//   }, 0)
// })

// mongoose 驗證後，存入資料庫前執行動作 (Middleware)
schema.pre('save', function (next) {
  const user = this
  // 密碼欄位有修改再處理
  if (user.isModified('password')) {
    // 自己寫驗證
    if (user.password.length < 4) {
      // ValidationError：表示整個文檔驗證錯誤，包含多個字段的錯誤。
      // ValidatorError：表示單個字段的驗證錯誤，是 ValidationError 的組成部分。
      const error = new Error.ValidationError()
      error.addError('password', new Error.ValidatorError({ message: 'userPasswordTooShort' }))
      next(error)
    } else if (user.password.length > 20) {
      const error = new Error.ValidationError()
      error.addError('password', new Error.ValidatorError({ message: 'userPasswordTooLong' }))
      next(error)
    } else {
      // '10' 是加密的次數（也稱為 salt rounds），越高表示加密會更慢、更安全。
      user.password = bcrypt.hashSync(user.password, 10)
    }
  }
  next()
})

export default model('users', schema)
