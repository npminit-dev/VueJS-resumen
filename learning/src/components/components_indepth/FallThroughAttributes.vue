<!-- Atributos 'caidos' -->

<!-- Los atributos 'caidos' son atributos o escuchas de eventos que pasamos a un componente, y que no han sido explicitamente definidos
en la definicion de props o emits de dicho componente.
Cuando pasamos atributos o escuchas de eventos a un componente de esta manera, y dicho componente tiene un unico elemento raiz,
estos atributos/escuchas se añadiran a dicho elemento
-->
<script setup>
  import FallThrough from '../test_components/FallThrough.vue';
  import FallThrough2 from '../test_components/FallThrough2.vue';
  const clickEvent = () => console.log('evento en la raiz por atributo fallthrough')
</script>

<template>
  <!-- La clase cyan_bg sera aplicada al elemento raiz del componente -->
  <FallThrough class="cyan_bg" :style="{border: '3px solid white'}"/>
  
  <!-- En caso de que las propiedades class y style existan tanto en la raiz del componente hijo como en la renderizacion en el padre,
  ambos atributos seran fusionados, en el caso de style el atributo definido en el padre tiene prioridad -->

  <!-- En el caso del atributo para escuchar eventos v-on, pasar un manejador de eventos click a un componente que no tiene en su raiz el atributo v-on:click
  hara que el manejador de eventos sea escuchado por la raiz -->
  <FallThrough @:click="clickEvent"/>
  <!-- Si el componente ya tenia un listener 'click' y le pasamos uno a traves del padre, ambos manejadores de eventos se ejecutaran -->

  <!-- Herencia de atributos caidos en componentes anidados: 
    Si pasamos atributos caidos a un componente A, que contiene otro componente B como componente raiz, los atributos caidos van a ser
    heredados directamente por B.
    Tengamos en cuenta que:
    Los atributos caidos no incluyen ningún atributo declarado como prop o oyentes v-on de eventos declarados por A; en otras palabras, las props y oyentes declarados han sido "consumidos" por A.
    Los atributos caidos pueden ser aceptados como props por B, si así lo declaramos.
  -->

  <!-- podemos cancelar la aceptacion de atributos caidos por medio de defineOptions. (ver test_components/FallThrough.vue) -->

  <!-- Supongamos el caso de que necesitamos, en un componente hijo, no pasar las props caidas a la raiz sino a otro nodo,
  podemos lograr esto desactivando la herencia de atributos desde defineOptions y bindeando el nodo con v-bind="$attr".
  Otra opcion es usar el macro useAttrs y el objeto que devuelve y pasarlo a v-bind
  Recordemos que v-bind sin argumento vincula todas las propiedades de un objeto como atributos del elemento de destino.-->
  <FallThrough2 class="bigbox" :style="{border: '2px solid white', 'border-radius': '100%'}"/> <!-- ver test_components/FallThrough2.vue -->

</template>

<style scope>
  .cyan_bg {
    background-color: darkcyan;
  }

  .bigbox {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 300px;
    width: 300px;
  }
</style>