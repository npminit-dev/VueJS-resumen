
<!-- Enlazado de clases y estilos --> 

<!-- Pueden enlazarse estados y valores a las propiedades 'class' y 'styles' con v-bind, 
 pero, al recibir solo strings, es propenso a errores sobre todo cuanto tratamos de manipular esos strings mediante JavaScript, 
 Vue trata especialmente estas propiedades  -->

<script setup>
  import { ref, computed, reactive } from 'vue'
  const isActive = ref(false)
  const isDisabled = ref(true)

  function switchStatus() {
    isActive.value = !isActive.value
    isDisabled.value = !isDisabled.value
  }

  const classes = computed(() => ({
    active: isActive.value,
    disabled: isDisabled.value
  }))

  const greenClass = ref('green_colored')
  const brownClass = ref('brown_letter')

  const styles = reactive({
    backgroundColor: 'yellow',
    color: 'black'
  })

  /* prueba */
  const author = ref({
    name: 'Michael Phelps',
    registered: true,
    registerData: {
      dni: 45973732,
      civilStatus: 'married'
    },
    books: [
      'There was a time',
      'My house is a mess'
    ],
    italic: false
  })

  const fSize = ref(10)

  const style = reactive({
    color: 'aquamarine',
    'font-size': '25px'
  })

  const overrideStyle = reactive({
    color: 'yellow',
    border: '1px solid red'
  })

</script>

<template>
  <div id="container">
    <div>
      <!-- con class es posible pasar objetos, en este caso la inclusion de 'active' dependera de la veracidad del valor 'isActive'  -->
      <!-- es compatible con la propiedad 'class' por defecto, por lo que pueden usarse ambas sin miedo a errores -->
      <div class="div another_class" v-bind:class="{ active: isActive, disabled: isDisabled }"> <!-- Uso de v-bind:class y class -->
        {{ isActive ? 'ACTIVE' : 'NON-ACTIVE' }}
      </div>
      <br>
      <!-- el objeto no tiene porque ser un objeto en linea, puede ser un valor computado, o un estado con forma de objeto, o un objeto sin mas (que obviamente no sera reactivo)  -->
      <div class="div another_class" v-bind:class="classes">
        {{ isActive ? 'ACTIVE' : 'NON-ACTIVE' }}
      </div>
      <button @click="switchStatus()">switch classes</button>

      <br>
      <br>

      <!-- bindear arreglos de clases --> 
      <div :class="[greenClass, brownClass]">hello world</div>
      <!-- bindear condicionalmente elemento de un arreglo  -->
      <div :class="[isActive ? greenClass : '', brownClass]">hello world</div>
      <!-- lo de arriba se puede hacer mas facil combinando objetos con arreglos, pero hay que envolver la propiedad entre corchetes -->
      <div :class="[{ [greenClass]: isActive }, brownClass]">hello world</div>

      <br>
      <br>

      <!-- bindeando a la propiedad 'style' -->
      <!-- se soporta camelcase, asi como kebab-case (el estilo predeterminado de css) -->
      <div v-bind:style="{ backgroundColor: 'red', color: 'white' }">hello world</div>
      <div v-bind:style="{ 'background-color': 'blue', color: 'white' }">hello world</div>
      <!-- tambien se pueden poner por supuesto, valores computados, estados, y objetos planos -->
      <div v-bind:style="styles">hello world</div>

      <br>
      <br>

      <!-- Prueba -->
      <div id="test_container" v-bind:class="[author.registered ? 'registered' : 'notRegistered', 'someclass', {['italic']: author.italic}]">
        <h1>{{ author.name }}</h1>
        <div v-if="author.registered">
          <h2>{{ author.registerData.dni }}</h2>
          <h2>{{ author.registerData.civilStatus }}</h2>
        </div>
        <p>number of books: {{ author.books.length }}</p>
        <button @click="author.registered = !author.registered">switch state</button>
        <button @click="author.italic = !author.italic">switch text style</button>
      </div>

      <div>
        <!-- esto tambien puede hacerso logicamente con un objeto reactivo o no -->
        <h1 :style="{ fontSize: fSize + 'px' }">variable font size</h1>
        <button @click="fSize++">increment</button>
        <button @click="fSize--">decrement</button>
      </div>

      <br>
      <br>

      <!-- fusion de objetos style, usando arreglos -->
      <div :style="[style, overrideStyle]">hello world</div>

    </div>

    <!-- prefijos de propiedades CSS: Vue añade automaticamente los prefijos para la compatibilidad entre navegadores, como -webkit etc  -->
  </div>
</template>

<style scoped>
  #container {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .div {
    background-color: aquamarine;
    color: #333;
  }

  .active {
    background-color: blue;
    color: #f5f5f5;
  }

  .disabled {
    filter: drop-shadow(2px 2px 2px white)
  }

  .another_class {
    border: 1px solid #f5f5f5
  }

  .green_colored {
    background-color: green;
  }

  .brown_letter {
    color: brown;
  }

  #test_container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .someclass {
    padding: 10px;
    border: 1px solid white;
    color: white;
  }

  .registered {
    background-color: green;
  }

  .notRegistered {
    background-color: brown
  }

  .italic {
    font-style: italic;
  }

</style>