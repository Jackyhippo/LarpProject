/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import vuetify from './vuetify'
import pinia from '@/stores'
import router from '@/router'
import i18n from '@/i18n' // 手動新增部分
import VuetifyUseDialog from 'vuetify-use-dialog' // 手動新增部分
import VueFileAgentNext from '@boindil/vue-file-agent-next'
import '@boindil/vue-file-agent-next/dist/vue-file-agent-next.css'

export function registerPlugins(app) {
  app
    .use(i18n) // 手動新增部分，注意要在 vuetify 之前
    .use(vuetify)
    .use(VuetifyUseDialog, {
      snackbar: {
        showCloseButton: false,
        snackbarProps: {
          timeout: 2000,
        },
      },
    }) // 手動新增部分，注意要在 vuetify 之後
    .use(router)
    .use(pinia)
    .use(VueFileAgentNext)
}
