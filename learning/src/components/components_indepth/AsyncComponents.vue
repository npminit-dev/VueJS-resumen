<!-- 
Puede que necesitemos renderizar componentes de forma diferida, para cargarlos solo cuando los necesitemos,
imaginemos que tenemos una aplicacion que use Vue-Router, no necesitamos cargar todos los componentes en la carga inicial
sino solamente los del layout y de la seccion que se este visitando. Esto reduce la carga inicial de la página y mejora
las metricas de rendimiento de nuestra página. Esta tecnica se llama 'code splitting'.
Los componentes cargados de forma diferida solo cargaran sus recursos del servidor cuando sea necesario.
-->

<script setup>
import { defineAsyncComponent } from 'vue';
import LazyComponent from '../test_components/LazyComponent.vue';
import LoadingComponent from '../test_components/LoadingComponent.vue';
import ErrorComponent from '../test_components/ErrorComponent.vue';

/* En Vue tenemos la funcion defineAsyncComponent para lograr esto, 
esta funcion recibe un callback que debe devolver una promesa con el componente */

const LazyComponent1 = defineAsyncComponent(() => {
  return new Promise((resolve, reject) => {
    resolve(LazyComponent)
  })
})

/* los imports dinamicos de ESModules (metodo import) tambien devuelven una promesa, por lo que podemos usarlos */
const LazyComponent2 = defineAsyncComponent(() => import('../test_components/LazyComponent.vue'))

/* Manejo de estados de carga y error:
defineAsyncComponente proporciona varias opciones donde podremos proveer componentes para la fase de carga,
componentes para renderizar en caso de error, tiempo maximo de espera para la carga del componente, etc
*/

const LazyComponent4 = defineAsyncComponent({
  loader: () => import('../test_components/LazyComponent.vue'),
  loadingComponent: LoadingComponent,
  delay: 100, /* retraso hasta mostrar el loadingComponent */
  errorComponent: ErrorComponent, /* componente para mostrar en caso de error */
  timeout: 3000 /* tiempo maximo de espera de carga del componente diferido */
})

const LazyComponent5 = defineAsyncComponent({
  loader: () => new Promise((_, rej) => { /* retraso y error artificial */
    setTimeout(() => rej(), 2000)
  }),
  loadingComponent: LoadingComponent,
  delay: 100,
  errorComponent: ErrorComponent,
  timeout: 3000
})

</script>

<template>
  <LazyComponent1/>
  <LazyComponent2/>
  <LazyComponent3/> <!-- componente diferido global a nivel de aplicacion, definido en main.js -->
  <LazyComponent4/>
  <LazyComponent5/> <!-- componente con tiempo de carga y error artificial -->

  <!-- Una implementacion diferente para los componentes diferidos es el uso de el componente de Vue <Suspense/>
  mas adelante se vera como utilizarlo -->
</template>

<style scoped>

</style>