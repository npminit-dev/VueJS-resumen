<!-- Ademas de las propiedades especiales que Vue nos proporciona para interactuar con los tags de HTML,
en ciertos casos quizas necesitemos acceso directo a dichos nodos, podemos usar refs para esto, en cuyo caso se denominaran 'template refs'
-->

<script setup>
import { onUpdated, ref, watchEffect } from 'vue';
import Apartment from '../test_components/Apartment.vue';
const rotateTargetRef = ref(null)
const populateRefs = ref([])
const optionRef1 = ref(null)
const optionRef2 = ref(null)
const optionNumber = ref(1)
const componentRef = ref(null)

watchEffect(() => {
  console.log([...populateRefs.value])
})

watchEffect(() => {
  console.log('optionRef1 cambiado a: ' + optionRef1.value)
})

watchEffect(() => {
  console.log('optionRef2 cambiado a: ' + optionRef2.value)
})

const persons = [
  {
    name: 'michael',
    age: 24
  }, 
  {
    name: 'ana',
    age: 21
  }
]

function handleRotate() {
  if(rotateTargetRef.value !== null) { /* debemos asegurarnos de comprobar la no-nulidad del ref! esto es porque el DOM tarda en cargarse y, por lo tanto, en asignar el valor del elemento al ref */
    rotateTargetRef.value.getAnimations().forEach(e => {
      e.cancel()
      e.play() /* cancelamos y volvemos a ejecutar la animacion */
    }) 
  }
}

onUpdated(() => {
  console.log('updated!')
})

</script>

<template>

  <div>
    <span id="rotateTargetRef" ref="rotateTargetRef">Animacion accediendo al elemento desde un 'ref'</span> <!-- el ref se asigna mediante un string, que debe coincidir con el nombre del estado -->
    <button @click="handleRotate">rotate</button>
  </div>
  <br>

  <!-- Uso de templateRefs en v-for 
    podemos usar un ref que almacene un arreglo, y este se llenara de los elementos del v-for
    el watchEffect correspondiente imprime los elementos en consola 
    el array de refs puede que no mantenga el orden original de los elementos! -->
  <ul>
    <li v-for="person in persons" ref="populateRefs">
      <h5>Name: {{ person.name }}</h5>
      <h5>Age: {{ person.age }}</h5>
    </li>
  </ul>
  <br>

  <!-- Function refs -->
  <!-- en lugar de usar strings para referenciar los refs, podemos usar una funcion que sera llamada en cada actualizacion de componente
  esta funcion recibira el elemento huesped, por lo que dentro de la funcion tendremos acceso total a que ref apunta dicho huesped.
  Al usar v-bind:ref (o :ref) podemos tambien definir una funcion aparte y llamarla dentro de :ref -->

  <h3 v-bind:ref="(element) => {
    if(optionNumber === 1) { /* intercambiamos referencias del huesped en cada actualizacion del estado 'optionNumber */
      optionRef1 = element
      optionRef2 = null;
    } else {
      optionRef1 = null;
      optionRef2 = element
    }
    console.log('Elemento referenciado mediante una funcion: ' + element)
  }"></h3>
  <button @click="optionNumber = optionNumber === 1 ? 2 : 1">switch refs</button>
  <br>

  <!-- Refs en componentes (esto tomara mas sentido en la seccion componentes de la documentacion):-->
  <Apartment ref="componentRef"></Apartment>

  <!-- 
  Si el componente hijo usa la API de opciones o no usa <script setup>, 
  la instancia a la que se hace referencia será idéntica a la del componente hijo, 
  lo que significa que el componente padre tendrá acceso completo a todas las propiedades y métodos del componente hijo. 
  Esto facilita la creación de detalles de implementación estrechamente acoplados entre el padre y el hijo, 
  por lo que las referencias de los componentes solo deben usarse cuando sea absolutamente necesario; en la mayoría de los casos, 
  debe intentar implementar interacciones padre/hijo utilizando las props estándar y las interfaces de emisión primero.

  Una excepción aquí es que los componentes que usan <script setup> son privados de forma predeterminada: 
  un componente padre que hace referencia a un componente hijo que usa <script setup> 
  no podrá acceder a nada a menos que el componente hijo elija exponer una interfaz pública usando la macro defineExpose. :
  -->

  <!--
    <script setup>
      import { ref } from 'vue'

      const a = 1
      const b = ref(2)

      // las macros del compilador, como defineExpose, no necesitan ser importadas
      defineExpose({ /* se expone un objeto a las template refs del padre */
        a,
        b
      })
    </script>
  -->

  <!-- 
  Cuando un padre obtiene una instancia de este componente a través de template refs, 
  la instancia recuperada tendrá la forma {a: número, b: número} 
  (las referencias se desenvuelven automáticamente como en las instancias normales).
  -->

</template>


<style scoped>

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  #rotateTargetRef {
    background-color: aqua;
    height: 150px;
    width: 150px;
    animation: rotate 1s ease-in-out forwards;
    color: #333;
  }

  @keyframes rotate {
    from {
      transform: rotateZ(0deg);
    }
    to {
      transform: rotate(720deg)
    }
  }
</style>