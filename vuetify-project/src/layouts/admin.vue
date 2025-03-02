<template>
  <v-navigation-drawer permanent>
    <v-list>
      <v-list-item :prepend-avatar="user.avatar" :title="user.account"></v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-list>
      <v-list-item v-for="nav in navs" :key="nav.to" :prepend-icon="nav.icon" :title="nav.text" :to="nav.to"></v-list-item>
      <v-list-item @click="toggleTheme">
        <template #prepend>
          <v-icon>mdi-theme-light-dark</v-icon>
        </template>
        {{ $t('nav.switch') }}
      </v-list-item>
      <!-- <v-list-item @click="logout">
        <template #prepend>
          <v-icon>mdi-account-arrow-right</v-icon>
        </template>
        {{ $t('nav.logout') }}
      </v-list-item> -->
    </v-list>
    <template #append>
      <div class="pa-2">
        <v-btn prepend-icon="mdi-account-arrow-right" block color="lime-lighten-1" @click="logout">
          {{ $t('nav.logout') }}
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
  <v-main>
    <router-view></router-view>
  </v-main>
</template>

<script setup>
import { computed } from 'vue'
import { useUserStore } from '@/stores/user'
import { useI18n } from 'vue-i18n'
import { useTheme } from 'vuetify'
import { useAxios } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'
import { useRouter } from 'vue-router'

const user = useUserStore()
const { t } = useI18n()
const theme = useTheme()
const { apiAuth } = useAxios()
const createSnackbar = useSnackbar()
const router = useRouter()

const navs = computed(() => {
  return [
    { to: '/admin/profile', text: t('nav.adminProfile'), icon: 'mdi-account-circle' },
    { to: '/admin/products', text: t('nav.adminProducts'), icon: 'mdi-shopping' },
    { to: '/admin/orders', text: t('nav.adminOrders'), icon: 'mdi-format-list-bulleted' },
    { to: '/', text: t('nav.home'), icon: 'mdi-home' },
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
  router.push('/')
}

function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}
</script>
