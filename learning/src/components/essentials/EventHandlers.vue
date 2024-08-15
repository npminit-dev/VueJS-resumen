<script setup>
  import { ref } from 'vue'

  const value = ref('')
  const value2 = ref('')
  const value3 = ref('')
  const value4 = ref('')
  let swBg = ref(false)
  let swBg2 = ref(false)
  let mouseTest = ref(false)
  let key = ref('nokey')

  const value2InputHandler = (event, name) => {
    value2.value = event.target.value
    console.log(name, value2.value)
  }

  const value3InputHandler = (event) => {
    console.log(event.target.value)
    value3.value = event.target.value
  }

  const value4InputHandler = (name, event) => {
    value4.value = event.target.value
    console.log(name, event.target.value)
  }
</script>

<template>
  <div id="container">
    <!-- La directiva 'v-on' nos permite manejar eventos, su shorthand es '@'. Podemos acceder al evento pasando un argumento a la funcion
    este sera siempre el primer argumento
     -->

    <!-- manejador en linea --> 
    <label> 
      inline input handler
      <input type="text" v-on:input="(event) => value = event.target.value"> <!-- handler inline -->
    </label>

    <!-- manejador en linea pero definido como metodo fuera del template -->
    <label> 
      inline but defined input handler
      <input type="text" v-on:input="(evt) => value2InputHandler(evt, '2nd arg')"> <!-- handler method -->
    </label>

    <!-- manejador con metodo, el evento es pasado automaticamente -->
    <label> 
      method input handler
      <input type="text" v-on:input="value3InputHandler"> <!-- handler method -->
    </label>

    <label> 
      method input handler with event object
      <input type="text" v-on:input="(e) => value4InputHandler('jorgito', e)"> <!-- handler method -->
    </label>

    <p>first input value: {{ value }}</p>
    <p>second input value: {{ value2 }}</p>
    <p>third input value: {{ value3 }}</p>
    <p>fourth input value: {{ value4 }}</p>

    <br><hr><br>

    <!-- modificadores: diversas opciones de los eventos como 'capture' y 'once' estan disponibles en VueJS,
    deben concatenarse al nombre del evento mediante un punto, pueden encadenarse varios a la vez, el orden es importante
    -->

    <!-- 
      .stop
      .prevent
      .self
      .capture
      .once
      .passive
      .exact (restringe las condiciones para lanzar el evento para que se hagan especificamente en el orden y con las acciones especificadas)

      -- shorthands para el teclado:
      .enter
      .tab
      .delete (captures both "Delete" and "Backspace" keys)
      .esc
      .space
      .up
      .down
      .left
      .right

      -- shorthands de teclas del sistema:
      .ctrl
      .alt
      .shift
      .meta

      -- shorthands de teclas del mouse:
      .left
      .right
      .middle

    -->

    <label>
      Focus and press shift + enter to change background
      <input type="text" v-on:keypress.shift.enter="swBg = !swBg" v-bind:class="[{['keyshort']: swBg}, 'nokeyshort']">
    </label>

    <label>
      Focus and press shift + enter to change background (only once)
      <input type="text" v-on:keypress.shift.enter.once="swBg2 = !swBg2" v-bind:class="swBg2 ? 'keyshort' : 'nokeyshort'">
    </label>

    <div id="mousetest" 
      v-on:mouseenter.self="mouseTest = true" 
      v-on:mouseleave.self="mouseTest = false"
      v-bind:class="[mouseTest ? 'mouseinclass' : 'mouseoutclass']" class="mousebox"
      >hello world
    </div>

    <div>
      <label>
        Alt + arrow keys to see result
        <input
          @keyup.alt.up="key = 'up'"
          @keyup.alt.down="key = 'down'"
          @keyup.alt.left="key = 'left'"
          @keyup.alt.right="key = 'right'"
          v-bind:value="'key: ' + key"
          readonly
        />
      </label>
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

  .nokeyshort {
    background-color: aquamarine;
    color: black;
  }

  .keyshort {
    background-color: blue;
    color: white;
  }

  .mousebox {
    height: 300px;
    width: 300px;
  }

  .mouseoutclass {
    background-color: brown;
  }

  .mouseinclass {
    background-color: cadetblue !important;
  }

  hr {
    width: 100%
  }
</style>