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
import { ref, shallowRef } from 'vue';
import ReusableTransition from '../test_components/ReusableTransition.vue';
import TabOne from '../test_components/TabOne.vue';
import TabTwo from '../test_components/TabTwo.vue';

const shown = ref(true)
const shown2 = ref(true)
const shown3 = ref(true)
const shown4 = ref(true)
const shown5 = ref(true)
const shown6 = ref(true)
const shown7 = ref(true)

const page = ref(1)

const tab = shallowRef(TabOne)
const handleTabChange = () => {
  if(tab.value === TabOne) tab.value = TabTwo
  else tab.value = TabOne
}

const rotationDirection = ref('left')
const switchRotation = () => {
  if(rotationDirection.value === 'left') rotationDirection.value = 'right'
  else rotationDirection.value = 'left'
}

/* JavaScript hooks */
/* La funcion done() que se menciona en la documentacion no funciona bien, los JavaScript hooks son bastante dudosos en general */

function beforeEnter(el) {
  el.style.filter = 'opacity(0)'; 
}

function enter(el, done) { 
  setTimeout(() => {
    el.style.transition = 'all .5s ease-in-out';
    done()
  }, 0)
}

function afterEnter(el) { 
  el.style.filter = 'opacity(1)'; 
}

function beforeLeave(el) {
  el.style.filter = 'opacity(1)';
}
function leave(el, done) { 
  el.style.animation = 'fadein_right 500ms ease-in-out reverse forwards'
  done()
}
function afterLeave(el) {}

</script>

