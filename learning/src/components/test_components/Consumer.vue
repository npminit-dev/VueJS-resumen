
<script setup>
import { nameKey } from '@/utils';
import { inject, ref } from 'vue';
const { count, increment, decrement } = inject( /* inyectamos la dependencia, la desestructuramos */
  'count', /* el primer argumento es la clave del recurso */
  { 
    count: ref(-100), 
    increment: () => null, 
    decrement: () => null 
  } /* en el segundo argumento podemos brindar un valor por defecto */
)
const name = inject(nameKey) /* accediendo a recurso mediante key Symbol() */
const greetings = inject('greetings') /* accediendo recurso global proporcionado a nivel de aplicacion por main.js */

const mutateCount = () => count.value++ /* prueba para asegurar que el estado este prohibido de mutarse directamente */
</script>

<template>
  <div>
    <slot name="count_viewer" :count="count">count not provided</slot>
    <button @click="decrement">minus</button>
    <button @click="increment">plus</button>
    <button @click="mutateCount">mutate</button>
  </div>
  <div>name: {{ name }}</div>
  <div>main.js says: {{ greetings }}</div>
</template>

<style scoped>

</style>