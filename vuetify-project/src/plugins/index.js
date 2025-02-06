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

export function registerPlugins (app) {
  app
    .use(i18n) // 手動新增部分
    .use(vuetify)
    .use(router)
    .use(pinia)
}
