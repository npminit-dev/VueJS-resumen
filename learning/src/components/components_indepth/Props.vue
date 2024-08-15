<!-- Paso de props
ver test_component/PropsTest.vue
-->

<script setup>
import PropsTest from '../test_component/PropsTest.vue';

const propsTest = {
  name: 'Anna',
  surname: 'Galperovich',
  age: 45,
  isRegistered: true,
  specialities: ['QA', 'Manager']
}

</script>

<template>
  <!--
    los string pueden pasarse sin v-bind (o su shorthand), pero en cambio para otro tipo de datos, debemos usar v-bind,
    como es el caso de 'age' e 'isRegistered' y 'specialities', que son un number, un age y un array respectivamente.
    En el caso de isRegistered (boolean), colocarlo sin valor asume que dicho valor es 'true'.
  -->
  <PropsTest 
    name="Jorge" 
    surname="Balsamo"
    :age="29"
    isRegistered
    :specialities="['Web Developer', 'PC Fixer', 'UX/UI designer']"
  />

  <!-- Vue soporta el uso de kebab-case para pasar propiedades, esto esta en consonancia con los atributos de HTML nativos (notese la propiedad isRegistered) -->
  <PropsTest 
    name="Juan" 
    surname="Rodriguez"
    :age="25"
    :is-registered="false"
    :specialities="['UX/UI designer', 'LLM engineer', 'DB engineer']"
  />

  <!-- podemos usar un objeto para pasar todas las props de una vez mediante v-bind -->
  <PropsTest v-bind="propsTest"/>

  <!-- 
    Todas las props forman un enlace unidireccional entre la propiedad del padre y del hijo: cuando la propiedad padre se actualiza, fluirá hacia la del hijo, pero no al revés. 
    Esto evita que los componentes hijos muten accidentalmente el estado del padre, lo que puede hacer que el flujo de datos de su aplicación sea más difícil de entender.
    Además, cada vez que se actualiza el componente padre, todas las props del componente hijo se actualizarán con el valor más reciente. 
    Esto significa que no debes intentar mutar una prop dentro de una componente secundario. Si lo haces, Vue te avisará en la consola con un error.
  -->
  
</template>

<style scoped>
</style>