<template>

  <!-- Usando transiciones CSS -->
  <Transition name="appearing">
    <div v-show="shown"> <!-- Transition recibe solo 1 componente o nodo -->
      primera prueba
    </div>
  </Transition>
  <button @click="shown = !shown">toggle 1</button>
  <!-- El boton debe estar FUERA de Transition si no va a participar de la animacion -->

  <hr>
  <!-- ---------------------------------- -->

  <!-- usando animaciones CSS:
  Las animaciones CSS nativas se aplican de la misma manera que las transiciones CSS, 
  con la diferencia de que *-enter-from no se elimina inmediatamente después de insertar el elemento, 
  sino en un evento de animationend.

  Para la mayoría de las animaciones CSS, simplemente podemos declararlas en las clases *-enter-active y *-leave-active. 
  He aquí un ejemplo:
   -->
  <Transition name="appearing2">
    <div v-show="shown2">
      segunda prueba
    </div>
  </Transition>
  <button @click="shown2 = !shown2">toggle 2</button>

  <hr>
  <!-- ---------------------------------- -->

  <!-- Nombres personalizados para las clases de transicion, Esto es especialmente útil cuando 
  se desea combinar el sistema de transición de Vue con una biblioteca de animación CSS, como Animate.css. -->
  <Transition enter-active-class="entering" leave-active-class="exiting">
    <div v-show="shown3">
      tercera prueba
    </div>
  </Transition>
  <button @click="shown3 = !shown3">toggle 3</button>

  <hr>
  <!-- ---------------------------------- -->

  <!-- Usando transiciones de CSS y animaciones de CSS en conjunto -->

  <!-- Vue necesita adjuntar detectores de eventos para saber cuándo finalizó una transición. 
  Puede ser un evento 'transitionend' o un evento 'animationend', según el tipo de reglas CSS aplicadas. 
  Si solo está utilizando uno u otro, Vue puede detectar automáticamente el tipo correcto.

  Sin embargo, en algunos casos es posible que desee tener ambos en el mismo elemento, 
  por ejemplo, tener una animación CSS activada por Vue, junto con un efecto de transición CSS al pasar el mouse. 
  En estos casos, tendrás que declarar explícitamente el tipo a Vue pasando el atributo de tipo
  con un valor de 'animation' o 'transition': -->
  <Transition type="animation" name="composed">
    <!-- definimos el tipo como 'animation' para que Vue no interfiera con la transicion -->
    <div id="hovered" v-show="shown4">
      Prueba 4
    </div>
  </Transition>
  <button @click="shown4 = !shown4">toggle 4</button>

  <hr>
  <!-- ---------------------------------- -->

  <!-- Transiciones anidadas y duraciones de transiciones explícitas -->
  <!-- Aunque las clases de transición solo se aplican al elemento hijo directo en <Transition>, 
  podemos realizar la transición de elementos anidados usando selectores CSS anidados:-->

  <!-- 
  Podemos hacer que el elemento interno tenga un pequeño delay con respecto a la trancicion del componente raiz,
  sin embargo, esto crea un pequeño problema. De forma predeterminada, el componente <Transition> intenta determinar automáticamente cuándo 
  finaliza la transición escuchando el primer evento de 'transitionend o 'animationend' en el elemento raiz. 
  Con una transición anidada, el comportamiento deseado debe esperar hasta que hayan finalizado las transiciones/animaciones de todos los elementos internos.
  En tales casos, se puede especificar una duración de transición explícita (en milisegundos) utilizando la propiedad duration en el componente <transition>. 
  La duración total debe coincidir con el delay más la duración de la animacion del elemento interno -->
  <Transition name="nested" duration=1000 type="transition">
    <!-- La superposicion de todas las animaciones anidadas no debe ser mayor a 1000ms para evitar que se corte en algun punto, idealmente debe ser igual a 1000ms -->
    <div id="parent" v-show="shown5">
      <div id="child">
        prueba 5
      </div>
    </div>
  </Transition>
  <button @click="shown5 = !shown5">toggle 5</button>

  <!-- Consideraciones de rendimiento -->
  <!--
    Podemos notar que las animaciones que se muestran arriba utilizan principalmente propiedades como transform o filter. Estas propiedades son eficientes para animar porque:
    No afectan el diseño del documento durante la animación, por lo que no activan costosos cálculos de diseño CSS en cada cuadro de animación.
    La mayoría de los navegadores modernos pueden aprovechar la aceleración del hardware de la GPU al animar la transformación.
    En comparación, propiedades como la altura o el margen activarán el diseño CSS, por lo que son mucho más costosos de animar y debemos usarslos con precaución.
  -->

  <hr>
  <!-- ---------------------------------- -->

  <!-- Hooks para JavaScript -->
  <!--
    Podemos conectarse al proceso de transición con JavaScript escuchando eventos en el componente <Transition>.
    Cuando se utilizan transiciones solo de JavaScript, suele ser una buena idea agregar la propiedad :css="false". 
    Esto le dice explícitamente a Vue que omita la detección automática de transición CSS. 
    Además de tener un rendimiento ligeramente mayor, esto también evita que las reglas CSS interfieran accidentalmente con la transición:
  -->

  <!-- con v-bind:css="false" tomamos control completo del ciclo de vida de la animacion, 
  es recomendable usarlo para los casos en que solo usamos JavaScript para controlar la animacion -->
  <Transition 
    :css="false" 
    @before-enter="beforeEnter" 
    @enter="enter" 
    @after-enter="afterEnter"
    @before-leave="beforeLeave" 
    @leave="leave" 
    @after-leave="afterLeave"
  >
    <div v-show="shown6">
      Prueba 6
    </div>
  </Transition>
  <button @click="shown6 = !shown6">toggle 6</button>

  <hr>
  <!-- ---------------------------------- -->

  <!-- Transicion al aparecer -->
  <!--
    Podemos aplicar una animacion/transicion cuando un elemento es colocado en el DOM mediante la propiedad 'appear'
    nota: ademas, parece ser necesario definir el nombre de una clase llamada 'appear' explicitamente y definir la animacion para dicha clase dentro del tag <style></style>
    el nombre puede ser cualquier otro si quisieramos
  -->
  <Transition appear appear-active-class="appear">
    <div>Prueba 7</div>
  </Transition>

  <hr>
  <!-- ---------------------------------- -->

  <!-- Transiciones reusables -->
  <!--
    Las transiciones se pueden reutilizar a través del sistema de componentes de Vue. 
    Para crear una transición reutilizable, podemos crear un componente que envolveremos con <Transition> 
    y transmita la animacion a su hijo mediante <slot></slot>:
  -->
  <ReusableTransition>
    <div v-show="shown7">Prueba 8</div>
  </ReusableTransition>
  <button @click="shown7 = !shown7">toggle 7</button>

  <hr>
  <!-- ---------------------------------- -->

  <!-- Transiciones entre multiples elementos -->
  <!--
    ademas de con v-show y v-if, podemos renderizar condicionalmente varios elementos, uno a la vez, mediante v-if v-if-else y v-else, solo tenemos que asegurarnos de renderizar un elemento a la vez.
    En el ejemplo siguiente, los componentes o elementos que entran y salen están animados al mismo tiempo.
    Sin embargo, en algunos casos esto no es una opción o simplemente no es el comportamiento deseado. 
    Es posible que deseemos que el elemento que sale se anime primero y que el elemento que entra solo se inserte después de que haya finalizado la animación de salida. 
    Orquestar este tipo de animaciones manualmente sería muy complicado; 
    afortunadamente, podemos habilitar este comportamiento pasando el atributo 'mode' (ver test_component/ReusableComponent.vue)
  -->
  <ReusableTransition mode="out-in"> <!-- pasando el valor como prop, que la aplicara al componente Transition -->
  <!-- out-in: se espera a terminar la animacion del elemento de salida y luego se comienza la animacion del de entrada  -->
  <!-- in-out: se espera a terminar la animacion del elemento de entrada y luego se comienza la animacion del de salida   -->
    <div v-if="page === 1">Page 1</div>
    <div v-if="page === 2">Page 2</div>
    <div v-if="page === 3">Page 3</div>
    <div v-if="page === 4">Page 4</div>
  </ReusableTransition>
  <span>
    <button @click="page--" :disabled="page === 1">prev</button>
    <button @click="page++" :disabled="page === 4">next</button>
  </span>

  <hr>
  <!-- ---------------------------------- -->

  <!-- Transicion entre componentes -->

  <!-- Podemos renderizar condicionalmente componentes mediante el atributo is y el componente de Vue <component></component>.
  Utilizando dinamicamente este atributo mediante v-bind podremos renderizar un componente u otro y si estan dentro de un transition, animarlos
  al entrar o salir del DOM
  -->
  <ReusableTransition mode="out-in">
    <component v-bind:is="tab"></component>
  </ReusableTransition>
  <button @click="handleTabChange">toggle tab</button>


  <!-- 
    Cuando los componentes se desmonan al ser renderizados condicionalmente, estos se desmontan del DOM y son destruidos,
    por lo que el estado interno de los mismos se pierde. Podremos arreglar esto en el archivo dedicado al componente <KeepAlive></KeepAlive> 
  -->

  <hr>
  <!-- ---------------------------------- -->

  <!-- Transiciones dinámicas -->

  <!-- podemos establecer la propiedad 'name' de las transiciones dinamicamente para usar diferentes transiciones para un elemento/componente dependiendo de 
  un estado, ayudandonos con v-bind. Es fundamental que incluyamos el atributo 'key', preferiblemente pasamos como valor el propio estado que cambia
  la transicion para obligar a Vue a hacer un re-render y la nueva animacion se aplique, de otra manera lo unico que cambiara sera el texto en este caso -->
  <Transition :name="rotationDirection" type="animation">
    <div :key="rotationDirection"> <!-- key nos asegurara que las animaciones nuevas se apliquen -->
      {{ rotationDirection === 'left' ? 'Ready to rotate right' : 'Ready to rotate left' }}
    </div>
  </Transition>
  <button @click="switchRotation">toggle</button>

