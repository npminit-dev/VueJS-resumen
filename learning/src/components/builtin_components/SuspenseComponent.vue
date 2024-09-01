<!-- !!! Este componente es experimental a la fecha 31/8/2024, consultar documentacion -->

<!-- 
  <Suspense> es un componente integrado para orquestar dependencias asíncronas en un árbol de componentes.
  Puede representar un estado de carga mientras espera que se resuelvan múltiples dependencias asíncronas anidadas en el árbol de componentes.

  En el árbol de componentes puede haber varios componentes anidados cuya representación depende de algún recurso asíncrono que se resolverá primero. 
  Sin <Suspense>, cada uno de ellos necesitará manejar su propia carga/error y estados de exito. 
  En el peor de los casos, es posible que veamos tres botones giratorios de carga en la página, con el contenido mostrado en diferentes momentos.

  El componente <Suspense> nos brinda la capacidad de mostrar estados de carga/error de nivel superior mientras esperamos que se resuelvan estas dependencias asíncronas anidadas.

  Hay dos tipos de dependencias asíncronas que <Suspense> puede esperar:
  - Componentes con un hook async setup(). Esto incluye componentes que utilizan <script setup> con expresiones de await de nivel superior.
  - Componentes asíncronos.
-->

<script setup>
import { defineAsyncComponent } from 'vue';
import ErrorComponent from '../test_components/ErrorComponent.vue';

/* Tipos de componentes que Suspense puede controlar: */

/* componente que usa async setup */
import AsyncSetupComponent from '../test_components/AsyncSetupComponent.vue'; 
/* componente que usa script setup y top level awaits */
import AsyncCompositionComponent from '../test_components/AsyncCompositionComponent.vue'; 
/* componente asincrono usando defineAsyncComponent */
const AsyncTabOne = defineAsyncComponent({
  loader: () => import('../test_components/TabOne.vue'),
  delay: 500,
  errorComponent: ErrorComponent
}) 

/* Los componentes asíncronos definidos por defineAsyncComponent son "suspensibles" de forma predeterminada. 
Esto significa que si tiene un <Suspense> como uno de sus ancestros, será tratado como una dependencia asíncrona de ese <Suspense>. 
En este caso, el estado de carga será controlado por <Suspense> y se ignorarán las opciones de carga, error, retraso y 
tiempo de espera que se definieron en defineAsyncComponent. */

</script>

<template>
  <!-- Suspense puede contener 2 slots: default y fallback. Cada uno de estos slots acepta un único elemento (que obviamente puede contener otros elementos)  -->
  <Suspense>
    <AsyncSetupComponent/> <!-- Como ya pudimos ver en el capitulo de Slots, este componente representara el slot 'default' -->
    <template #fallback> <!-- Slot 'fallback' (representa a la parte de la interfaz que se debe renderizar mientras se espera la resolucion de los componentes asincronos) -->
      fallback children
    </template>
  </Suspense>

  <!-- Fases del estado de un Suspense: -->
  <!--
    En el renderizado inicial, <Suspense> renderizará el contenido de su slot 'default' en la memoria. 
    Si se encuentra alguna dependencia asíncrona durante el proceso, entrará en un estado pendiente. Durante el estado pendiente, se mostrará el contenido del slot 'fallback'. 
    Cuando se han resuelto todas las dependencias asíncronas encontradas, <Suspense> entra en un estado resuelto y se muestra el contenido de la ranura 'default' resuelta.
    Si no se encontraron dependencias asíncronas durante el renderizado inicial, <Suspense> pasará directamente a un estado resuelto.

    Una vez que esté en un estado resuelto, <Suspense> solo volverá a un estado pendiente si se reemplaza el nodo raíz del slot 'default'. 
    Las nuevas dependencias asíncronas anidadas más profundamente en el árbol no harán que <Suspense> vuelva a un estado pendiente.
    Cuando se produce un cambio en el nodo raiz del slot 'default', el contenido del slot 'fallback' no se mostrará inmediatamente. 
    En su lugar, <Suspense> mostrará el contenido 'default' anterior mientras espera que se resuelva el nuevo contenido y sus dependencias asíncronas. 
    Este comportamiento se puede configurar con la propiedad 'timeout': <Suspense> cambiará al contenido alternativo si tarda más que el tiempo de espera en representar el nuevo contenido predeterminado. 
    Un valor de tiempo de espera de 0 hará que el contenido 'fallback' se muestre inmediatamente cuando se reemplace el contenido 'default'.
  -->

  <!-- Suspense tambien emite 3 eventos: pending, resolve, fallback: -->
  <!--
    El evento 'pending' ocurre al entrar en un estado pendiente. 
    El evento 'resolved' se emite cuando el contenido nuevo termina de resolverse en el slot default. 
    El evento 'fallback' se activa cuando se muestra el contenido en el slot 'fallback'.
  -->
  <Suspense 
    @pending="console.log('suspense is pending')"
    @fallback="console.log('fallback has displayed')"
    @resolve="console.log('async component has resolved')"
  >
    <AsyncCompositionComponent/>
    <template #fallback>fallback children</template>
  </Suspense>


</template>

<style scoped>

</style>