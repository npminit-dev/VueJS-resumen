
<!-- El componente incorporado <Teleport/> nos permite 'teletransportar' un nodo/componente o una serie de nodos/componentes
a otro nodo arbitrario dentro del arbol del DOM 

Esto tiene su utilidad en casos en los cuales tenemos por ejemplo un componente que contiene la logica de apertura/clausura
de un modal (y el modal en si), y este componente esta profundamente anidado en el arbol del DOM... 
como posicionamos o dimensionamos con CSS el modal con respecto al body, o al tag 'main'? 
la solucion para esto es que el componente 'teletransporte' el modal a dichos tags para poder posicionarlos correctamente,

- <Teleport> solo altera la estructura DOM renderizada: no afecta la jerarquía lógica de los componentes, 
  es decir, si <Teleport> contiene un componente, ese componente seguirá siendo un hijo lógico del componente padre que contiene <Teleport>. 
- El paso de props y la emisión de eventos seguirán funcionando de la misma manera.
- Esto también significa que las inyecciones de un componente padre funcionan como se esperaba y que el componente hijo se anidará debajo del componente padre en Vue Devtools, 
  en lugar de colocarse donde se movió el contenido real.
-->

<script setup>
import Modal from '../test_components/Modal.vue';
import { ref } from 'vue';

const open = ref(false)
const open2 = ref(false)
const teleportDisabled = ref(true)
</script>

<template>
  <!-- ver test_components/Modal.vue para estos ejemplos -->

  <!-- Teletransportamos el componente del modal al tag <body></body> del documento HTML para dimensionarlo y posicionarlo adecuadamente con respecto a el.
  Notese que podemos seguir pasando props y escuchando a eventos, eso es porque Modal sigue siendo hijo de este componente 
  a pesar de estar renderizado en otra parte del DOM -->
  <Teleport to="body"> <!-- teletransportado al <body></body> -->
    <Modal :open="open" @set-open="(state) => open = state"/>
  </Teleport>
  <button @click="open = true">open modal</button>

  <br>
  <hr>
  <br>

  <!-- En ciertos casos, quizas quisieramos que un Teleport funcione, pero que en otros casos no produzca su efecto...
  para eso tenemos la propiedad 'disabled' que en caso de ser verdadero, el contenido que debe teletransportarse se mantiene donde esta -->
  <div id="sized_div">
    <Teleport to="body" v-bind:disabled="teleportDisabled"> <!-- Teleport desactivado/activado condicionalmente -->
      <Modal :open="open2" @set-open="(state) => open2 = state"/>
    </Teleport>
  </div>
  <button @click="open2 = true">open modal</button>
  <button @click="teleportDisabled = !teleportDisabled">
    {{ teleportDisabled ? 'enable teleport' : 'disable teleport' }}
  </button>

  <!-- En caso de que tengamos multiples Teleports que apunten al mismo elemento,
  estos se renderizaran dentro del mismo en el orden en el que hayan sido teletransportados y montados,
  parecido a como funciona appendChild en HTML
   -->

</template>

<style scoped>
  #sized_div {
    position: relative;
    height: 225px;
    width: 225px;
  }
</style>