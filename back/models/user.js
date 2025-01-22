import { Schema, model } from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcrypt'

const schema = new Schema({
  account: {
    type: String,
    required: [true, '使用者帳號必填'],
    minlength: [4, '帳號太短'],
    maxlength: [20, '帳號太長'],
    unique: true,
    validate: {
      validator(value) {
        // 使用 validator isAlphanumeric 判斷是否為英、數字
        return validator.isAlphanumeric(value)
      },
      message: 'accountInvalid',
    },
  },
})

export default model('users', schema)
