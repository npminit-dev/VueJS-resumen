<script setup>

  /* Para tipar las props se usan las funciones contructoras de los distintos tipos en JavaScript */
  /* al definir las props como un objeto, podemos validarlas de la siguiente forma */

  const props = defineProps({
    /* los tipos null/undefined aceptaran cualquier tipo */
    additionalData: null,

    /* tipo string */
    productName: String,

    /* multiples tipos posibles */
    productInternalCode: [String, Number],

    /* prop obligatoria */
    productId: {
      type: Number,
      required: true
    },

    /* prop obligatoria pero con posible valor null */
    category: {
      type: [String, null],
      required: true
    },

    /* prop con valor por defecto */
    stock: {
      type: Number,
      default: 0
    },

    /* Los valores por defecto para props que son arrays u objetos 
    deben definir a default como una funcion que puede recibir las props como argumento (en este caso default es una 'factory function') */
    manufacturer: {
      type: Object,
      default(props) {
        console.log(props)
        return { name: 'Unknown', id: null }
      }
    },

    /* validador personalizado */
    distributor: {
      type: String,
      validator(value, props) { /* recibe el valor de la props como primer argumento, y todas las props como segundo argumento */
        return [ "GlobalSupplies Inc.", "DistribuTech", "MegaWarehouse", "PrimeSource", "FastTrack Suppliers"]
          .includes(value) /* la prop es valida si se encuentra dentro del arreglo, la funcion validadora debe devolver un boolean */
      }
    },

    /* props tipo funcion con valor por defecto */
    greetings: {
      type: Function,
      /* A diferencia del valor predeterminado de objetos o arrays, esto no es una 'factory function', 
      esta es una función que sirve como valor predeterminado */
      default(name) { 
        return `Hello ${name}!!! how are you going?`
      }
    },

    /* usando clase personalizada para validar */
    registrant: {
      type: Registrant,
      default() {
        return new Registrant('Boos', '#0000')
      }
    }
  })

/* Advertencia: El código dentro del argumento defineProps() no puede acceder a otras variables declaradas en <script setup>, 
porque la expresión completa se mueve al scope de una función externa cuando se compila. */

/* Detalles adicionales: 
  - Todos las props son opcionales de forma predeterminada, a menos que 'required' se especifique como true.
  - Una prop opcional ausente que no sea booleana tendrá valor undefined.
  - Las props booleanos ausentes se convertirán en false. Puede cambiar esto estableciendo un valor predeterminado, es decir, default: undefined para que se comporte como una prop no booleana.
  - Si se especifica un valor predeterminado, se usará si el valor de propiedad resuelto no está definido; 
  esto incluye cuando la propiedad está ausente o cuando se pasa un valor undefined explícito.
  - Cuando falla la validación de props, Vue generará una advertencia en la consola (si estamos en modo de desarrollo).
*/

/* Tambien podemos usar clases propias para validar tipos, Vue internamente usara 'instanceof' para validar,
pero como se dijo en las advertencias, no podemos definir la clase aqui porque defineProps no puede acceder al ambito donde fue definido,
la solucion (segun los errores en consola) es definir un tag script corriente y mover la definicion de la clase ahi
*/

/* Casting de booleans:
  Las props con tipo Boolean tienen reglas de conversión especiales para imitar el comportamiento de los atributos booleans nativos. 
  En caso de que tengamos una prop de tipo boolean, al renderizar un componente que requiera esas props, 
  el valor true/false puede determinarse con la presencia/ausencia del nombre de la prop (similar al atributo 'required' de los inputs de HTML)

  Cuando una prop puede ser de multiples tipos y uno se esos tipos es boolean, las mismas reglas de casting de booleans se aplica.
  Pero existe un caso especial: cuando la prop puede ser de tipo String o Boolean, y String esta definido antes que Boolean,
  en dicho caso la ausencia de la prop no sea casteada a false, sino a string vacio.*/
</script>

<script> 
class Registrant { /* definicion de clase en un tag script aparte, para que defineProps pueda acceder a ella */
  constructor(name, employeeId) {
    this.name = name;
    this.employeeId = employeeId
  }
}
</script>

<template>
  <article>
    <div class="header">
      <h2>{{ props.productName }}</h2>
      <div class="header_sub">
        <h5>{{ props.category }}</h5>
        <h5>{{ props.manufacturer.name }}</h5>
      </div>
    </div>
    <div class="body">
      <h4><b>Stock:</b> {{ props.stock }}</h4>
      <h4><b>Distributor:</b> {{ props.distributor }}</h4>
      <h4><b>Registrant:</b> {{ props.registrant.name }}</h4>
    </div>
    <button @click="console.log(props.greetings('Micaela'))">greetings</button>
  </article>
</template>

<style scoped>
  article {
    width: fit-content;
    padding: 15px 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px dashed gray;
    font-weight: lighter;
    border-radius: 10px;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: normal;
    padding: 0;
  }

  b {
    font-weight: bold;
  }

  .header {
    display: flex;
    align-items: start;
    justify-content: center;
  }

  .header_sub {
    display: flex;
    flex-direction: column;
    align-items: end;
    justify-content: center;
    margin-left: 10px;
  }

  .body {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 10px 0;
  }

  button {
    margin: 15px 0 5px 0;
  }


</style>