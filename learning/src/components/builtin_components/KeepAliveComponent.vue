<!-- 
  <KeepAlive> es un componente integrado que nos permite almacenar en caché condicionalmente 
  instancias de componentes cuando cambiamos dinámicamente entre múltiples componentes.

  En el capítulo ComponentEssentials vimos la sintaxis de los componentes dinámicos, utilizando el elemento especial <component>
  en conjunto con el atributo 'is':

  <component :is="activeComponent" />

  De forma predeterminada, una instancia de componente activo se desmontará y destruira al des-renderizar condicionalmente. 
  Esto hará que se pierda cualquier cambio de estado que tenga. Cuando este componente se muestre nuevamente, se creará una nueva instancia solo con el estado inicial.

  Para resolver este problema, podemos envolver nuestro componente dinámico con el componente integrado <KeepAlive>.
-->
<script setup>
import { ref, shallowRef } from 'vue';
import VInput from '../test_components/VInput.vue';
import Input from '../test_components/Input.vue';
import KeepAlived from '../test_components/KeepAlived.vue';

const element = shallowRef(VInput)
const element2 = shallowRef(KeepAlived)

const switchComponent = () => {
  if(element.value === VInput) element.value = Input
  else element.value = VInput
}

const switchComponent2 = () => {
  if(element2.value === KeepAlived) element2.value = Input
  else element2.value = KeepAlived
}
</script>

<template>
  <!-- KeepAlive mantendra las instancias en cache, asi no se pierde su estado al desmontarse los componentes -->
  <!-- el v-bind es solo para pasar las props requeridas por los componentes -->
  <fieldset>
    <legend>renderizado condicional</legend>
    <KeepAlive> 
      <component :is="element" v-bind="element === VInput ? { surname: 'hello' } : undefined"/> 
    </KeepAlive>
  </fieldset>
  <button @click="switchComponent">switch element</button>

  <br><br><hr><br>

  <!-- Include/Exclude (ver test_components/KeepAlived.vue) -->

  <!-- De forma predeterminada, <KeepAlive> almacenará en caché cualquier instancia de componente que pueda ser renderizada condicionalmente mediante :is. 
  Podemos personalizar este comportamiento mediante las props de 'include' y 'exclude'. 
  Ambas props pueden ser una cadena delimitada por comas, una expresión regular o un array que contenga cualquiera de los dos tipos: -->

  <fieldset>
    <legend>test</legend>
    <!-- KeepAlive en este caso almacenara en cache el componente 'KeepAlived', pero excluira a 'Input'  -->
    <KeepAlive :exclude="['Input']"> 
      <component :is="element2" v-bind="element2 === VInput ? { surname: 'nose' } : null"/>
    </KeepAlive>
  </fieldset>
  <button @click="switchComponent2">switch element</button>

  <!-- Máximo de instancias en caché
    Podemos limitar la cantidad máxima de instancias de componentes que se pueden almacenar en caché mediante la prop 'max'. 
    Cuando se especifica 'max', <KeepAlive> se comporta como una caché LRU: si el número de instancias almacenadas en caché está a punto de exceder el recuento máximo especificado, 
    la instancia almacenada en caché a la que se haya accedido menos recientemente se destruirá para dejar espacio para la nueva.
  -->

  <!--
    Hooks de ciclo de vida de componentes en cache: ver test_components/KeepAlived.vue
   -->


</template>

<style scoped>

</style>