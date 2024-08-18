<script setup>
import { useAttrs } from 'vue';

  const attrs = useAttrs()
</script>

<template>
  <div id="component_wrapper">
    <div v-bind="attrs">
      hello world
    </div>
  </div>
</template>

<style scoped>

</style>