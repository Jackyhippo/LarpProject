// Utilities
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import UserRole from '@/enums/UserRole'
import * as jdenticon from 'jdenticon'

export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref('')
    const account = ref('')
    const role = ref(UserRole.USER)
    const cart = ref(0)

    const isLoggedIn = computed(() => {
      return token.value.length > 0
    })

    const isAdmin = computed(() => {
      return role.value === UserRole.ADMIN
    })

    // const avatar = computed(() => {
    //   return `https://api.multiavatar.com/${account.value}.png`
    // })
    // 用 Jdenticon 生成圖像的 avatar
    const avatar = computed(() => {
      if (account.value) {
        // 生成 SVG 並轉換為 Data URL
        const svg = jdenticon.toSvg(account.value, 100)
        const svgDataUrl = 'data:image/svg+xml;base64,' + btoa(svg)
        return svgDataUrl
      }
      return ''
    })

    const login = (data) => {
      if (data.token) {
        token.value = data.token
      }
      account.value = data.account
      role.value = data.role
      cart.value = data.cart
    }

    const logout = () => {
      token.value = ''
      account.value = ''
      role.value = UserRole.USER
      cart.value = 0
    }

    return {
      token,
      account,
      role,
      cart,
      isLoggedIn,
      isAdmin,
      avatar,
      login,
      logout,
    }
  },
  {
    persist: {
      key: 'shop-user',
      pick: ['token'],
    },
  },
)
