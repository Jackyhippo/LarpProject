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
        values: [
          'HardcoreReasoning',
          'DeepEmotional',
          'HorrorThriller',
          'MechanicalCamp',
          'HappyFunny',
          'TruthRestoration',
        ],
        message: 'productCategoryInvalid',
      },
    },
    sell: {
      type: Boolean,
      required: [true, 'productSellRequired'],
    },
    difficulty: {
      type: String,
      required: [true, 'productDifficultyRequired'],
      enum: {
        values: ['新手入門', '新手進階', '中等難度', '中等偏難', '高手挑戰'],
        message: 'productDifficultyInvalid',
      },
    },
    players: {
      type: Number,
      required: [true, 'productPlayersRequired'],
      enum: {
        values: [3, 4, 5, 6, 7, 8, 9, 10],
        message: 'productPlayersInvalid',
      },
    },
    location: {
      type: String,
      required: [true, 'productLocationRequired'],
      enum: {
        values: ['台北市', '新北市', '桃園市', '新竹縣/市', '台中市', '台南市', '高雄市'],
        message: 'productLocationInvalid',
      },
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
