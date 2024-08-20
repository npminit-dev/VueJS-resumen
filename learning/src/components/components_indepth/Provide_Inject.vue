<!--
Al tener un arbol de componentes con muchos niveles, 
como es el paso de props a componentes muy profundamente anidados?
si tenemos un componente principal (la 'raiz' del arbol) y queremos pasar props a un componente en el nivel 3,
tendremos que pasar primero la prop por un componente de nivel 2 (que ni necesita ni le interesa la prop) para llegar al nivel 3,
y con algun componente en niveles mas profundos esto seria aun peor.

Esto se llama prop-drilling y es algo con lo que no queremos lidiar.

Para solucionarlo podemos usar el componente padre como un proveedor de dependencias, y luego inyectar esas dependencias
dentro del componente que las necesite, asi no necesitamos pasar props a componentes solo para 'hacerlas llegas a donde deben'.
para eso usamos, en el proveedor, el metodo 'provide'
-->
<script setup>
  import { provide, ref, readonly } from 'vue';
  import Consumer from '../test_components/Consumer.vue';
  import { nameKey } from '@/utils';

  const count = ref(0)
  const increment = () => count.value++
  const decrement = () => count.value--

  /* el primer argumento es la clave del recurso que se provee (util para saber que dependencia inyectar) 
  y el segundo los datos que se proveen, podemos llamar a esta funcion muchas veces con diferentes claves */
  provide('count', { 
    count: readonly(count), 
    increment, decrement 
  }) 
  /* modificacion de recursos consumidos: */
  /* lo ideal seria que los estados de un componente solo fuesen modificados solo por el componente propietario */
  /* es preferible que si queremos que los consumidores puedan modificar los datos, lo hagan mediante funciones declaradas aqui, 
  la funcion de Vue readonly es especialmente util para asegurarnos de que count solo se modifica mediante las funciones modificadoras 'increment' y 'decrement' */

  /* Keys con Symbol(): cuando trabajamos con otros desarrolladores y el proyecto es grande, quizas queramos asegurarnos
  de que los nombres que las claves no colisionen con otras en el proyecto, para eso podemos usar Symbol() que devuelve
  un valor primitivo único e inmutable, ideal para generar claves (es conveniente crear estas claves en un archivo aparte e importarlas donde quieran usarse) */
  const name = ref('Robert J. Lee')
  provide(nameKey, readonly(name))
</script>
  
<template>
  <!-- es casualidad que el consumidor sea hijo directo del proveedor, lo hago para no crear 3 componentes de prueba
  solo para demostrar que cualquier hijo del proveedor (directo o indirecto) puede acceder a los valores proporcionados -->
  <Consumer v-slot:count_viewer="{ count }">
    COUNT: {{ count }} <br>
  </Consumer>
</template>

<style scoped>
div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>