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
                <p>{{ $t('productCategory.' + product.category) }}</p>
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
              <v-form>
                <v-btn type="submit" prepend-icon="mdi-calendar-range" size="x-large">{{ $t('product.reserve') }}</v-btn>
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
  players: '',
  location: '',
  dressCode: '',
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

<style>
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
