<script setup>

</script>

<template>
  <div>
    <nav>
      <slot name="navigation">home | shop | about</slot>
    </nav>
    <hr>
    <main>
      <slot>
        default content
      </slot> <!-- slots sin la propiedad 'name' tiene implicitamente como nombre 'default' -->
    </main>
    <hr>
      <template v-if="$slots.aside"> <!-- renderizado condicional de slots, si no se pasa el slot desde el padre, nada se renderizara aqui -->
        <slot name="aside"/>
        <hr>
      </template>
      <template v-if="$slots.asideleft"> <!-- lo mismo aqui -->
        <slot name="asideleft"/>
        <hr>
      </template>
    <footer>
      <slot name="footer">footer</slot>
    </footer>
  </div>
</template>

<style scoped>
</style>