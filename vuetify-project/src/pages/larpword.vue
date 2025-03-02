<template>
  <v-container width="80%">
    <!-- <h1 class="text-center">{{ $t('nav.larpword') }}</h1> -->
    <v-row>
      <v-col cols="12">
        <v-text-field v-model="search" prepend-inner-icon="mdi-magnify"></v-text-field>
      </v-col>
      <!-- 縣市篩選 -->
      <v-col cols="12" md="3">
        <v-select v-model="selectedCity" prepend-inner-icon="mdi-map" :items="cities" label="選擇縣市" clearable></v-select>
      </v-col>
      <!-- 類型篩選 -->
      <v-col cols="12" md="3">
        <v-select
          v-model="selectedCategory"
          prepend-inner-icon="mdi-bookshelf"
          :items="categories"
          label="選擇類型"
          clearable
        ></v-select>
      </v-col>
      <!-- 難度篩選 -->
      <v-col cols="12" md="3">
        <v-select
          v-model="selectedDifficulty"
          prepend-inner-icon="mdi-head-lightbulb"
          :items="difficulties"
          label="選擇難度"
          clearable
        ></v-select>
      </v-col>
      <!-- 人數篩選 -->
      <v-col cols="12" md="3">
        <v-select
          v-model="selectedPlayers"
          prepend-inner-icon="mdi-account-group"
          :items="players"
          label="選擇人數"
          clearable
        ></v-select>
      </v-col>
      <v-col v-for="product of filteredProducts" :key="product._id" cols="12" md="6" lg="4">
        <product-card v-bind="product"></product-card>
      </v-col>
      <v-col cols="12">
        <v-pagination v-model="currentPage" :length="totalPage" color="success"></v-pagination>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useAxios } from '@/composables/axios'
import ProductCard from '@/components/ProductCard.vue'

const { api } = useAxios()

const ITEMS_PER_PAGE = 9
const currentPage = ref(1)
const products = ref([])
const search = ref('')

const selectedCity = ref(null)
const selectedCategory = ref(null)
const selectedDifficulty = ref(null)
const selectedPlayers = ref(null)

const cities = ['台北市', '新北市', '桃園市', '新竹縣/市', '台中市', '台南市', '高雄市']
const categories = ['硬核推理', '情感沈浸', '恐怖驚悚', '機制陣營', '歡樂搞笑', '真相還原']
const difficulties = ['新手入門', '新手進階', '中等難度', '中等偏難', '高手挑戰']
const players = ['3人', '4人', '5人', '6人', '7人', '8人', '9人', '10人以上']

const totalPage = computed(() => Math.ceil(products.value.length / ITEMS_PER_PAGE))

const filteredProducts = computed(() => {
  return (
    products.value
      .filter(
        (product) =>
          (!selectedCity.value || product.location === selectedCity.value) &&
          (!selectedCategory.value || product.category === selectedCategory.value) &&
          (!selectedDifficulty.value || product.difficulty === selectedDifficulty.value) &&
          (!selectedPlayers.value || product.players === selectedPlayers.value) &&
          product.name.toLowerCase().includes(search.value.toLowerCase()),
      )
      // 一頁 2 筆
      // 第 1 頁 = 0 ~ 1
      // 第 2 頁 = 2 ~ 3
      // .slice(開始索引, 結束索引)
      // 不包含結束索引
      .slice((currentPage.value - 1) * ITEMS_PER_PAGE, currentPage.value * ITEMS_PER_PAGE)
  )
})

const getProducts = async () => {
  try {
    const { data } = await api.get('/product')
    products.value.push(...data.result)
  } catch (error) {
    console.log(error)
  }
}
getProducts()
</script>

<route lang="yaml">
meta:
  login: false
  admin: false
  title: 'nav.larpword'
</route>
