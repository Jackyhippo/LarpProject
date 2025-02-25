<template>
  <v-container width="80%">
    <v-row justify="center">
      <v-col cols="12">
        <h1 class="text-center">{{ $t('nav.cart') }}{{ cart.value }}</h1>
      </v-col>
      <v-divider></v-divider>
      <v-col cols="6">
        <v-list bg-color="#098d5b" rounded="lg" lines="two">
          <template v-for="(item, i) in cart" :key="item._id">
            <v-list-item
              :title="item.product.name"
              :subtitle="formatDate(item.selectedDate)"
              active-class="bg-red"
              :active="!item.product.sell"
            >
              <template #prepend>
                <v-avatar rounded="lg" size="80">
                  <v-img :src="item.product.image"></v-img>
                </v-avatar>
              </template>
              <template #append>
                <div class="me-2">{{ item.product.price + '$' }}</div>
                <v-btn color="lime-accent-3">{{ $t('cart.checkout') }}</v-btn>
                <v-btn color="deep-orange-accent-3">{{ $t('cart.cancel') }}</v-btn>
              </template>
            </v-list-item>
            <v-divider v-if="i < cart.length - 1" color="#FFEB3B" thickness="2px"></v-divider>
          </template>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useAxios } from '@/composables/axios'

const { apiAuth } = useAxios()
const cart = ref([])

const formatDate = (dateString) => {
  if (!dateString) return '尚未設定時間'

  // 創建一個新的 Date 物件並加入 8 小時來轉換成台灣時間
  const date = new Date(dateString)
  const taiwanDate = new Date(date.getTime() + 8 * 60 * 60 * 1000)

  console.log('時間檢查:', {
    原始時間字串: dateString,
    解析後時間: date.toISOString(),
    台灣時間: taiwanDate.toISOString(),
  })

  return new Intl.DateTimeFormat('zh-TW', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZone: 'Asia/Taipei',
  }).format(taiwanDate)
}

const getCart = async () => {
  try {
    const { data } = await apiAuth.get('/user/cart')
    cart.value = data.result

    // 檢查購物車資料和時間
    console.log('購物車資料:', cart.value)
    cart.value.forEach((item) => {
      console.log('商品名稱:', item.product.name)
      console.log('原始時間:', item.selectedDate)
      console.log('格式化時間:', formatDate(item.selectedDate))
    })
  } catch (error) {
    console.log(error)
  }
}
getCart()
</script>
