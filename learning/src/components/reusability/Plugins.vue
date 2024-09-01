
<!-- Los plugins son código autónomo que generalmente agrega funcionalidad a nivel de aplicación a Vue. -->
<!-- En este caso vamos a crear un plugin dentro del archivo src/utils.js y lo añadiremos a la aplicacion dentro de main.js 
Este plugin sera una simulacion de la libreria i18n, que sirve la internacionalizacion de las aplicaciones web.
-->
<script setup>
import { inject } from 'vue';
const translateObject = inject('translateObject') /* inyectamos objeto con las traducciones */
</script>

<template>
  <div>
    <!-- traducimos la palabra 'hello' a español, creando una propiedad global $translate mediante el plugin -->
    <h1>{{ $translate('greetings.hello') }}</h1> 

    <!-- provide/inject en plugins -->

    <!-- usamos directamente el objeto que contiene las traducciones, ya que el plugin ha agregado este objeto a app.provide(), para que este disponible globalmente  -->
    <h1>{{ translateObject.greetings.hello }}</h1>

    <!-- sobre las propiedades globales: Utilice propiedades globales lo menos posible, 
    ya que puede resultar confuso si se utilizan demasiadas propiedades globales inyectadas por diferentes plugins en una aplicación. -->
  </div>
</template>

<style scoped>

</style>