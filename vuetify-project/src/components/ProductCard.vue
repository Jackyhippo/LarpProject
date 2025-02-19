<template>
  <v-card>
    <v-img :src="image" height="200" cover=""></v-img>
    <v-card-title>{{ name }}</v-card-title>
    <v-card-subtitle>{{ $t('productCategory.' + category) }}</v-card-subtitle>
    <v-card-subtitle>{{ price }}</v-card-subtitle>
    <v-card-subtitle>{{ difficulty }}</v-card-subtitle>
    <v-card-subtitle>{{ players }}</v-card-subtitle>
    <v-card-subtitle>{{ location }}</v-card-subtitle>
    <v-card-text>
      <span>
        {{ description && description.length > 60 ? description.substring(0, 60) + '...' : description }}
      </span>
    </v-card-text>
  </v-card>
</template>

<script setup>
defineProps({
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
