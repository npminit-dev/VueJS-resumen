<script setup>
import { onMounted } from 'vue';

  const props = defineProps(['userid', 'id', 'title', 'staticValue', 'fontSize']) /* definimos props a recibir */
  const emmits = defineEmits(['increaseFont', 'decreaseFont']) /* definimos emitters */

</script>

<template>
  <article>
    <h3>{{ title }}</h3>
    <div :style="{fontSize: fontSize + 'px'}">
      <h4>id: {{ id }}</h4>
      <h4>userid: {{ userid }}</h4>
      <h5>{{ staticValue }}</h5>
    </div>
    <slot/>
    <button @click="$emit('decreaseFont')">decrease font</button> <!-- Al hacer click, se emite el evento personalizados del componente -->
    <button @click="$emit('increaseFont')">increase font</button> <!-- Al hacer click, se emite el evento personalizados del componente -->
  </article>
</template>

<style>
  article {
    display: flex;
    align-items: start;
    flex-direction: column;
    justify-content: center;
  }
</style>