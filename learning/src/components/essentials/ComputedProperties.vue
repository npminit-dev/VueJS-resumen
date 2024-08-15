<!-- Propiedades computadas -->

<!-- procesar valores basados en estados dentro de los templates es normal en expresiones simples, 
 pero cuando son complejas es demasiado verboso y dificulta la legibilidad -->
<!-- 'computed' sirve para calcular dichos valores fuera del template del componente mientras se mantiene reactivo -->

<script setup>
import { ref, computed } from 'vue'
const author = ref({
  author: 'Graham H Bell',
  books: [
    'Kill a ripper',
    'Momma Kim',
    'Tucker Budzyn'
  ]
})

const hasBooks = computed(() => {
  return author.value.books.length > 0 /* el valor computado reacciona a los cambios del objeto 'author' */
})
/* 
Estos valores computados deben ser puros, es decir no deben modificar nada externo a ellas, ni hacer llamadas asincronas, ni modificar el dom.
Una diferencia clave con esto y definir una funcion normal que devuelve la misma expresion, es que computed no recalculara el resultado a menos que 'author' cambie,
por el contrario la funcion normal se recalcularia en cada re-render del componente, independientemente de si 'author' ha cambiado.
*/

/* Este es un caso raro donde un valor computado necesita modificar su dependencia mediante un set */
const authorNameWithSet = computed({
  get() {
    return `Author name: ${author.value.author}`
  },
  set(value) {
    author.value.author = `${value}`
  }
})

</script>

<template>
  <div>
    <div>
      <h1>Author: {{ author.author }}</h1>
      <h2 v-if="hasBooks">The author has books</h2>
      <h2 v-if="!hasBooks">The author hasn't books</h2>
      <h2></h2>
    </div>
    <br>
    <hr>
    <br>
    <div>
      <form v-on:submit.prevent="undefined">
        <div>
          {{ authorNameWithSet.valueOf() }}
        </div>
        <label>
          <input type="text" v-on:input="(e) => authorNameWithSet = e.target.value">
        </label>
      </form>
    </div>
  </div>
</template>

<style scoped>

</style>