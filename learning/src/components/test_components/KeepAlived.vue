<script setup>

import { onActivated, onDeactivated, ref } from 'vue';
import VInput from './VInput.vue';

const value = ref('')

/* Hooks de ciclo de vida para componentes almacenados en cache
  - onActivated también se llama al montar y onDeactivated al desmontar.
  - Ambos enlaces funcionan no solo para el componente raíz almacenado en caché por <KeepAlive>, 
  sino también para los componentes descendientes en el árbol almacenado en caché. 
  */
onActivated(() => {
  console.log('component rendered for the first time, or re-generated from cache')
})

onDeactivated(() => {
  console.log('component removed from the DOM and saved to cache')
})

</script>

<template>
  <fieldset>
    <legend>children</legend>
    <VInput surname="nose"></VInput>
  </fieldset>
  <label>
    parent
    <input type="text" v-model="value">
  </label>
</template>

<style scoped>

</style>