<!-- 
  Los componentes nos permiten dividir la interfaz de usuario en partes independientes y reutilizables, y pensar en cada pieza de forma aislada. 
  Es común que una aplicación esté organizada en un árbol de componentes anidados

  Esto es muy similar a cómo anidamos elementos HTML nativos, 
  pero Vue implementa su propio modelo de componentes que nos permite encapsular contenido y lógica personalizados en cada componente. 
  Vue también funciona muy bien con componentes web nativos.

  Hasta ahora hemos definido SFC's (single file components) teniendo una herramienta de building, como Vite, aunque los componentes
  de Vue pueden definirse tambien mediante JavaScript plano (esto en proyectos que no contengan builders, como proyectos solo en HTML/CSS/JS)

  Un ejemplo de componente definido en VainillaJS y con VueJS mediante CDN's por ejemplo:

  import { ref } from 'vue'
  export default {
    setup() {
      const count = ref(0)
      return { count }
    },
    template: `
      <button @click="count++">
        You clicked me {{ count }} times.
      </button>`
    }
  }
  
  Los componentes pueden ser usados dentro de otros siempre que los importemos correctamente, en caso de la Composition API
  debemos importarlos en la parte superior del tag <script setup></script>
  Podemos hacer tambien que un componente sea global, eliminando la necesidad de importarlos, esto tiene sus ventajas y desventajas y se veran mas adelante.
  -->

  <!--
  Props y emitters: 
  Algo esencial en la arquitectura de componentes, es poder pasar propiedades (props) de padres a hijos.
  Para lograr esto, debemos definir en el componente que va a recibir esas props, una macro llamada 'defineProps'

  defineProps es una macro en tiempo de compilación que solo está disponible dentro de <script setup> y no necesita importarse explícitamente. 
  Las props declaradas se exponen automáticamente al template. 
  defineProps también devuelve un objeto que contiene todas las props pasados ​​al componente, 
  para que podamos acceder a ellos en JavaScript si es necesario:

  en caso de que estemos usando la Options API, las props se definen agregando un array con los nombres de las props a la propiedad 'props' 
  de la exportacion por defecto del componente, lo mismo para los emitters.

  ahora vamos a realizar un componente Album (ver en carpeta test_component) que renderizaremos mediante un v-for,
  a este componente le pasaremos cada una de las propiedades del album mediante props (la request que obtiene el array de albumes la definiremos aqui)
  -->

<script setup>
import { onErrorCaptured, onMounted, ref } from 'vue';
import Album from '../test_component/Album.vue'
import TabOne from '../test_component/TabOne.vue';
import TabTwo from '../test_component/TabTwo.vue';

const albums = ref([])
const fontSize = ref(10)

const selectedTab = ref('TabOne')
const tabs = {
  'TabOne': TabOne,
  'TabTwo': TabTwo
}

onMounted(async () => { 
  let response = await fetch('https://jsonplaceholder.typicode.com/albums')
  response = await response.json()
  albums.value = response /* obtenemos albumes */
})

onErrorCaptured((err) => {
  console.log(err)
})
  

</script>

<template>

  <!-- ejemplo de paso de props y escucha de eventos a un componente -->
  <div>
    <h2><b>Albums</b></h2>
    <ul>
      <!-- bindeamos las props dinamicamente con v-bind (o su shorthand), esto es util cuando no sabemos el valor exacto que tenemos que pasar
      pero podemos pasar valores estáticos tranquilamente, por lo que ya no necesitaremos v-bind en ese caso
      Tambien podemos escuchar eventos provenientes del hijo, este hijo debe emitir dichos eventos (ver Album.vue) 
      esto nos permite escuchar eventos de los componentes hijos como si fuesen eventos nativos. -->
      <Album 
        v-for="album in albums.slice(0, 5)" 

        v-bind:title="album.title"
        v-bind:id="album.id"
        :userid="album.userId"
        staticValue="static"
        :fontSize="fontSize"

        v-on:increaseFont="fontSize++"
        v-on:decreaseFont="fontSize--"

        :key="album.id"
      >
        contenido insertado mediante {{ '<slot/>' }}
      </Album>
    </ul>

    <!-- Al igual que con los elementos HTML, suele resultar útil poder pasar contenido a un componente
    Este contenido puede representarse en el componente mediante el componente <slot/>, el contenido se renderizara en esa ubicacion
    (ver Album.vue)
      -->


    <!-- Componentes dinamicos: 
    A veces, es útil cambiar dinámicamente entre componentes, como en una interfaz con pestañas
    -->

    <div>
      <!-- se cargara un componente o otro, dependiendo lo que pasemos a :is -->
      <component v-bind:is="tabs[selectedTab]"/> <!-- usamos un objeto en conjunto con una ref, utlizando la sintaxis de acceso a propiedad mediante corchetes de JavaScript -->
      <button @click="selectedTab = 'TabOne'">Switch to TabOne</button>
      <button @click="selectedTab = 'TabTwo'">Switch to TabTwo</button>
      <!-- los componentes renderizados dinamicamente se montaran/desmontaran a medida que los seleccionemos o no
      podemos prevenir esto con el componente de Vue <KeepAlive/> -->
    </div>


    <!-- Advertencias sobre el parsing de elementos nativos del DOM y componentes de Vue -->
    <!-- 
      Si está escribiendo sus plantillas de Vue directamente en el DOM, 
      esto lleva a algunas advertencias debido al comportamiento de análisis HTML nativo de los navegadores. 
    -->

    <!--
    Cabe señalar que las limitaciones que se analizan solo se aplican si escribe sus templates directamente en el DOM. 
    NO se aplican si utiliza string templates de las siguientes fuentes:
      Single File Components (como es nuestro caso, por lo que estas advertencias no aplican en este proyecto)
      Cadenas de template en línea (por ejemplo, template: '...')
      <script type="text/x-template">
     -->

    <!-- En el enlace: https://vuejs.org/guide/essentials/component-basics.html#in-dom-template-parsing-caveats se encuentran dichas advertencias -->

  </div>
</template>

<style scoped>
</style>