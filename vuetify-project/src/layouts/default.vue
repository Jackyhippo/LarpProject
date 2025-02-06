<template>
  <v-app-bar>
    <v-container class="d-flex align-center">
      <v-btn to="/">購物網站</v-btn>
      <v-spacer />
    </v-container>
  </v-app-bar>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// 導覽列項目
const navs = computed(() => {
  return [
    { to: '/register',text: t(),icon: 'mdi-account-plus'},
    { to: '/login',text: t(),icon: 'mdi-account-arrow-left'},
  ]
})

</script>
