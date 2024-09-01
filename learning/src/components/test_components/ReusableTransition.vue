<script setup>
  import { ref, Transition } from 'vue';
  const props = defineProps({
    mode: {
      type: [String, null]
    }
  })

</script>

<template>
  <Transition name="reusable" :mode="!mode ? undefined : mode">
    <slot/>
  </Transition>
</template>

<style> /* NO USAR style scoped aqui!!! sino <slot></slot> no podra acceder a las clases declaradas aqui debajo */
  .reusable-enter-from {
    transform: rotate3d(-.5, 0, -.25, 180deg);
  }

  .reusable-enter-active {
    transition: all .4s ease-out;
  }

  .reusable-enter-to {
    transform: rotate3d(0, 0, 0, 180deg);
  }

  .reusable-leave-from {
    transform: rotate3d(0, 0, 0, 180deg);
  }

  .reusable-leave-active {
    transition: all .4s ease-in;
  }

  .reusable-leave-to {
    transform: rotate3d(-.5, 0, .25, 180deg);
  }
</style>