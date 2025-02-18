<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-center">{{ $t('nav.larpword') }}</h1>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useAxios } from '@/composables/axios'

const { api } = useAxios()

const products = ref([])

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
