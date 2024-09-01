<!-- 
  <TransitionGroup> es un componente integrado diseñado para animar la inserción, 
  eliminación y cambio de orden de elementos o componentes que se representan en una lista.

  <TransitionGroup> admite las mismas props, clases de transición CSS y hooks de JavaScript que <Transition>, con las siguientes diferencias:

  - De forma predeterminada, no renderiza un elemento contenedor. Pero puedes especificar un elemento que se representará con la prop 'tag'.
  - Los modos de transición no están disponibles porque ya no alternamos entre elementos mutuamente excluyentes.
  - Siempre se requiere que los elementos internos tengan un atributo 'key' unico.
  - Las clases de transición CSS se aplicarán a elementos individuales de la lista, no al grupo/contenedor en sí.
-->

<script setup>
import { computed, ref, watch } from "vue";
const arr = ref([1, 2, 3, 4, 5]);
let addIndex = ref(6);

watch(
  arr,
  () => {
    addIndex.value++;
    console.log(addIndex);
  },
  { deep: true }
);

const removeRandom = () => {
  let rand = Math.round(Math.random() * (arr.value.length - 1));
  arr.value = arr.value.filter((_, i) => i !== rand);
};

const addRandom = () => {
  let rand = Math.round(Math.random() * (arr.value.length - 1));
  arr.value.splice(rand, 0, addIndex.value);
};


let tosearch = ref("");
const list = ref([
  {
    id: 1,
    title: "Buscando a María",
    genre: "Drama, Romántica",
  },
  {
    id: 2,
    title: "Tengo 4 hermanos",
    genre: "Comedia",
  },
  {
    id: 3,
    title: "Paciencia en la sabana",
    genre: "Documental",
  },
  {
    id: 4,
    title: "Tenerife",
    genre: "Accion",
  },
]);

const filtered = computed(() => {
  if (tosearch.value === "") return list.value;
  else return list.value.filter((el) => (new RegExp(`^(.*?)(${tosearch.value})(.*?)$`, "gi").test(el.title)));
});

function handleEnter (el, done) {
  el.style.filter = 'opacity(0)'
  el.animate(keyframes, { duration: 300, delay: el.dataset.idx * 100 /* accediendo a idx */, fill: 'forwards' })
    .finished.then(() => done())
}

function handleExit (el, done) {
  el.style.filter = 'opacity(1)'
  el.animate(keyframes, { duration: 300, delay: el.dataset.idx * 100, direction: 'reverse', fill: 'forwards' })
    .finished.then(() => done())
}

const keyframes = [{
    filter: 'opacity(0)'
  },
  {
    filter: 'opacity(1)'
  }
]

</script>

<template>

  <!-- Este transition group renderizara una <ul></ul> con varias <li></li>, y tendra animaciones tanto para el elemento que entra/sale de la lista
  como para los elementos hermanos del mismo. Lo que permite que los elementos que se acomoden a la entrada/salida de un elemento, lo hagan de forma suave  -->
  <div>
    <!-- agregamos la propiedad 'name' para establecer el prefijo de las clases de transicion/animacion, y 'tag' para agregar un contentedor explicitamente -->
    <TransitionGroup name="simple-list" tag="ul">
      <li v-for="item in arr" :key="item">{{ item }}</li>
      <!-- propiedad 'key' obligatoria, como con cualquier lista -->
    </TransitionGroup>
    <button @click="removeRandom">remove random</button>
    <button @click="addRandom">add random</button>
  </div>

  <br />
  <hr />
  <br />

  <!-- 
  Transiciones de lista mediante JavaScript hooks
    Podemos crear animaciones realmente interesantes usando los hooks de JavaScript, 
    la clave esta en el atributo de HTML 'data-*' (ver en la documentacion de MDN docs), es un atributo especial que nos permite pasar
    datos al elemento nativo de html para acceder a este dentro de la funcion del hook, pasaremos el indice del elemento en el arreglo
    y lo multiplicaremos por una constante para agregar un delay ligeramente diferente a cada elemento en la lista
  -->
  <div>
    <search>
      <label>
        Search: 
        <input v-model="tosearch" type="text" />
      </label>
    </search>
    <TransitionGroup 
      @enter="handleEnter"
      @leave="handleExit"
      tag="ul"
      :css="false"
    >
      <!-- El atributo data-* nos permitira acceder a la propiedad pasada luego del guion (idx en este caso) mediante la propiedad 'dataset' del elemento nativo -->
      <li v-for="(item, index) in filtered" v-bind:key="item.id" v-bind:data-idx="index + 1"> <!-- pasamos el indice + 1 -->
        <h3>{{ item.title }}</h3>
        <h4>{{ item.genre }}</h4>
      </li>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.simple-list-move, /* esta es una clase especial, para decidir como los elementos se comportan al agregar o quitar un elemento, o al reordenar la lista */
  .simple-list-enter-active,
  .simple-list-leave-active {
  transition: all 1s ease-in;
}

.simple-list-enter-from,
.simple-list-leave-to {
  opacity: 0;
  transform: translateX(50px);
}

/* asegúremonos de que los elementos que se eliminan se retiren del flujo del documento mediante position: absolute para que
  las animaciones se pueden calcular correctamente. */
.simple-list-leave-active {
  position: absolute;
}
</style>
