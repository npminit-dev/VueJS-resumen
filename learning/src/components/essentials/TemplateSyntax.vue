<!-- 
  Este tipo de componentes es un SFC (single file component), 
  un archivo que contiene la lógica, las etiquetas y estilos de un componente, es lo mas comun cuando se usan
  builds y no se usa Vue mediante CDN's.
  Ademas, este tipo de componente usa la sintaxis de Composition API, el tipo de componente que ofrece mas flexibilidad y reusabilidad.
  Existe ademas la sintaxis de la Options API, mas agradable para los principiantes, y escrita por encima de la Composition API.
-->

<!-- COMPOSITION API component:  -->

<!-- script tag + setup: aqui se importan los modulos requeridos para el componente y la lógica de JavaScript -->
<script setup>

  import { ref } from 'vue'
  const count = ref(0) // <- un ref es algo similar a un useState
  const contenteditable = true
  const disabled = true
  const attrs = {
    type: 'text',
    pattern: '/^.+$/',
    required: true
  }
  const showName = () => {
    return 'my name is Jorge Balsamo'
  }
  const shown = ref(false)
  const propiedad = 'href'
  const url = 'www.google.com'
  const onDirectiveSwitch = ref(1)
  const submit = (value) => console.log(value)

</script>

<!-- template: la porcion de html devuelta por el componente, con los bindings a los estados del componentes definidos arriba, si los hubiese -->
<template>
  <div id="counter_container">
    <h1>Counter</h1>

     <!-- interpolacion de texto con {{  }}, esto es reactivo conforme el estado cambie -->
    <h2>number of counts: <span>{{ count }}</span></h2> 

    <!-- mostrando datos: directiva v-html, el contenido del texto del span reacciona a los cambios de count  -->
    <h2>square of counts: <span v-html="count**2"></span></h2>
    <!-- la directiva v-html es sensible a ataques XSS (asi como innerHTML), solo hay que usarlo en contenido confiable y nunca en inputs de usuario por ejemplo -->

    <!-- los eventos se llaman con @, se incrementa mediante string -->
    <button @click="count++">increment</button> 

    <br>
    <br>

    <!-- binding dinamico de atributos html: usando la directiva v-bind:id="estado", o su shorthand id:"estado" -->
    <p v-bind:class="count + 'word'" :id="count+Math.random()">Este {{ '<p></p>' }} cambia su class e id dinamicamente</p>

    <!-- binding dinamico de atributos html (same name): si el estado tiene el mismo nombre que el atributo html, puede usarse otro shorthand -->
    <p :contenteditable>Este parrafo hace lo mismo que el de arriba, pero el binding con el shorthand 'same name'</p>

    <!-- binding de atributos html booleans: si el valor del estado/variable es truthy, el atributo se incluye -->
    <button v-bind:disabled="disabled">Disabled by v-bind</button>

    <!-- binding de atributos multiples con un objeto de JS -->
    <form>
      <input v-bind="attrs"> <!-- se utiliza v-bind sin argumentos de propiedad -->
      <button type="submit">send</button>
    </form>

    <!-- uso de expresiones de JavaScript -->
    <span>{{ Date.now() }} miliseconds since Unix time</span>
    <span>{{ [1,2,3,4].reduce((acc, curr) => acc += curr, 0) }}</span>

    <!-- binding segun llamada a funciones: estas funciones se llamaran cada vez que el componente actualice su estado, por lo que deben ser puras -->
    <input type="text" v-bind:value="showName()"></input>

    <!-- directiva v-if: muestra el elemento de la directiva dependiendo del valor o la expresion booleana -->
    <button @click="shown = !shown">show</button>
    <p v-if="shown">parrafo renderizado condicionalmente mediante v-if</p>

    <!-- argumentos para directivas: los argumentos para una directiva, como ya se vio antes, van luego del nombre y ':', ej: v-bind:class='somevalue' -->
    
    <!-- argumentos dinamicos: se pueden agregar argumentos dinamicos con corchetes, usando alguna exresion o estado que guarde el nombre de la propiedad html -->
    <a v-bind:[propiedad]="url">GOOGLE</a> <!-- en este caso es 'href' -->
    <!-- el valor deben ser un string, o la expresion debe resolverse en string -->

    <!-- directiva v-on: maneja eventos, su shorthand es @ -->
    <button v-on:click="onDirectiveSwitch = 2">v-on normal</button>
    <button @click="onDirectiveSwitch = 1">v-on shorthand</button>
    <h1 v-show="onDirectiveSwitch===1">shorthand</h1>
    <h1 v-show="onDirectiveSwitch===2">normal</h1>

    <!-- modificadores: son valores especiales que van despues de las directivas y se separan con puntos -->
     <form v-on:submit.prevent="submit('sended')"> <!-- previene el comportamiento por defecto y luego ejecuta el console.log -->
        <input type="text" required>
        <button type="submit">send</button>
     </form>
  </div>

</template>

<style scoped>
  #counter_container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>