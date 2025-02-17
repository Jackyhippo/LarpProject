import { Schema, model } from 'mongoose'

const schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'productNameRequired'],
    },
    price: {
      type: Number,
      required: [true, 'productPriceRequired'],
      min: [0, 'productPriceTooSmall'],
    },
    image: {
      type: String,
      required: [true, 'productImageRequired'],
    },
    description: {
      type: String,
      required: [true, 'productDescriptionRequired'],
    },
    category: {
      type: String,
      required: [true, 'productCategoryRequired'],
      enum: {
        values: ['硬核推理', '情感沈浸', '恐怖驚悚', '機制陣營', 'five', '真相還原'],
        message: 'productCategoryInvalid',
      },
    },
    sell: {
      type: Boolean,
      required: [true, 'productSellRequired'],
    },
  },
  {
    // 告訴 Mongoose 不要在每個文檔中自動創建 _v 字段（這是 Mongoose 用來追踪文檔版本的）。
    versionKey: false,
    // 會自動創建 createdAt 和 updatedAt 兩個時間戳字段，方便追踪文檔的創建和更新時間。
    timestamps: true,
  },
)

export default model('products', schema)
