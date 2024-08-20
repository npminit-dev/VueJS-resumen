<script setup>
import { getCurrentInstance, onMounted } from 'vue';

const instance = getCurrentInstance() /* esta funcion de la Composition API brinda informacion sobre la instancia actual */
onMounted(() => {
  console.log('lazy componente mounted, id: ' + instance.uid)
})
</script>

<template>
  <div>
    <h3>Lazy loaded component, id: {{ instance.uid }}</h3>
  </div>
</template>

<style scoped>
  
</style>