<script setup>
  import { ref } from 'vue'
  const page = ref(1)
</script>

<template>
  <!-- v-if v-else-if y v-else permiten renderizar condicionalmente, y funcionan igual que los if/else de javascript
  estas directivas destruyen efectivamente los componentes, los desmontan del arbol del DOM -->
  <div>
    <div>
      <h1 v-if="page === 1">PAGE 1</h1>
      <template v-else-if="page === 2"> <!-- template puede usarse como un fragment de react, es un contenedor que no es renderizado en el DOM -->
        <h1>PAGE 2</h1>
        <sub>Page with subtitlew</sub>
      </template>
      <h1 v-else-if="page === 3">PAGE 3</h1>
      <h1 v-else="page === 4">PAGE 4</h1>
    </div>
    <div>
      <button v-on:click="page--" :disabled="page===1">prev</button>
      <button v-on:click="page++" :disabled="page===4">next</button>
    </div>
  </div>
  <!-- v-show, por el contrario, se basa en la propiedad 'display' de CSS, por lo que en realidad el componente se mantiene en el arbol del dom --> 
  <h3 v-show="page===3">show on page 3</h3>

  <!-- 
  v-if es una representación condicional "real" porque garantiza que los detectores de eventos y los componentes secundarios dentro del bloque condicional se destruyan y vuelvan a crear adecuadamente durante los cambios.
  v-if también es diferido: si la condición es falsa en el procesamiento inicial, no hará nada; el bloque condicional no se procesará hasta que la condición se vuelva verdadera por primera vez.
  En comparación, v-show es mucho más simple: el elemento siempre se representa independientemente de la condición inicial, con alternancia basada en CSS.
  En términos generales, v-if tiene costos de alternancia más altos, mientras que v-show tiene costos de renderizado iniciales más altos. Por lo tanto, prefiera v-show si necesita alternar algo con mucha frecuencia y prefiera v-if si es poco probable que la condición cambie en tiempo de ejecución.
  -->

</template>

<style scoped>
  .centered {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>