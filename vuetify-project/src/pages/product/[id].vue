<template>
  <v-container width="70%">
    <v-row>
      <v-col cols="12">
        <h1 class="text-center">{{ product.name }}</h1>
      </v-col>
      <v-divider></v-divider>
      <v-col cols="12" md="4">
        <v-img :src="product.image" height="450"></v-img>
      </v-col>
      <v-col cols="12" md="8">
        <p>{{ $t('productCategory.' + product.category) }}</p>
        <p>{{ product.price }}</p>
        <p>{{ product.difficulty }}</p>
        <p>{{ product.players }}</p>
        <p>{{ product.location }}</p>
        <p>{{ product.description }}</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useAxios } from '@/composables/axios'
import { useRoute, useRouter } from 'vue-router'

const { api } = useAxios()
// 取得路由資訊
const route = useRoute()
// 取得路由做跳轉
const router = useRouter()

const product = ref({
  _id: '',
  name: '',
  price: 0,
  description: '',
  image: '',
  sell: true,
  category: '',
  difficulty: '',
  players: null,
  location: '',
})

const getProduct = async () => {
  try {
    const { data } = await api.get('/product/' + route.params.id)
    product.value = data.result
  } catch (error) {
    console.log(error)
  }
}
getProduct()
</script>
