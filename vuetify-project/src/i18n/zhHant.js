import { zhHant } from 'vuetify/locale'

export default {
  $vuetify: zhHant,
  nav: {
    register: '註冊',
    login: '登入',
    cart: '購物車',
    orders: '訂單',
    admin: '管理',
    logout: '登出',
    adminProducts: '劇本管理',
    adminOrders: '訂單管理',
    home: '首頁',
    switch: '切換',
    larp: '熱門劇本',
    larplocation: '各地場館',
    larpword: '劇本天地',
  },
  register: {
    submit: '建立帳號',
    success: '註冊成功',
  },
  login: {
    submit: '登入',
    success: '登入成功',
  },
  logout: {
    success: '登出成功',
  },
  user: {
    account: '帳號',
    email: '信箱',
    password: '密碼',
    passwordConfirm: '密碼確認',
  },
  admin: {
    index: '選擇管理項目',
  },
  adminProduct: {
    new: '新增劇本',
    edit: '編輯劇本',
    cancel: '取消',
    submit: '確認',
    newSuccess: '劇本新增成功',
    editSuccess: '劇本編輯成功',
  },
  product: {
    image: '劇照',
    name: '劇本名稱',
    description: '說明',
    price: '價格',
    category: '分類',
    difficulty: '難度',
    players: '人數',
    location: '地點',
    sell: '上下架',
    createdAt: '新增時間',
    updatedAt: '更新時間',
    onSell: '上架',
    notOnSell: '下架',
  },
  productCategory: {
    HardcoreReasoning: '硬核推理',
    DeepEmotional: '情感沈浸',
    HorrorThriller: '恐怖驚悚',
    MechanicalCamp: '機制陣營',
    HappyFunny: '歡樂搞笑',
    TruthRestoration: '真相還原',
  },
  fileAgent: {
    helpText: '點擊或拖曳檔案至此',
    errorType: '檔案類型錯誤',
    errorSize: '檔案大小超過限制',
  },
  api: {
    userAccountRequired: '使用者帳號必填',
    userAccountTooShort: '使用者帳號太短',
    userAccountTooLong: '使用者帳號太長',
    userAccountInvalid: '使用者帳號格式不符',
    userAccountDuplicate: '使用者帳號重複',

    userPasswordRequired: '使用者密碼必填',
    passwordConfirmRequired: '密碼確認必填',
    userPasswordTooShort: '使用者密碼太短',
    userPasswordTooLong: '使用者密碼太長',
    userPasswordIncorrect: '密碼錯誤',
    userPasswordNotMatch: '密碼不符',

    userEmailRequired: '使用者信箱必填',
    userEmailInvalid: '使用者信箱格式不符',

    userCartProductRequired: '購物車劇本必填',
    userCartQuantityRequired: '購物車數量必填',
    userCartQuantityTooSmall: '購物車數量不符',

    userNotFound: '查無使用者',
    userPermissionDenied: '使用者權限不足',
    userTokenInvalid: '使用者驗證錯誤',
    userTokenExpired: '登入過期',

    productIdInvalid: '劇本 ID 錯誤',
    productNameRequired: '劇本名稱必填',
    productPriceRequired: '劇本價格必填',
    productPriceTooSmall: '劇本價格不符',
    productImageRequired: '劇本圖片必填',
    productDescriptionRequired: '劇本說明必填',
    productCategoryRequired: '劇本分類必填',
    productCategoryInvalid: '劇本分類不符',
    productSellRequired: '劇本上下架必填',
    productDifficultyRequired: '難度必填',
    productDifficultyInvalid: '難度不符',
    productPlayersRequired: '玩家人數必填',
    productPlayersInvalid: '玩家人數不符',
    productLocationRequired: '地點必填',
    productLocationInvalid: '地點不符',

    requestFormatError: '請求格式錯誤',
    productNotOnSell: '劇本未上架',
    productNotFound: '查無此劇本',
    severError: '伺服器錯誤',
    unknownError: '未知錯誤',
    uploadFailed: '上傳失敗',
  },
}
