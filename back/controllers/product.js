import { StatusCodes } from 'http-status-codes'
import Product from '../models/product.js'
import validator from 'validator'

// 上架商品
export const create = async (req, res) => {
  try {
    req.body.image = req.file?.path || ''
    const result = await Product.create(req.body)
    res.status(StatusCodes.OK).json({
      success: true,
      message: '',
      result,
    })
  } catch (error) {
    console.log('controller product create', error)
    // 驗證錯誤 => 回傳 400 Bad Request 狀態碼
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: error.errors[key].message,
      })
      // 上述以外錯誤(默認為伺服器內部錯誤) => 回傳 500 Internal Server Error 狀態碼
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'severError',
      })
    }
  }
}

export const get = async (req, res) => {
  try {
    const result = await Product.find({ sell: true })
    res.status(StatusCodes.OK).json({
      success: true,
      message: '',
      result,
    })
  } catch (error) {
    console.log('controller product get', error)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'severError',
    })
  }
}

export const getAll = async (req, res) => {
  try {
    const result = await Product.find()
    res.status(StatusCodes.OK).json({
      success: true,
      message: '',
      result,
    })
  } catch (error) {
    console.log('controller product getAll', error)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'severError',
    })
  }
}

export const getId = async (req, res) => {
  try {
    if (!validator.isMongoId(req.params.id)) throw new Error('ID')
    const result = await Product.findById(req.params.id).orFail(new Error('NOT FOUND'))
    res.status(StatusCodes.OK).json({
      success: true,
      message: '',
      result,
    })
  } catch (error) {
    console.log('controller product getId', error)
    if (error.name === 'CastError' || error.message === 'ID') {
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: 'productIdInvalid',
      })
    } else if (error.message === 'NOT FOUND') {
      res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: 'productNotFound',
      })
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'severError',
      })
    }
  }
}

export const edit = async (req, res) => {
  try {
    if (!validator.isMongoId(req.params.id)) throw new Error('ID')

    req.body.image = req.file?.path // 若沒換圖片沿用舊的圖片
    const result = await Product.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
      new: true,
    }).orFail(new Error('NOT FOUND'))

    res.status(StatusCodes.OK).json({
      success: true,
      message: '',
      result,
    })
  } catch (error) {
    console.log('controller product edit', error)
    if (error.name === 'CastError' || error.message === 'ID') {
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: 'productIdInvalid',
      })
    } else if (error.message === 'NOT FOUND') {
      res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: 'productNotFound',
      })
    } else if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: error.errors[key].message,
      })
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'severError',
      })
    }
  }
}
