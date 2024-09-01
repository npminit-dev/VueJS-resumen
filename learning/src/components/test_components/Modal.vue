<script setup>

const props = defineProps({
  open: {
    required: true,
    default: false
  }
})

const emits = defineEmits(['setOpen'])

</script>

<template>
  <div id="modal_shadow" v-if="props.open" @click.self="$emit('setOpen', false)">
    <dialog v-bind:open="props.open">
      <h3>This is a modal</h3>
      <button @click="$emit('setOpen', false)">CLOSE</button>
    </dialog>
  </div>
</template>

<style scoped>
  #modal_shadow {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    left: 0;
    top: 0;
    background-color: #333333d9;
  }

  #modal_shadow > dialog {
    position: relative;
    height: 225px;
    width: 150px;
    background-color: #f5f5f5;
    padding: 15px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-direction: column;
  }

  dialog > h3 {
    text-align: center
  }
</style>