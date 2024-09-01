<script setup>
import Apartment from '../test_components/Apartment.vue';
import Slotable from '../test_components/Slotable.vue';
import MultiSlotable from '../test_components/MultiSlotable.vue';
import ScopedSlots from '../test_components/ScopedSlots.vue';
import FancyList from '../test_components/FancyList.vue';
import { ref } from 'vue';

const page = ref('aside')
const switchPage = () => page.value = page.value === 'aside' ? 'asideleft' : 'aside'

</script>

<template>

  <!-- Slots -->

  <!-- Hasta ahora solo hemos usado componente sin tags de cierre, es decir tal que asi: <compontent/>  
  que pasa si quiero pasar texto, html, componentes, o una mezcla de ellos, al componente para que los renderice?
  en que parte del template del componente se renderizara este contenido? aqui es donde entra en juego el tag nativo de Vue <slot/>
  y los tags de apertura y cierre de los componentes. (ver test_components/Slot.vue)
  -->

  <Slotable/> <!-- componente que muestra contenido por defecto -->

  <Slotable> <!-- componente que renderiza HTML en su interior -->
    <h4>hello world</h4>
  </Slotable>

  <Slotable>
    hi! how are you? <!-- componente que renderiza texto en su interior -->
  </Slotable>

  <Slotable>
    <Apartment class="apartment_override"/> <!-- componente que renderiza otro componente en su interior -->
  </Slotable>

  <Slotable>
    <Apartment class="apartment_override"/> 
    <div>hello world</div> <!-- pueden renderizarse mas de un elemento, pero siempre se ubicara en el mismo <slot/> dentro del componente -->
  </Slotable>

  <br><br>

  <!-- Slots multiples:
    En estos ejemplos, los componentes solo tenian un <slot/> dentro, por lo que solo podiamos colocar el contenido en una ubicacion
    esto se soluciona usando slots nombrados (propiedad 'name'), y, en el padre, la directiva v-slot o su shorthand # dentro de templates
  -->

  <MultiSlotable/> <!-- con contenido por defecto -->

  <br><br>

  <MultiSlotable>
    <template v-slot:navigation>
      <div>
        <h3>HOME</h3>
        <h3>SHOP</h3>
        <h3>ABOUT US</h3>
      </div>
    </template>

    <template v-slot:default>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur atque temporibus officiis. 
        Deserunt hic ad dolorum quibusdam quis. Accusantium atque id exercitationem voluptatum non numquam quo! 
        Sunt architecto repellendus explicabo praesentium nesciunt, vero iure alias harum. 
        Magnam aliquam velit in ab itaque dicta accusamus necessitatibus laborum, 
        labore impedit laboriosam temporibus sed voluptatem nesciunt quibusdam inventore numquam repellat. 
        Saepe quae, iure inventore eveniet voluptates ratione voluptatem, commodi rem architecto et ipsum dignissimos quo nulla distinctio ut,
        obcaecati voluptas aperiam provident animi omnis incidunt. Minima accusantium perferendis aut laudantium eaque quae odit labore error deserunt. Nihil, recusandae beatae. Consectetur hic laborum quaerat?
      </p>
    </template>

    <template v-slot:footer>
      <h3>footer</h3>
    </template>
  </MultiSlotable>

  <br><br>

  <MultiSlotable> <!-- usando shorthands para los slots -->
    <template #navigation>
      header
    </template>

    <!-- todos los elementos de nivel superior (que estan en la raiz del arbol de componentes) que no esten el un template con v-slot
    estan implicitamente en el slot sin nombre (o el slot con name 'default') -->
    <h4>title</h4>
    <h5><sub>subtitle</sub></h5>
    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Est odit odio unde cupiditate repellendus voluptatibus ipsum molestias ad ut eveniet!</p>

    <template #footer>
      footer
    </template>

  </MultiSlotable>

  <br><br>

  <!-- Renderizado condicional de slots: a veces podemos necesitar renderizar elementos o no dependiendo de si se ha pasado un slot o no 
  desde el padre, en ese caso podemos usar v-if con la variable $slots (ver test_components/MultiSlotable.vue)
   -->

  <MultiSlotable>
    <template v-slot:aside> <!-- solo si este slot es pasado se renderizara algo en ese lugar -->
      <aside>
        non-related content
      </aside>
    </template>
  </MultiSlotable>

  <br><br>

  <!-- Nombre dinamico de slots: podemos cambiar dinamicamente el nombre de un slot mediante un valor reactivo -->

  <MultiSlotable>
    <template v-slot:[page]> <!-- podremos renderizar un slot o otro -->
      <aside>
      {{ page === 'aside' ? 'Page 1 content' : 'Page 2 content' }}
      </aside>
      <button @click="switchPage">change page</button>
    </template>
  </MultiSlotable>

  <br><br>

  <!-- Scoped slots -->

  <!--
  El contenido del slot no tiene acceso a los datos del componente hijo. 
  Las expresiones en las plantillas de Vue solo pueden acceder al alcance en el que están definidas, 
  de acuerdo con el alcance léxico de JavaScript. En otras palabras:

  Las expresiones en la plantilla padre solo tienen acceso al ámbito padre; 
  Las expresiones en la plantilla hija solo tienen acceso al ámbito hijo.

  Sin embargo, hay casos en los que podría resultar útil que el contenido de un slot pueda utilizar datos tanto del ámbito padre como del ámbito hijo. 
  Para lograrlo, necesitamos una forma para que el hijo pase datos a un slot al renderizarlos.
   -->

  <!-- la forma de hacer esto con slot no nombrados y no nombrados es un poco diferente, vamos con el primer caso  -->
  <ScopedSlots v-slot="scopedProps"> <!-- las props pasadas a slot desde el hijo se reciben en v-slot, puede desestructurarse si quisieramos -->
    <h3>Count: {{ scopedProps.count }}</h3>
    <button @click="scopedProps.increment">increment</button>
    <!-- aqui tenemos un scope donde las props pasadas a slot por el hijo pueden ser usadas por el padre! -->
  </ScopedSlots>

  <br><br>

  <!-- con slot nombrados: -->
  <ScopedSlots>
    <template v-slot:named1="props">
      <h4>{{ props.productName }}</h4>
      <h3><sub>{{ props.price }}</sub></h3>
    </template>
    <!-- En caso de querer pasar contenido a un slot sin nombre (default), el uso implicito del slot sin template ya no sirve, 
    deberemos usar un template con v-slot="default" obligatorio, Esto es para evitar cualquier ambigüedad 
    sobre el scope de las props del slot predeterminado:  

    <div> Esto NO se interpretara como el slot sin nombrar o 'default'!!!!
      <p>hello world</p>
    </div>

    esto si: -->
    <template v-slot:default="{ count, increment }"> <!-- aprovechamos para mostrar la desestructuracion de props -->
      <h3>Count: {{ count }}</h3>
    <button @click="increment">increment</button>
    </template>
  </ScopedSlots>

  <br>

  <!-- Quizás te preguntes cuál sería un buen caso de uso para los scoped slots. 
  Aquí hay un ejemplo: imagine un componente <FancyList> que representa una lista de elementos; 
  puede encapsular la lógica para cargar datos remotos, usar los datos para mostrar una lista o incluso funciones avanzadas como paginación o desplazamiento infinito. 
  Sin embargo, queremos que sea flexible en cuanto al aspecto de cada elemento y dejar el estilo de cada elemento al componente principal que lo consume. -->
  <FancyList :limit="10">
    <template v-slot:item="{ title, price, category }">
      <div>
        <h4>{{ title }}</h4>
        <h5>{{ price }}</h5>
        <h6>{{ category }}</h6>
      </div>
    </template>
  </FancyList>
  <!-- Dentro de <FancyList>, podemos representar el mismo <slot> varias veces con diferentes datos de elementos 
  (observe que estamos usando v-bind para pasar un objeto como props de slot, ver test_components/FancyList.vue): -->

  <!-- Si llevamos este concepto un poco más allá, podemos crear componentes que solo encapsulan la lógica y no representan nada por sí mismos: 
  la salida visual se delega completamente al componente consumidor con scoped slots. 
  A este tipo de componente lo llamamos componente 'renderless': -->

  <!-- 
  <MouseTracker v-slot="{ x, y }">
    Mouse is at: {{ x }}, {{ y }}
  </MouseTracker> este componente solo procesaria las coordenadas del mouse, enviandosela al padre mediante slot scopes
  -->

  <!--
  Si bien es un patrón interesante, la mayor parte de lo que se puede lograr con los componentes 'renderless' se puede lograr de una manera más eficiente con la Composition API, 
  sin incurrir en la sobrecarga del anidamiento de componentes adicionales. Más adelante veremos cómo podemos implementar la misma funcionalidad de seguimiento del mouse con Composable.
  Dicho esto, los slot scopes siguen siendo útiles en los casos en los que necesitamos encapsular la lógica y componer la salida visual desde el padre, como en el ejemplo <FancyList>.
  -->

</template>

<style scoped>
  .apartment_override {
    font-size: 10px;
    height: 100%;
    width: 100%;
  }

  h3 {
    display: inline;
    margin: 0 10px
  }

  aside {
    background-color: #f1f1f1;
    color: #333;
  }
</style>