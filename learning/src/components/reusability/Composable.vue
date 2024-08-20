<!-- un Composable es una funcion personalizada que nos permite extrae cierta lógica que sabemos
que se va a repetir en nuestro programa, y reutilizarla donde necesitemos 
(ver test_components/composables.js)
-->

<script setup>
  import { useFetchPost, useGlobalCounter, useMousePosition } from '../test_components/composables';
  import { ref } from 'vue';

  const { x, y } = useMousePosition() 

  const post = ref(1)
  const { status, data } = useFetchPost(post)

  const { count, decrement, increment } = useGlobalCounter();
  const { count: count2 } = useGlobalCounter();

</script>

<template>
  <div>
    <h3>Mouse Position Composable</h3>
    <div>Mouse x: {{ x }}</div>
    <div>Mouse y: {{ y }}</div>
  </div>

  <br>

  <div>
    <h3>Fetch post composable</h3>
    <h5>Post number {{ post }}</h5>
    <p v-if="status==='ready'">
      {{ JSON.stringify(data) }}
    </p>
    <h4 v-else-if="status==='loading'">Loading post</h4>
    <h4 v-else>Oops! something wen wrong! {{ data }}</h4>
    <button @click="post--" :disabled="post<=1">prev</button>
    <button @click="post++">next</button>
  </div>

  <br>

  <div>
    <h3>Global Counter (share status)</h3>
    <h4>Count 1: {{ count }}</h4>
    <h4>Count 2: {{ count2 }}</h4>
    <button @click="count--" :disabled="count<=0">prev</button>
    <button @click="count++">next</button>
  </div>
</template>

<style scoped>

</style>