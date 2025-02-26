import { Schema, model, ObjectId } from 'mongoose'

const cartSchema = new Schema({
  product: {
    type: ObjectId,
    ref: 'products',
    required: [true, 'orderCartProductRequired'],
  },
  selectedDate: {
    type: Date,
    required: [true, 'orderCartSelectedDateRequired'],
    validate: {
      validator: function (value) {
        // 確保日期不是過去的日期
        return value >= new Date().setHours(0, 0, 0, 0)
      },
      message: 'orderCartSelectedDateInvalid',
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
    required: [true, 'orderCartSelectedTimeRequired'],
    enum: {
      values: ['早上：08:00 ~ 12:00', '下午：01:00 ~ 05:00', '晚上：06:00 ~ 10:00'],
      message: 'userCartSelectedTimeInvalid',
    },
  },
})

const schema = new Schema(
  {
    user: {
      type: ObjectId,
      ref: 'users',
      required: [true, 'orderUserRequired'],
    },
    cart: {
      type: [cartSchema],
      required: [true, 'orderCartRequired'],
      validate: {
        validator(value) {
          return value.length > 0
        },
        message: 'orderCartEmpty',
      },
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
)

export default model('orders', schema)
