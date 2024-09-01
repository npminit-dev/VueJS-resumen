<script setup>
import { ref } from 'vue';
import { sleep } from '@/utils';
let user = ref(null)
/* Estos awaits de nivel superior vuelven automaticamente al componente asincrono */
user = await fetch('https://jsonplaceholder.typicode.com/users/1')
await sleep(2000)
user = await user.json()
</script>

<template>
  <article>
    <h2>Name: <b>{{ user.name }}</b></h2>
    <h3>Username: <b>{{ user.surname }}</b></h3>
    <h3>Email <b>{{ user.email }}</b></h3>
  </article>
</template>

<style scoped>

</style>