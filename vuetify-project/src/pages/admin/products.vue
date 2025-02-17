<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-center">{{ $t('nav.adminProducts') }}</h1>
      </v-col>
      <v-divider></v-divider>
      <v-col cols="12">
        <v-data-table :items="products" :headers="headers" :search="search">
          <!-- 只有一個的情況下，不用用[]包起來 -->
          <template #top>
            <v-toolbar>
              <v-btn prepend-icon="mdi-book-edit">{{ $t('adminProduct.new') }}</v-btn>
              <v-spacer></v-spacer>
              <v-text-field v-model="search" prepend-inner-icon="mdi-magnify" variant="underlined"></v-text-field>
            </v-toolbar>
          </template>
          <!-- # 代表 v-slot 的簡寫(插槽) -->
          <template #[`item.image`]="{ value }">
            <v-img :src="value" height="80"></v-img>
          </template>
          <template #[`item.sell`]="{ value }">
            <v-icon v-if="value" icon="mdi-check"></v-icon>
          </template>
          <template #[`item.createdAt`]="{ value }">
            {{ new Date(value).toLocaleDateString() }}
          </template>
          <template #[`item.updatedAt`]="{ value }">
            {{ new Date(value).toLocaleDateString() }}
          </template>
          <template #[`item.category`]="{ value }">
            {{ $t('productCategory.' + value) }}
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
  <v-dialog v-model="dialog.open" persistent max-width="600">
    <v-form>
      <v-card>
        <v-card-title>{{ $t(dialog.id ? 'adminProduct.edit' : 'adminProduct.new') }}</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="name.value.value"
            :label="$t('product.name')"
            :error-messages="name.errorMessage.value"
          ></v-text-field>
          <v-text-field
            v-model="price.value.value"
            :label="$t('product.price')"
            :error-messages="price.errorMessage.value"
            type="number"
            min="0"
          ></v-text-field>
          <v-select
            v-model="category.value.value"
            :error-messages="category.errorMessage.value"
            :items="categoryOptions"
            :label="$t('product.category')"
            item-title="text"
            item-value="value"
          ></v-select>
          <v-checkbox
            v-model="sell.value.value"
            :label="$t('product.onSell')"
            :error-messages="sell.errorMessage.value"
          ></v-checkbox>
          <v-textarea
            v-model="description.value.value"
            :label="$t('product.description')"
            :error-messages="description.errorMessage.value"
          ></v-textarea>
        </v-card-text>
        <v-card-actions></v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script setup>
import { useAxios } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'
import { useI18n } from 'vue-i18n'
import { computed, reactive, ref } from 'vue'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'

const { t } = useI18n()
const { apiAuth } = useAxios()
const createSnackbar = useSnackbar()

const products = reactive([])
const search = ref('')
const headers = computed(() => {
  return [
    { title: 'ID', key: '_id', sortable: true },
    { title: t('product.image'), key: 'image', sortable: false },
    { title: t('product.name'), key: 'name', sortable: true },
    { title: t('product.price'), key: 'price', sortable: true },
    { title: t('product.category'), key: 'category', sortable: true },
    { title: t('product.sell'), key: 'sell', sortable: true },
    { title: t('product.createdAt'), key: 'createdAt', sortable: true },
    { title: t('product.updatedAt'), key: 'updatedAt', sortable: true },
  ]
})

const getProducts = async () => {
  try {
    const { data } = await apiAuth.get('/product/all')
    products.push(...data.result)
  } catch (error) {
    console.log(error)
    createSnackbar({
      text: t('api.' + (error?.response?.data?.message || 'unknownError')),
      snackbarProps: {
        color: 'red',
      },
    })
  }
}
getProducts()

const dialog = ref({
  open: true,
  id: '',
})

const schema = yup.object({
  name: yup.string().required(t('api.productNameRequired')),
  price: yup
    .number()
    .typeError(t('api.productPriceRequired'))
    .required(t('api.productPriceRequired'))
    .min(0, t('api.productPriceTooSmall')),
  description: yup.string().required(t('api.productDescriptionRequired')),
  category: yup
    .string()
    .required(t('api.productCategoryRequired'))
    .oneOf(
      ['HardcoreReasoning', 'DeepEmotional', 'HorrorThriller', 'MechanicalCamp', 'HappyFunny', 'TruthRestoration'],
      t('api.productCategoryInvalid'),
    ),
  sell: yup.boolean().required(t('api.productSellRequired')),
})
const { handleSubmit, isSubmitting } = useForm({
  validationSchema: schema,
  initialValues: {
    name: '',
    price: 0,
    description: '',
    category: '',
    sell: false,
  },
})
const name = useField('name')
const price = useField('price')
const description = useField('description')
const category = useField('category')
const sell = useField('sell')
const categoryOptions = computed(() => [
  { text: t('productCategory.HardcoreReasoning'), value: 'HardcoreReasoning' },
  { text: t('productCategory.DeepEmotional'), value: 'DeepEmotional' },
  { text: t('productCategory.HorrorThriller'), value: 'HorrorThriller' },
  { text: t('productCategory.MechanicalCamp'), value: 'MechanicalCamp' },
  { text: t('productCategory.HappyFunny'), value: 'HappyFunny' },
  { text: t('productCategory.TruthRestoration'), value: 'TruthRestoration' },
])
</script>

<route lang="yaml">
meta:
  layout: admin
  login: true
  admin: true
  title: 'nav.adminProducts'
</route>
