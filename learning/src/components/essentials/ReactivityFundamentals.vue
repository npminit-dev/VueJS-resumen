<!-- Fundamentos de la reactividad en VueJS -->

<!-- 
La manera comun de obtener valores reactivos en Vue con la composition API es mediante "ref" 
  estos valores estan envueltos y pueden desenvolverse al llamar a la propiedad value
  en ciertos lugares no es necesario desenvolver estos valores para obtenerlos, aunque tiene ciertas advertencias
-->

<!-- En la composition API y SFC, para exponer los estados al template y utilizarlos alli, 
 suele ser necesario retornar por defecto en el script un objeto que contenga el hook setup, y devolver los estados para exponerlos:-->

<!--  
 <script>
 import { ref } from 'vue'
 export default {
   setup() {
     const reactiveValue = ref('string value')
       return {
         reactiveValue
       }
     }
  }
 </script>
  -->

<!-- Esto es verboso e incomodo, por suerte esto se soluciona con la propiedad 'setup' del tag <script>, 
  todo lo que se defina en el script, tanto modulos como estados y funciones, seran expuestos al template automaticamente
  esta es la manera comun de trabajar con Vue
   -->

<script setup>

import { ref, shallowRef, reactive } from 'vue'
const reactiveValue = ref('string value')
console.log(reactiveValue) /* <- valor envuelto */
console.log(reactiveValue.value) /* <- valor desenvuelto */

const reactiveNested = ref({ /* los objetos complejos tambien son reactivos, independientemente de la profundidad */
  dni: 45869202,
  person: {
    name: 'jorge',
    surname: 'balsamo'
  }
})

/* shallowRef, contrariamente a ref, no trackea las propiedades de objetos o arreglos profundos, 
solo se vuelve reactivo ante las reasignaciones de la propiedad 'value' */
const reactiveShallow = shallowRef({ count: 0 })

/* nextTick(): El método nextTick() => Promise en Vue.js es una función que permite ejecutar código justo después de que el DOM haya sido actualizado en el siguiente ciclo de actualización.
 Dado que Vue actualiza el DOM de manera asíncrona para optimizar el rendimiento, nextTick() es útil para manejar situaciones donde necesitas esperar a que los cambios en el estado reactivo se reflejen en el DOM antes de realizar acciones dependientes, 
 como manipulación de elementos o cálculos basados en el estado actualizado del DOM. */

/* otras formas de reactividad */
/* reactive envuelve el objeto en un Proxy de javascript que es reactivo bajo ciertas circunstancias (ver desventajas), tambien existe una version 'shallow' de esta API */
const reactiveProxy = reactive({ count: 0, square: 0 })
/* desventajas: 
  solo funciona con objetos, arreglos, maps, sets, etc
  reemplazar el objeto entero hara que se pierda la reactividad
  desestructurar una propiedad del proxy a una variable local, cambiar esta variable perdera la reactividad, lo mismo sucede si pasamos esa propiedad a una funcion

  Por lo tanto, la manera principal y mas fiable de definir estados reactivos es mediante el uso de 'Ref'
*/

 /* Desenvoltorio de refs y reactives: */
 /* bajo ciertas circunstancias, los refs y proxies se desenvuelven por si solos, sin necesidar de acceder a la propiedad value 
 A diferencia de los objetos reactivos, no se realiza ningún desenvolvimiento cuando se accede a la referencia como un elemento de una matriz reactiva o un tipo de colección nativa como Map
 El desenvolvimiento de referencias en templates solo se aplica si la referencia es una propiedad de nivel superior en el contexto de representación del template.
 */

/* aux functs */
function submitNested() {
  console.log(reactiveNested.value)
}
</script>

<template>
  <div id="container">

    <div>
      <form>
        <input type="text" :value="reactiveValue" @change="(e) => reactiveValue = e.target.value">
      </form>
    </div>

    <br>
    <hr><br>

    <div>
      <form @submit.prevent="submitNested()">
        <label>
          DNI
          <input type="text" v-bind:value="reactiveNested.dni" v-on:change="(e) => reactiveNested.dni = e.target.value">
        </label>
        <label>
          NAME
          <input type="text" v-bind:value="reactiveNested.person.name"
            v-on:change="(e) => reactiveNested.person.name = e.target.value">
        </label>
        <label>
          SURNAME
          <input type="text" v-bind:value="reactiveNested.person.surname"
            v-on:change="(e) => reactiveNested.person.surname = e.target.value">
        </label>
        <button type="submit">send</button>
      </form>
    </div>

    <br><hr><br>

    <div>
      <h1>count: {{ reactiveShallow.count }}</h1>
      <!-- aunque esto no sea reactivo, el numero se incrementara internamente -->
      <button v-on:click="reactiveShallow.count++">non-reactive increment</button> 
      <!-- esto es reactivo, asi que los incrementos que se hagan arriba se veran al clickear aqui, ademas del propio incremento -->
      <button v-on:click="reactiveShallow = { count: reactiveShallow.count + 1 }">reactive increment</button> 
    </div>

  </div>

</template>

<style scoped>
#container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

hr {
  width: 100%
}
</style>