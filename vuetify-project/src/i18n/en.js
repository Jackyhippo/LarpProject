import { en } from 'vuetify/locale'

export default {
  $vuetify: en,
  nav: {
    register: 'Register',
    login: 'login',
    cart: 'Shopping cart',
    orders: 'order',
    admin: 'Management',
    logout: 'Logout',
    adminProfile: 'Personal information',
    adminProducts: 'Script Management',
    adminOrders: 'Order Management',
    home: 'Home',
    product: 'script',
    switch: 'switch',
    larp: 'hot script',
    larplocation: 'Venues in various places',
    larpword: 'script world',
  },
  register: {
    submit: 'Create account',
    success: 'Registration successful',
  },
  login: {
    submit: 'Login',
    success: 'Login successful',
  },
  logout: {
    success: 'Logout successful',
  },
  user: {
    account: 'account',
    email: 'Mailbox',
    password: 'password',
    passwordConfirm: 'Password confirmation',
  },
  cart: {
    checkout: 'checkout',
    remove: 'remove',
  },
  order: {
    createdAt: 'order time',
    cart: 'goods',
    price: 'order amount',
    account: 'account',
  },
  admin: {
    index: 'Select management project',
  },
  adminProduct: {
    new: 'Add script',
    edit: 'Edit script',
    cancel: 'cancel',
    submit: 'confirm',
    newSuccess: 'Script added successfully',
    editSuccess: 'Script editing successful',
  },
  product: {
    image: 'stills',
    name: 'script name',
    description: 'Description',
    price: 'price',
    category: 'category',
    difficulty: 'difficulty',
    players: 'Number of people',
    location: 'location',
    sell: 'upload and remove shelves',
    createdAt: 'Add time',
    updatedAt: 'update time',
    onSell: 'On the shelves',
    notOnSell: 'Remove',
    dressCode: 'dressing requirement',
    reserve: 'reservation',
    addCartSuccess: 'Reservation successful',
  },
  productCategory: {
    HardcoreReasoning: 'hardcore reasoning',
    DeepEmotional: 'Emotional immersion',
    HorrorThriller: 'Horror Thriller',
    MechanicalCamp: 'Mechanical Camp',
    HappyFunny: 'Happy Funny',
    TruthRestoration: 'Truth Restoration',
  },
  fileAgent: {
    helpText: 'Click or drag the file here',
    errorType: 'File type error',
    errorSize: 'File size exceeds limit',
  },
  api: {
    userAccountRequired: 'User account required',
    userAccountTooShort: 'User account too short',
    userAccountTooLong: 'User account too long',
    userAccountInvalid: 'User account format does not match',
    userAccountDuplicate: 'Duplicate user account',

    userPasswordRequired: 'User password required',
    passwordConfirmRequired: 'Password confirmation required',
    userPasswordTooShort: 'User password is too short',
    userPasswordTooLong: 'User password is too long',
    userPasswordIncorrect: 'Password incorrect',
    userPasswordNotMatch: 'Password does not match',

    userEmailRequired: 'User email required',
    userEmailInvalid: "The user's mailbox format does not match",

    userCartProductRequired: 'Shopping cart script required',
    userCartSelectedDateRequired: 'Script reservation date required',
    userCartSelectedDateInvalid: 'Script reservation date format is wrong',

    userNotFound: 'No user found',
    userPermissionDenied: 'Insufficient user permission',
    userTokenInvalid: 'User verification error',
    userTokenExpired: 'Login expired',

    productIdInvalid: 'Wrong script ID',
    productNameRequired: 'Script name required',
    productPriceRequired: 'Script price required',
    productPriceTooSmall: 'Script price does not match',
    productImageRequired: 'Script image required',
    productDescriptionRequired: 'Script description required',
    productCategoryRequired: 'Script category required',
    productCategoryInvalid: 'The script category does not match',
    productSellRequired: 'Required for script uploading and unlisting',
    productDifficultyRequired: 'Difficulty required',
    productDifficultyInvalid: 'Difficulty does not match',
    productPlayersRequired: 'The number of players is required',
    productPlayersInvalid: 'The number of players does not match',
    productLocationRequired: 'Location required',
    productLocationInvalid: 'Location does not match',
    productDressCodeRequired: 'Dressing requirements required',
    productDressCodeInvalid: 'The dressing requirements do not meet',

    orderCartProductRequired: 'Order script required',
    orderCartSelectedDateRequired: 'Script reservation date required',
    orderCartSelectedDateInvalid: 'Script reservation date format is wrong',
    orderCartSelectedTimeRequired: 'The script reservation time is required',
    orderCartSelectedTimeInvalid: 'Script reservation time format error',
    orderUserRequired: 'Order user required',
    orderCartRequired: 'Order shopping cart required',
    orderCartEmpty: 'Order shopping cart is empty',

    requestFormatError: 'Request format error',
    productNotOnSell: 'The script is not on the shelves',
    productNotFound: 'No such script found',
    serverError: 'Server error',
    unknownError: 'Unknown error',
    uploadFailed: 'Upload failed',
    invalidDate: 'Date format error',
    pastDateNotAllowed: 'Cannot reserve due to expiration date',
    dateAlreadyBooked: '🥰Already booked🥰',
    dateBookedByOthers: '😭has been booked😭',
  },
}
