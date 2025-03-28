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
      <v-menu class="text-center" width="200px" open-on-hover>
        <template #activator="{ props }">
          <v-btn v-bind="props" icon>
            <v-avatar size="40">
              <v-img v-if="user.avatar" :src="user.avatar" alt="User Avatar"></v-img>
              <v-icon v-else size="40">mdi-account</v-icon>
            </v-avatar>
          </v-btn>
        </template>
        <v-list>
          <template v-for="nav of navs">
            <v-list-item v-if="nav.show" :key="nav.to" :to="nav.to" :prepend-icon="nav.icon">
              {{ nav.text }}
              <v-badge v-if="nav.to === '/cart'" :content="user.cart?.length || 0" floating color="red"></v-badge>
            </v-list-item>
          </template>
          <v-list-item v-if="user.isLoggedIn" @click="logout">
            <template #prepend>
              <v-icon>mdi-account-arrow-right</v-icon>
            </template>
            {{ $t('nav.logout') }}
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item @click="toggleTheme">
            <template #prepend>
              <v-icon>mdi-theme-light-dark</v-icon>
            </template>
            {{ $t('nav.switch') }}
          </v-list-item>
          <v-list-item>
            <v-menu location="end" open-on-hover>
              <template #activator="{ props }">
                <v-list-item v-bind="props" prepend-icon="mdi-translate">
                  {{ '翻譯' }}
                </v-list-item>
              </template>
              <v-list>
                <v-list-item v-for="lang in langs" :key="lang.value" @click="$i18n.locale = lang.value">
                  {{ lang.text }}
                </v-list-item>
              </v-list>
            </v-menu>
          </v-list-item>
        </v-list>
      </v-menu>

      <!-- <template v-for="nav of navs" :key="nav.to">
        <v-btn v-if="nav.show" :to="nav.to" :prepend-icon="nav.icon">
          {{ nav.text }}
          <v-badge v-if="nav.to === '/cart'" :content="user.cart" floating color="red"></v-badge>
        </v-btn>
      </template>
      <v-btn prepend-icon="mdi-theme-light-dark" @click="toggleTheme">
        {{ $t('nav.switch') }}
      </v-btn>
      <v-btn v-if="user.isLoggedIn" prepend-icon="mdi-account-arrow-right" @click="logout">
        {{ $t('nav.logout') }}
      </v-btn>
      <v-menu>
        <template #activator="{ props }">
          <v-btn v-bind="props">
            <v-icon icon="mdi-translate"></v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="lang in langs" :key="lang.value" @click="$i18n.locale = lang.value">
            {{ lang.text }}
          </v-list-item>
        </v-list>
      </v-menu> -->
    </v-container>
  </v-app-bar>
  <v-main class="content-area">
    <router-view></router-view>
  </v-main>
  <Footer />
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '@/stores/user'
import { useAxios } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'
import { useRouter } from 'vue-router'
import { useTheme } from 'vuetify'
import Footer from './footer.vue'

const { t } = useI18n()
const user = useUserStore()
const { apiAuth } = useAxios()
const createSnackbar = useSnackbar()
const router = useRouter()
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

const langs = [
  { text: '繁體中文', value: 'zhHant' },
  { text: 'English', value: 'en' },
]

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

// 切換主題函式
function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}
</script>

<style scoped>
/* 確保 v-main 至少撐滿畫面高度，這樣 Footer 內容少時會貼底 */
.content-area {
  min-height: calc(100vh - 64px); /* 64px 是 Navbar 高度，可根據實際需求調整 */
}
</style>
