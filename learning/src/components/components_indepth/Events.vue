<script setup>
import { ref, computed } from 'vue'
import { v4 as uuid } from 'uuid';
import Book from '../test_components/Book.vue';

const books = ref([
  {
    id: uuid(),
    name: 'El silencio de los corderos',
    author: 'J.P Morgan'
  },
  {
    id: uuid(),
    name: 'Crealo o no',
    author: 'Michael Nicolson'
  },
  {
    id: uuid(),
    name: 'El manager',
    author: 'Francis Wright'
  },
  {
    id: uuid(),
    name: 'Al filo de la cordura',
    author: 'Antoine Lemaire'
  }
])

const newBook = ref({ name: '', author: '' }) /* estado que controla el formulario para agregar libros */
const isValid = computed(() => {
  return newBook.value.name !== '' && newBook.value.author !== ''
}) /* valor computado que valida el estado del formulario para deshabilitar el boton de submit o no */

/* funciones para el CRUD */
const handleAdd = (book) => books.value.push({...book, id: uuid()})
const handleUpdate = (id, bookdata) => {
  console.log('updated')
  let bookIdx = books.value.findIndex(book => book.id === id)
  books.value[bookIdx] = {...bookdata}
}
const handleDel = (id) => books.value = books.value.filter(book => book.id !== id)

</script>

<template>
  <div>

    <!-- Emision y escucha de eventos: -->

    <!-- 
    Como ya se vio brevemente antes, un componente puede emitir eventos personalizados mediante el metodo nativo de VueJS $emit.
    Otro componente padre de este puede escuchar dichos eventos mediante la directiva v-on (o su shorthand @) 
    
    Algo muy interesante es que pueden pasarme argumentos a la emision del evento, que pueden ser usados por el componente que lo escucha.
    Vamos a usar esta caracteristica para crear un CRUD sobre un arreglo, para eso renderizaremos el componente ./test_component/Book.bue,
    alli tambien se explicara como se emiten los eventos.
  -->

    <ul>
      <template v-for="book in books" :key="book.id">
        <Book 
          :id="book.id" 
          :name="book.name" 
          :author="book.author"
          v-on:delete-book="handleDel"
          v-on:update-book="handleUpdate"
        />
        <!-- Notesen en los eventos escuchados que podemos pasar la funcion que los maneja directamente siempre y cuando 
        los parametros que se reciben del emisor coincidan con la cantidad de parametros de la funcion -->
      </template>
    </ul>
    <form @submit.prevent="() => handleAdd(newBook)">
      <h3>Create new book</h3>
      <label>
        Name
        <input v-model="newBook.name"> <!-- binding -->
      </label>
      <label>
        Author
        <input v-model="newBook.author"/>
      </label>
      <button type="submit" :disabled="!isValid">CREATE</button>
    </form>

    <!-- Aclaracion sobre los eventos sobre componentes:

    El modificador .once al escuchar eventos tambien sirve para escuchar eventos de componentes.

    Los eventos personalizados emitidos por componentes, a diferencia de los eventos nativos del DOM, no tienen fases de captura y burbujeo,
    por lo que no hay propagacion: solo se pueden escuchar a los eventos emitidos directamente por el hijo.
    Si es necesario comunicarse entre componentes hermanos o profundamente anidados, 
    hay que utilizar un bus de eventos externo o una solución de gestión de estado global como Pinia.
    Se vera esto mas adelante.
     -->
     
  </div>
</template>

<style scoped>
  form {
    margin: 5px;
  }

  ul {
    margin: 0;
    padding: 0
  }
</style>