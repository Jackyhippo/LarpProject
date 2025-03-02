<template>
  <v-card>
    <v-img :src="image" height="200" cover=""></v-img>
    <v-card-title>
      <router-link :to="'/product/' + _id">{{ name }}</router-link>
    </v-card-title>
    <v-card-subtitle>
      <v-icon>mdi-bookshelf</v-icon>
      {{ category }}
    </v-card-subtitle>
    <v-card-subtitle>
      <v-icon>mdi-currency-usd</v-icon>
      {{ price }}
    </v-card-subtitle>
    <v-card-subtitle>
      <v-icon>mdi-head-lightbulb</v-icon>
      {{ difficulty }}
    </v-card-subtitle>
    <v-card-subtitle>
      <v-icon>mdi-account-group</v-icon>
      {{ players }}
    </v-card-subtitle>
    <v-card-subtitle>
      <v-icon>mdi-map-marker</v-icon>
      {{ location }}
    </v-card-subtitle>
    <v-card-text>
      <span>
        {{ description && description.length > 20 ? description.substring(0, 20) + '...' : description }}
      </span>
    </v-card-text>
  </v-card>
</template>

<script setup>
defineProps({
  // eslint-disable-next-line vue/prop-name-casing
  _id: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    default: '',
  },
  price: {
    type: Number,
    default: 0,
  },
  image: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  category: {
    type: String,
    default: '',
  },
  difficulty: {
    type: String,
    default: '',
  },
  players: {
    type: Number,
    default: 0,
  },
  location: {
    type: String,
    default: '',
  },
})
</script>
