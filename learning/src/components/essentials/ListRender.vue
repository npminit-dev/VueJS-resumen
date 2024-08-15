<script setup>
import { computed, ref } from 'vue';
import Apartment from '../test_component/Apartment.vue';
const array = ref([
  {
    name: 'jorge',
    surname: 'balsamo'
  },
  {
    name: 'nicolas',
    surname: 'cage'
  }
])

const obj = ref({
  businessName: 'Arts Co.',
  cuit: '12-4344-12333',
  valuatedOn: '4.500 B'
})

const numbers = ref([1,2,3,4,5,6,7,8,9])
const evens = computed(() => (numbers.value.filter(num => num % 2 === 0)))

</script>

<template>
  <!-- la directiva v-for nos permite renderizar listas, es muy similar al forEach -->
  <ol>
    <!-- notese que v-for renderiza el elemento donde se aplica tantas veces como la longitud del arreglo, no debe usarse en el contenedor -->
    <li v-for="item of array">
      <h3>Name: {{ item.name }}</h3>
      <h4>Surname: {{ item.surname }}</h4>
    </li>
  </ol>

  <br>
  <hr>
  <br>

  <!-- podemos obtener el indice tambien -->
  <ol>
    <li v-for="(item, idx) of array">
      <h3>Index: {{ idx }}</h3>
      <h3>Name: {{ item.name }}</h3>
      <h4>Surname: {{ item.surname }}</h4>
    </li>
  </ol>

  <br>
  <hr>
  <br>

  <!-- desestructurar propiedades -->
  <ol>
    <li v-for="({ name, surname }, idx) of array">
      <h3>Index: {{ idx }}</h3>
      <h3>Name: {{ name }}</h3>
      <h4>Surname: {{ surname }}</h4>
    </li>
  </ol>

  <br>
  <hr>
  <br>

  <!-- v-for en objetos, es similar a los valores que se obtienen de object.entries(), añadido el indice ademas -->
  <ul>
    <li v-for="value in obj">
      <h3>value: {{ value }}</h3>
    </li>
  </ul>

  <br>
  <hr>
  <br>

  <!-- desestructurando valor, clave e indice -->
  <ul>
    <li v-for="(value, key, index) in obj">
      <h3>index: {{ index }}</h3>
      <h3>{{ key }}: {{ value }}</h3>
    </li>
  </ul>

  <br>
  <hr>
  <br>

  <!-- podemos usar v-for como un for de JavaScript, recorriendo desde n (que es siempre 1 en Vue) hasta cierto valor arbitrario -->

  <div>
    <h5 v-for="n of 10">
      {{ n }}
    </h5>
  </div>

  <br>
  <hr><br>

  <!-- v-if vs v-for: v-if tiene precedencia sobre v-for, 
  por lo que v-if no puede acceder a las variables de v-for si ambos estan definidos en el mismo elemento-->

  <!--
  esto nos lanzara un error porque la propiedad "todo"
  no esta definido en la instancia.
  -->
  <!-- <li v-for="todo in todos" v-if="!todo.isComplete">
    {{ todo.name }}
  </li> -->

  <!-- puede evitarse moviendo el v-for a un template, que al final como se sabe los templates no se renderizan al final -->
  <template v-for="item in array">
    <div v-if="item.name === 'nicolas'">
      {{ item.name }} {{ item.surname }}
    </div>
  </template>

  <br>
  <hr>
  <br>

  <!-- Para darle una pista a Vue de como debe actualizar los nodos de una lista, es conveniente pasar una 'key' para identificarlos 
  unequivocamente, algo similar a lo que pasa en React con las listas -->
  <ul>
    <ol v-for="(key, value, index) in obj" v-bind:key="Math.random()*100000">
      {{ key }} - {{ value }} - {{ index }}
    </ol>
  </ul>

  <!-- Renderizado de listas de componentes -->
  <template v-for="n in 5" v-bind:key="Math.random()* 10000">
    <Apartment></Apartment> 
  </template>

  <!-- Renderizado de listas filtradas, con valores computados -->
  <template v-for="num in evens" v-bind:key="num">
    <h5>{{ num }}</h5>
  </template>

</template>

<style></style>