<script setup>
import { onBeforeUnmount, onUnmounted } from 'vue';

  onUnmounted(() => {
    console.log('componente desmontado!')
  })

  onBeforeUnmount(() => {
    console.log('componente a punto de desmontarse!')
  })

  const throwsAnError = () => {
    throw new Error('Error lanzado artificialmente por el componente UnMountTest.vue')
  }
</script>

<template>
  <div>
    <br>
      hello world
      <button @click="throwsAnError">Throw Err</button>
    <br>
  </div>
</template>

<style scoped>
  div {
    display: flex;
    flex-direction: column;
    border: 1px solid #f5f5f5;
    padding: 10px;
  }
</style>