<template>
  <v-app-bar>
    <v-container class="d-flex align-center">
      <v-btn to="/" :active="false">本是同根生</v-btn>
      <v-btn prepend-icon="mdi-book-heart" to="/larp">
        {{ $t('nav.larp') }}
      </v-btn>
      <v-btn prepend-icon="mdi-book-marker" to="/larplocation">
        {{ $t('nav.larplocation') }}
      </v-btn>
      <v-btn prepend-icon="mdi-book-search" to="/larpword">
        {{ $t('nav.larpword') }}
      </v-btn>
      <v-spacer />
      <template v-for="nav of navs" :key="nav.to">
        <v-btn v-if="nav.show" :to="nav.to" :prepend-icon="nav.icon">{{ nav.text }}</v-btn>
      </template>
      <v-btn prepend-icon="mdi-theme-light-dark" @click="toggleTheme">
        {{ $t('nav.switch') }}
      </v-btn>
      <v-btn v-if="user.isLoggedIn" prepend-icon="mdi-account-arrow-right" @click="logout">
        {{ $t('nav.logout') }}
      </v-btn>
    </v-container>
  </v-app-bar>
  <v-main>
    <router-view></router-view>
  </v-main>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '@/stores/user'
import { useAxios } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'
import { useTheme } from 'vuetify'

const { t } = useI18n()
const user = useUserStore()
const { apiAuth } = useAxios()
const createSnackbar = useSnackbar()
const theme = useTheme()

// 導覽列項目
const navs = computed(() => {
  return [
    { to: '/register', text: t('nav.register'), icon: 'mdi-account-plus', show: !user.isLoggedIn },
    { to: '/login', text: t('nav.login'), icon: 'mdi-account-arrow-left', show: !user.isLoggedIn },
    { to: '/cart', text: t('nav.cart'), icon: 'mdi-book', show: user.isLoggedIn },
    { to: '/orders', text: t('nav.orders'), icon: 'mdi-format-list-bulleted', show: user.isLoggedIn },
    { to: '/admin', text: t('nav.admin'), icon: 'mdi-cog', show: user.isLoggedIn && user.isAdmin },
  ]
})

// 登出函式，向後端發出登出請求
const logout = async () => {
  try {
    await apiAuth.delete('/user/logout')
  } catch (error) {
    console.log(error)
  }
  user.logout()
  createSnackbar({
    text: t('logout.success'),
    snackbarProps: {
      color: 'green',
    },
  })
}

// 切換主題函式
function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}
</script>
