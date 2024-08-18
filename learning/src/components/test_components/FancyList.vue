<script setup>
import { ref, watchEffect } from 'vue';

  const { limit } = defineProps({
    limit: {
      type: Number,
      default: 10
    }
  })

  const items = ref([])
  const page = ref(0)

  watchEffect(async () => {
    let response = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${page.value*limit}&select=title,price,category`)
    response = await response.json();
    items.value = response.products;
  })

</script>

<template>
  <ul :v-if="items.length > 0">
    <template v-for="itemdata of items">
      <slot name="item" v-bind="itemdata"></slot>
    </template>
  </ul>
  <div>
    <button @click="page--" :disabled="page <= 0">PREV</button>
    <button @click="page++">NEXT</button>
  </div>
</template>

<style scoped>

</style>