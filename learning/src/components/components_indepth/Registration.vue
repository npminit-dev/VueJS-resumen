<!--
Un componente de Vue debe "registrarse" para que Vue sepa dónde ubicar su implementación cuando se encuentre en un template. 
Hay dos formas de registrar componentes: global y local.

Podemos registrar globalmente componentes para que esten disponibles en toda la aplicacion y sin necesidad de importarlos.
Para ello, debemos usar el metodo .component de la instancia de aplicacion de VueJS (ver main.js)
este metodo devuelve la instancia de aplicacion de Vue, por lo que podemos encadenar varios metodos .component y registrar varios componentes,
-->

<!-- Advertencias sobre los componentes globales: -->

<!-- Si bien es conveniente, el registro global tiene algunos inconvenientes:

El registro global evita que los sistemas de compilación eliminen componentes no utilizados (también conocido como "tree shaking"). 
Si registra globalmente un componente pero al final no lo utiliza en ninguna parte de su aplicación, seguirá incluido en el paquete final.
El registro global hace que las relaciones de dependencia sean menos explícitas en aplicaciones grandes. 
Hace que sea difícil localizar la implementación de un componente secundario desde un componente principal que lo utiliza. 
Esto puede afectar la mantenibilidad a largo plazo de manera similar al uso de demasiadas variables globales.
-->

<!-- Componentes locales -->
<!-- El registro local limita la disponibilidad de los componentes registrados únicamente al componente actual. 
Hace que la relación de dependencia sea más explícita y es más amigable con el 'tree shaking'. -->

<script setup>
  import Apartment from '../test_component/Apartment.vue'; // importacion local
  /* para la Options API, debemos utilizar la propiedad components, que es un objeto donde la clave es el alias para el componente, 
  y el valor es el componente en si */
  /* notese que para componentes hijos hay que volver a importar el componente que se quiera usar, es decir, las importaciones no se heredan */
</script>

<!-- Casing de componentes: Para componentes de Vue, la convencion es utilizar nombres que usan PascalCase (Todas las palabras comienzan en mayuscula) 
Esto sirve para diferenciar los componentes de los tags de HTML, aunque vue soporta la conversion de PascalCase a kebab-case
es decir si importamos un componente con el nombre AuthorName, podemos renderizarlo como <author-name></author-name> en el template
-->

<template>
  <div>
    <GlobalComponent/> <!-- este componente global logicamente renderizaria tambien a sus hijos, si los tuviese -->
    <Apartment/>
    <apartment/> <!-- dos componentes identicos, uno usando PascalCase, el otro usando kebab-case -->
  </div>
</template>

<style scoped>
</style>