<template>
  <v-container width="80%">
    <v-row justify="center">
      <v-col cols="8">
        <h1 class="text-center">{{ $t('nav.cart') }}</h1>
      </v-col>
      <v-divider></v-divider>
      <v-col cols="12">
        {{ cart.value }}
        <v-list bg-color="#098d5b" rounded="lg" lines="two">
          <template v-for="(item, i) in cart" :key="item._id">
            <!-- {{ item }} + {{ i }} -->
            <v-list-item
              :title="item.product.name"
              :subtitle="formatDateFix(item.selectedDate) + '，' + item.selectedTime"
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
                <v-btn color="deep-orange-accent-3" @click="removeCart(item.product._id)">{{ $t('cart.remove') }}</v-btn>
                <v-btn color="lime-accent-3" :disabled="!item.product.sell" @click="checkout">{{ $t('cart.checkout') }}</v-btn>
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
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import { useSnackbar } from 'vuetify-use-dialog'
import { useI18n } from 'vue-i18n'

const { apiAuth } = useAxios()
const user = useUserStore()
const router = useRouter()
const createSnackbar = useSnackbar()
const { t } = useI18n()

const cart = ref([])

const getCart = async () => {
  try {
    const { data } = await apiAuth.get('/user/cart')
    cart.value = data.result
    console.log('購物車資料:', cart.value)
  } catch (error) {
    console.log(error)
  }
}
getCart()

// 全部商品一起結帳可以用下方的 function
// const canCheckout = computed(() => {
//   return cart.value.length > 0 && cart.value.every((item) => item.product.sell)
// })

const removeCart = async (productId) => {
  try {
    const { data } = await apiAuth.delete('/user/cart', {
      data: { productId },
    })
    cart.value = data.result
    console.log('商品已從購物車移除')
  } catch (error) {
    console.log(error)
  }
}

const checkout = async () => {
  try {
    await apiAuth.post('/order')
    user.cart = 0
    // 跳頁跳轉
    router.push('/orders')
  } catch (error) {
    console.log(error)
    createSnackbar({
      text: t('api.' + (error?.response?.data?.message || 'unknownError')),
      snackbarProps: {
        color: 'red',
      },
    })
  }
}

function formatDateFix(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })
}
</script>

<route lang="yaml">
meta:
  login: true
  title: 'nav.cart'
</route>
