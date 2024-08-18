<script setup>
import { computed, ref } from 'vue';

const props = defineProps({
  id: {
    type: [Number, String],
    required: true
  },
  name: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  }
})

/* definimos emitters */
const events = defineEmits(['updateBook', 'deleteBook']) 
/* usamos las props para establecer un valor por defecto para el estado, ademas esto nos permite restablecerlo a su valor inicial facilmente */
const bookData = ref({ id: props.id, name: props.name, author: props.author }) 

/* creamos un valor computado que nos dice el estado bookData esta 'tocado', es decir, si el estado fue modificado con respecto al valor inicial */
const isTouched = computed(() => (
  Object.keys(bookData.value).some((key) => {
    if (bookData.value[key] !== props[key]) return true
    return false
  })
))

</script>

<template>
  <li>
    <article>
      <h3>Name:
        <input v-model="bookData.name"/> <!-- bindeamos propiedades -->
      </h3>
      <h4>Author: 
        <input v-model="bookData.author"/>
      </h4>
      <button @click="$emit('deleteBook', props.id)">DELETE</button> <!-- emitimos evento deleteBook, los valores que se pasaran al oyente vienen despues del nombre del evento que se emite -->
      <div v-if="isTouched">
        <button @click="$emit('updateBook', bookData.id, bookData)">SAVE CHANGES</button> <!-- aca estariamos pasando 2 argumentos al oyente -->
        <button @click="bookData = props">CANCEL</button> <!-- pasamos al estado inicial, reiniciando los inputs -->
      </div>
    </article>
  </li>
</template>

<style scoped>
article {
  padding: 10px;
  border: 1px solid #f5f5f5;
  margin: 5px
}

input {
  border: none;
  padding: 0;
  margin: 0;
  background: none;
  box-shadow: none;
  border-radius: 0;
  outline: none;
  color: inherit;
  font: inherit;
  cursor: inherit;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}

li {
  list-style-type: none;
  margin:0;
  padding:0;
}
</style>
