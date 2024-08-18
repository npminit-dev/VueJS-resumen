<script setup>
  const { label, value } = defineProps(['label', 'value'])
  defineEmits(['changeValue'])
</script>

<template>
  <div>
    <div>Relacion bidireccional usando props y eventos</div>
    <label>
    {{ label }}
      <input :value="value" @input="(e) => $emit('changeValue', e.target.value)" />
    </label>
  </div>
</template>

<style scope>

</style>