</template>


<style scoped>
/* ----1---- */

.appearing-enter-from {
  filter: opacity(0);
}

.appearing-enter-active {
  /* esta clase nos permite añadir delay, duracion, easing curves y demas a la animacion de entrada */
  transition: all .5s ease-in-out;
}

.appearing-enter-to {
  filter: opacity(1);
}

.appearing-leave-from {
  filter: opacity(1);
}

.appearing-leave-active {
  /* esta clase nos permite añadir delay, duracion, easing curves y demas a la animacion de salida */
  transition: all .5s ease-in-out;
}

.appearing-leave-to {
  filter: opacity(0);
}

/*-----2-----*/

.appearing2-enter-active {
  animation: fadein_left .5s ease-out forwards;
}

.appearing2-leave-active {
  animation: fadein_left .5s ease-in reverse forwards;
}

/* ----3---- */

.entering {
  animation: fadein_left 1s ease-in-out forwards;
}

.exiting {
  animation: fadein_left 1s ease-in-out reverse forwards;
}

/* ----4---- */

#hovered {
  transition-duration: 300ms;
  cursor: pointer;
}

#hovered:hover {
  background-color: #333;
  color: #f5f5f5;
}

.composed-enter-active {
  animation: fadein_right 1s ease-in-out forwards;
}

.composed-leave-active {
  animation: fadein_left 1s ease-in-out 100ms reverse forwards;
}

/* ---- 5 ---- */

#child {
  color: #333;
  font-weight: bolder;
  font-size: 18px;
  height: fit-content;
  width: fit-content;
}

#parent.nested-enter-from {
  filter: opacity(0);
  transform: translateX(30px) rotateZ(180deg);
}

#parent.nested-enter-active {
  transition: all 1s ease-in-out;
}

#parent.nested-enter-to {
  filter: opacity(1);
  transform: translateX(0) rotateZ(0);
}

#parent.nested-leave-from {
  filter: opacity(1);
  transform: translateX(0) rotateZ(0);
}

#parent.nested-leave-active {
  transition: all 1s ease-in-out;
}

#parent.nested-leave-to {
  filter: opacity(0);
  transform: translateX(-30px) rotateZ(-180deg);
}

.nested-enter-active #child {
  filter: opacity(0);
  animation: fadein_right 500ms ease-in-out 500ms forwards
}

.nested-leave-active #child {
  filter: opacity(1);
  animation: fadein_right 500ms ease-in-out 500ms reverse forwards
}

/* ---- 6 ---- */

.appear {
  animation: fadein_left 2s ease-in-out forwards;
}

/* ---- 7 ---- */
.left-enter-active {
  animation: rotate 650ms ease-in reverse forwards
}

.right-enter-active {
  animation: rotate 650ms ease-out forwards
}


/* animaciones */

@keyframes fadein_left {
  from {
    transform: translateX(-30px);
    filter: opacity(0);
  }

  to {
    transform: translateX(0);
    filter: opacity(1);
  }
}

@keyframes fadein_right {
  from {
    transform: translateX(60px);
    filter: opacity(0);
  }

  to {
    transform: translateX(0);
    filter: opacity(1);
  }
}

@keyframes rotate {
  from {
    transform: rotateZ(0)
  }
  to {
    transform: rotateZ(360deg)
  }
}

/* general */

div,
article {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
  width: 150px;
}

div {
  background-color: cadetblue;
}

article {
  background-color: darkolivegreen;
}

article>article {
  background-color: darkgreen;
}

button {
  display: block;
}

hr {
  margin: 5px 0;
}
</style>