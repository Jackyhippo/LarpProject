<template>index</template>

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
  title: 'nav.home'
</route>
