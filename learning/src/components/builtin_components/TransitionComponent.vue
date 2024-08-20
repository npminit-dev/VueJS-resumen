
<!-- Transition es un elemento de Vue que sirve para aplicar animaciones cuando un elemento o componente entra y sale del DOM. -->
<!--
Las animaciones de entrada o salida pueden ser provocadas por uno de los siguientes:

  - Representación condicional a través de v-if
  - Visualización condicional a través de v-show
  - Componentes dinámicos que se alternan mediante el elemento especial <component>
  - Cambiar el atributo key
-->

<!-- 
Cuando se inserta o elimina un elemento en un componente <Transition>, esto es lo que sucede:

  - Vue detectará automáticamente si el elemento de destino tiene transiciones CSS o animaciones aplicadas. 
    Si es así, se agregarán o eliminarán una serie de clases de transición CSS en los momentos adecuados.
  - Si hay oyentes para hooks de JavaScript, estos hooks se llamarán en los momentos adecuados. (estos hooks se explican mas abajo)
  - Si no se detectan transiciones/animaciones CSS y no se proporcionan enlaces de JavaScript, las operaciones DOM para la inserción y/o eliminación se ejecutarán en el siguiente cuadro de animación del navegador. -->

<!-- -->

<!-- clases CSS de transición
Hay seis clases que se aplican para las transiciones de entrada/salida:

  * v-enter-from: estado inicial para la entrada. Agregado antes de insertar el elemento, eliminado un fotograma después de insertar el elemento.
  * v-enter-active: Estado activo para la entrada. Aplicado durante toda la fase de entrada. Se agrega antes de insertar el elemento y se elimina cuando finaliza la transición/animación. 
  Esta clase se puede utilizar para definir la duración, el retraso y la curva de relajación de la transición entrante.
  * v-enter-to: Estado final para la entrada. Se agrega un cuadro después de insertar el elemento (al mismo tiempo que se elimina v-enter-from), y se elimina cuando finaliza la transición/animación.
  * v-leave-from: Estado inicial de la salida. Se agrega inmediatamente cuando se activa una transición de salida y se elimina después de un fotograma.
  * v-leave-active: Estado activo para la salida. Aplicado durante toda la fase de salida. Se agrega inmediatamente cuando se activa una transición de salida, se elimina cuando finaliza la transición/animación. Esta clase se puede utilizar para definir la duración, el retraso y la curva de relajación de la transición de salida.
  * v-leave-to: Estado final de la salida. Se agrega un cuadro después de que se activa una transición de salida (al mismo tiempo que se elimina v-leave-from), y se elimina cuando finaliza la transición/animación.
  
v-enter-active y v-leave-active nos brindan la capacidad de especificar diferentes curvas de aceleración para las transiciones de entrada/salida, de las cuales veremos un ejemplo en las siguientes secciones. -->

<!-- el componente transition puede tener un nombre:
<Transition name="rotate"></Transition>
en cuyo caso, el prefijo para las clases de transicion ya no sera 'v' sino el propio nombre: ej: rotate-enter-from
-->

<script setup>
import { ref } from 'vue';
const shown = ref(true)
const shown2 = ref(true)

</script>

<template>
  <Transition name="appear">
    <div v-show="shown"> <!-- Transition recibe solo 1 componente o nodo -->
      primera prueba
    </div>
  </Transition>
  <button @click="shown = !shown">toggle</button> <!-- El boton debe estar FUERA de Transition si no va a participar de la animacion -->

  <hr>
  
  <!-- Animaciones CSS:
  Las animaciones CSS nativas se aplican de la misma manera que las transiciones CSS, 
  con la diferencia de que *-enter-from no se elimina inmediatamente después de insertar el elemento, 
  sino en un evento de animationend.

  Para la mayoría de las animaciones CSS, simplemente podemos declararlas en las clases *-enter-active y *-leave-active. 
  He aquí un ejemplo:
   -->
  <Transition name="appear2">
    <div v-show="shown2">
      sgunda prueba
    </div>
  </Transition>
  <button @click="shown2 = !shown2">toggle</button>
</template>

<style scoped>

  .appear-enter-from {
    filter: opacity(0);
  }

  .appear-enter-active { /* esta clase nos permite añadir delay, duracion, easing curves y demas a la animacion de entrada */
    transition: all .5s ease-in-out;
  }

  .appear-enter-to {
    filter: opacity(1);
  }

  .appear-leave-from {
    filter: opacity(1);
  }

  .appear-leave-active { /* esta clase nos permite añadir delay, duracion, easing curves y demas a la animacion de salida */
    transition: all .5s ease-in-out;
  }

  .appear-leave-to {
    filter: opacity(0);
  }

  /*---------*/

  .appear2-enter-active {
    animation: fadein_left .5s ease-out forwards;
  }

  .appear2-leave-active {
    animation: fadein_left .5s ease-in reverse forwards;
  }

  /* animaciones */

  @keyframes fadein_left {
    from {
      transform: translateX(-30px);
      filter: opacity(0);
    } to {
      transform: translateX(0);
      filter: opacity(1);
    }
  }

  /* general */
  div {
    height: 100px;
    width: 150px;
    background-color: cadetblue;
  }
</style>