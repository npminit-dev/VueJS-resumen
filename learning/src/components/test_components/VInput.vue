<script setup>
  const { label } = defineProps(['label'])

  /* definimos model mediante la macro defineModel, podemos pasar un nombre para la prop en el primer argumento y un valor por defecto en el segundo (u otras opciones como 'required').
  Si tenemos un valor predeterminado para la propiedad defineModel y no proporcionamos ningún valor para esta propiedad desde el componente padre, 
  puede causar una desincronización entre los componentes padre e hijo. */
  const model = defineModel('surname', { default: '', required: true }) 

</script>

<template>
  <div>
    <div>Relacion bidireccional usando v-model</div>
    <label>
      {{ label }}
      <input v-model="model"> <!-- model quedara sincronizado con la ref que el componente padre ha pasado a v-model -->
    </label>
  </div>
</template>

<style scoped>

</style>