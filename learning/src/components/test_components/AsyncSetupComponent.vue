<script>
import { sleep } from '@/utils';

  export default {
    /* async setup vuelve a este componente automaticamente asincrono */
    async setup() {
      let posts = await fetch('https://jsonplaceholder.typicode.com/posts')
      await sleep(1000)
      posts = await posts.json()
      return {
        posts
      }
    }
  }
</script>

<template>
  <ul v-for="post in posts">
    <li>{{ post.title }}</li>
  </ul>
</template>

<style scoped>

</style>