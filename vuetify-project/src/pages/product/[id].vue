<template>
  <v-container width="70%">
    <v-row>
      <v-col cols="12" md="4">
        <v-img :src="product.image" height="450"></v-img>
      </v-col>
      <v-col cols="12" md="8">
        <h1 class="text-left">{{ product.name }}</h1>
        <p>{{ product.description }}</p>
        <h1 class="text-left">劇本資訊</h1>
        <div>
          <v-row class="h-100">
            <v-col cols="12" md="6">
              <div class="d-flex">
                <v-icon>mdi-bookshelf</v-icon>
                <p>{{ product.category }}</p>
              </div>
              <div class="d-flex">
                <v-icon>mdi-account-group</v-icon>
                <p>{{ product.players }}</p>
              </div>
              <div class="d-flex">
                <v-icon>mdi-head-lightbulb</v-icon>
                <p>{{ product.difficulty }}</p>
              </div>
              <div class="d-flex">
                <v-icon>mdi-hanger</v-icon>
                <p>{{ product.dressCode }}</p>
              </div>
            </v-col>
            <v-col cols="12" md="6" class="d-flex flex-column justify-center align-center">
              <v-form :disabled="isSubmitting" @submit.prevent="submit">
                <!-- <v-text-field
                  v-model="selectedDate"
                  label="預約日期"
                  type="date"
                  color="primary"
                  style="width: 100%"
                ></v-text-field> -->
                <v-btn type="submit" prepend-icon="mdi-calendar-range" size="x-large" :loading="isSubmitting">
                  {{ $t('product.reserve') }}
                </v-btn>
              </v-form>
            </v-col>
          </v-row>
        </div>
        <h1 class="text-left">店家資訊</h1>
        <h2 class="text-left">劇光燈</h2>
        <div class="d-flex">
          <v-icon>mdi-phone</v-icon>
          <p>02-2331-5796</p>
        </div>
        <div class="d-flex">
          <v-icon>mdi-map-marker</v-icon>
          <p>臺北市萬華區康定路 46 之 3 號</p>
        </div>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row>
      <v-col cols="12" md="6"> <h1 class="text-center">預約須知</h1></v-col>
      <v-col cols="12" md="6" class="d-flex flex-column align-center">
        <h1 class="text-center">立即預約</h1>
        <!-- 固定顯示的日期選擇器 -->
        <v-date-picker
          v-if="selectedDate !== null"
          v-model="selectedDate"
          width="100%"
          color="primary"
          show-adjacent-months
          title="請選擇日期"
          header="請選擇日期"
          :min="today"
        ></v-date-picker>
        <v-select v-model="selectedTime" :items="timeSlots" label="選擇時間" color="primary" style="width: 70%"></v-select>
      </v-col>
    </v-row>
  </v-container>
  <v-overlay :model-value="!product.sell" class="align-center justify-center" opacity="0.7" persistent>
    <h1 class="text-center" style="color: white">{{ $t('api.productNotOnSell') }}</h1>
  </v-overlay>
</template>

<script setup>
import { ref } from 'vue'
import { useAxios } from '@/composables/axios'
import { useRoute, useRouter } from 'vue-router'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '@/stores/user'
import { useSnackbar } from 'vuetify-use-dialog'

const { api, apiAuth } = useAxios()
// 取得路由資訊
const route = useRoute()
// 取得路由做跳轉
const router = useRouter()
const { t } = useI18n()
const user = useUserStore()
const createSnackbar = useSnackbar()
// （ISO 8601格式）
const today = new Date()
// const today = new Date().toISOString().split('T')[0]

const product = ref({
  _id: '',
  name: '',
  price: 0,
  description: '',
  image: '',
  sell: true,
  category: '',
  difficulty: '',
  players: '',
  location: '',
  dressCode: '',
})

const getProduct = async () => {
  try {
    const { data } = await api.get('/product/' + route.params.id)
    product.value = data.result
    document.title = product.value.name + ' | 本是同根生'
  } catch (error) {
    console.log(error)
    // 商品不存在時回首頁
    router.push('/')
  }
}
getProduct()

// 新增時間選項並加入對照表
const timeSlots = ['早上：08:00 ~ 12:00', '下午：01:00 ~ 05:00', '晚上：06:00 ~ 10:00']
const timeMap = {
  '早上：08:00 ~ 12:00': { hour: 8, minute: 0 },
  '下午：01:00 ~ 05:00': { hour: 13, minute: 0 },
  '晚上：06:00 ~ 10:00': { hour: 18, minute: 0 },
}

const schema = yup.object({
  selectedDate: yup.date().required('請選擇日期'),
  selectedTime: yup.string().required('請選擇時間'),
})
const { handleSubmit, isSubmitting } = useForm({
  validationSchema: schema,
  initialValues: {
    selectedTime: timeSlots[0], // 預設第一個時段
  },
})
const { value: selectedDate } = useField('selectedDate')
const { value: selectedTime } = useField('selectedTime')
// 選擇的預約日期
// const selectedDate = ref(null)

const submit = handleSubmit(async (values) => {
  console.log('預約資料:', values)
  console.log('selectedDate:', selectedDate.value)
  console.log('selectedTime:', selectedTime.value)
  if (!user.isLoggedIn) {
    router.push('/login')
    return
  }
  try {
    if (!selectedDate.value) throw new Error('invalidDate')
    // 轉換成 Date 物件
    const reservationDate = new Date(selectedDate.value)
    if (isNaN(reservationDate.getTime())) throw new Error('invalidDate')
    // 使用時間對照表設定時間
    const timeSettings = timeMap[selectedTime.value]
    if (!timeSettings) throw new Error('invalidTime')
    reservationDate.setHours(timeSettings.hour, timeSettings.minute, 0, 0)
    // 檢查是否為過去的時間
    if (reservationDate < new Date()) throw new Error('cannotSelectPastTime')

    const { data } = await apiAuth.patch('/user/cart', {
      product: product.value._id,
      selectedDate: reservationDate.toISOString(),
      selectedTime: selectedTime.value,
      // selectedDate: values.selectedDate,
    })
    user.cart = data.result
    createSnackbar({
      text: t('product.addCartSuccess'),
      snackbarProps: {
        color: 'green',
      },
    })
  } catch (error) {
    console.log(error)
    createSnackbar({
      text: t('api.' + (error?.response?.data?.message || 'unknownError')),
      snackbarProps: {
        color: 'red',
      },
    })
  }
})
</script>

<style scoped>
h1 {
  margin-top: 1rem;
  margin-bottom: 0.5rem;
}
p {
  font-size: 1.2rem;
  margin-bottom: 0.2rem;
}
.v-icon {
  margin-right: 0.5rem;
  color: #18c5a0;
}
</style>

<route lang="yaml">
meta:
  title: 'nav.product'
</route>
