import { Schema, model } from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcrypt'
import UserRole from '../enums/UserRole'

const schema = new Schema({
  account: {
    type: String,
    required: [true, 'accountRequired'],
    minlength: [4, 'accountTooShort'],
    maxlength: [20, 'accountTooLong'],
    // 必填
    unique: true,
    validate: {
      validator(value) {
        // 使用 validator 的 isAlphanumeric 判斷是否為英、數字
        return validator.isAlphanumeric(value)
      },
      message: 'accountInvalid',
    },
  },
  password: {
    type: String,
    required: [true, 'passwordRequired'],
  },
  email: {
    type: String,
    required: [true, 'emailRequired'],
    unique: true,
    validate: {
      validator(value) {
        return validator.isEmail(value)
      },
      message: 'emailInvalid',
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
})

export default model('users', schema)
