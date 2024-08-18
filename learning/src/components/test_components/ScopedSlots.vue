<script setup>
import { ref } from 'vue';

  let count = ref(0)
  let increment = () => count.value++;

</script>

<template>
  <div>
    <slot :count="count" :increment="increment"/> <!-- pasamos las props como atributos normales a slot para que el padre las reciba -->
    <template v-if="$slots.named1">
      <slot name="named1" product-name="PlayStation 5" price="25.6 USD"/>
    </template>
  </div>
</template>

<style scoped>

</style>