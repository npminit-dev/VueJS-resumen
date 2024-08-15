
<script setup>
import { computed, ref } from 'vue';

const nombre = ref('')
const apellido = ref('')
const presentacion = ref('Escriba una presentacion')
const profile = ref([])
const maintec = ref('NestJS')
const province = ref('')
const travelAvailable = ref('N')
const isArgentinian = ref('SI')
const documentation = ref('')
const inmediateStart = ref({ puede: 'no' })

const profileConcat = computed(() => (profile.value.reduce((acc, curr) => acc += ` ${curr} -`, '-')))

function submit() {
  console.clear()
  console.log('Nombre: ' + nombre.value)
  console.log('Apellido: ' + apellido.value)
  console.log('Presentacion: ' + presentacion.value)
  console.log('PerfilIt: ' + profileConcat.value)
  console.log('TecnologiaPrincipal: ' + maintec.value)
  console.log('Provincia: ' + province.value)
  console.log('DisponibilidadParaViajar: ' + travelAvailable.value)
  console.log('NacionalidadArgentina: ' + isArgentinian.value)
  console.log('Documentacion: ' + documentation.value)
  console.log('PuedeComenzarYa: ' + inmediateStart.value.puede)
}

const selectData = [
  {
    text: 'Tenes disponibilidad para viajar?',
    value: null,
    disabled: true
  },
  {
    text: 'SI',
    value: 'S',
    disabled: false
  },
  {
    text: 'NO',
    value: 'N',
    disabled: false
  }
]

</script>

<template>
  <div> 
    <!-- Una palabra muy usada en esta seccion es la palabra 'binding', que significa 'enlace' o 'union', 
    es un enlace o union entre el estado de un componente y algun input/checkbox/textarea que tiene doble sentido:
    el input/checkbox/textarea refleja el estado del componente, y ademas este input/checkbox/textarea permite cambiar dicho estado,
    es una relacion bidireccional
     -->
    <form @submit.prevent="submit">
      <label>
        Nombre
        <!-- El binding mas tipico entre el estado de la aplicacion y un input suele ser asi: -->      
        <input 
          :value="nombre"
          @input="(e) => nombre = e.target.value"
          type="text" 
          placeholder="Juan"
        >
      </label>
      <label>
        Apellido
        <!-- Vue simplifica esto con la directiva v-model, sirve tanto para inputs como checkbox, selects, textarea y demas -->
        <!-- usara, bajo el capo, la propiedad que almacene el valor del input (value para inputs, checked para checkbox etc) -->
        <input 
          type="text" 
          v-model="apellido" 
          placeholder="García"
        />
      </label>

        <!-- v-model ignorará el valor inicial, los atributos value, checked o selected que se encuentran en cualquier elemento del formulario. 
        Siempre tratará el estado actual de JavaScript vinculado como la fuente de la veracidad ciertos estados. 
        Debe declarar el valor inicial en el lado de JavaScript, utilizando las API's de reactividad. -->

        <!-- Para los idiomas que requieren un IME (chino, japonés, coreano, etc.), v-model no se actualiza durante la composición del IME. 
        Si también queremos responder a estas actualizaciones, deberemos utilizar nuestro propio detector de eventos de entrada y enlace de valores en lugar de utilizar v-model.-->

      <!-- ejemplo v-model para textarea --> 
      <label>
        Presentacion
        <textarea @input.self="(e) => presentacion = e.target.value">{{ presentacion }}</textarea>
      </label>

      <!-- ejemplo v-model para checkboxes. Puede bindearse un estado en forma de arreglo a los checkboxes relacionados, 
      y la propiedad 'value' de esos checkboxes sera añadido al arreglo cuando estos esten en estado 'checked'-->

      <fieldset>
        <legend>Perfil IT</legend>
        <label>
          Dev FullStack
          <input type="checkbox" title="Dev FullStack" value="Dev FullStack" v-model="profile">
        </label>
        <label>
          Dev FrontEnd
          <input type="checkbox" title="Dev FrontEnd" value="Dev FrontEnd" v-model="profile">
        </label>
        <label>
          Dev BackEnd
          <input type="checkbox" title="Dev BackEnd" value="Dev BackEnd" v-model="profile">
        </label>
        <label>
          QA
          <input type="checkbox" title="QA" value="QA" v-model="profile">
        </label>
      </fieldset>

      <!-- Ejemplo de v-model para inputs 'radio', se bindean todos los radio a un estado en forma de string 
      que llevara el valor del radio seleccionado -->

      <fieldset>
        <legend>Tecnología principal</legend>
          <label>
            NestJS
            <input type="radio" name="NestJS" title="NestJS" value="NestJS" checked v-model="maintec">
          </label>
          <label>
            React
            <input type="radio" name="React" title="React" value="React" v-model="maintec">
          </label>
          <label>
            ExpressJS
            <input type="radio" name="ExpressJS" title="ExpressJS" value="ExpressJS" v-model="maintec">
          </label>
          <label>
            Jest
            <input type="radio" name="Jest" title="Jest" value="Jest" v-model="maintec">
          </label>
      </fieldset>

      <!-- Ejemplo de v-model para select -->
      <label>
        Provincia
        <select v-model="province">
          <!--
          Si el valor inicial de su expresión de v-model no coincide con ninguna de las opciones, el elemento <select> se representará en un estado "no seleccionado". 
          En iOS, esto hará que el usuario no pueda seleccionar el primer elemento porque iOS no activa un evento 'change' en este caso. 
          Por lo tanto, se recomienda proporcionar una opción deshabilitada con un valor vacío, como se demuestra aqui debajo. -->
          <option disabled value="">Seleccione donde reside</option>
          <option>Buenos Aires</option>
          <option>Entre Rios</option>
          <option>Cordoba</option>
          <option>La Pampa</option>
        </select>
      </label>

      <!-- Ejemplo de v-model para un select renderizado dinamicamente -->
      <label>
        Disponibilidad para viajar
        <select v-model="travelAvailable">
          <option v-for="option in selectData" v-bind:disabled="option.disabled" v-bind:value="option.value">{{ option.text }}</option>
        </select>
      </label>

      <!-- Bindings dinamicos para 'value' -->

      <!-- Para las opciones de radio, checkbox y select, 
      los valores de v-model suelen ser cadenas estáticas (o valores booleanos para la casilla de verificación) 
      Pero a veces es posible que queramos vincular el valor a una propiedad dinámica en la instancia activa actual. 
      Podemos usar v-bind para lograrlo. Además, usar v-bind nos permite vincular el valor de entrada a valores que no son cadenas.
      -->

      <label>
        Tenés nacionalidad Argentina?
        <!-- true-value y false-value son propiedades especiales que solo funcionan en conjunto con v-model
        Si quisiesemos alguno o ambos sean dinamicos, podemos bindear los valores con v-bind:true-value='' por ejemplo. -->
        <input type="checkbox" v-model="isArgentinian" true-value="SI" false-value="NO"> 
        <!-- Los atributos true-value y false-value no afectan el atributo 'value' de los inputs, porque los navegadores no incluyen casillas sin marcar en los envíos de formularios. 
        Para garantizar que uno de los dos valores se envíe en un formulario (por ejemplo, "sí" o "no"), utilice inputs 'radio' en su lugar. -->
      </label>

      <!-- renderizado condicional dependiendo del checkbox anterior -->
      <label>
        {{ isArgentinian.valueOf() === 'SI' ? 'Contas con DNI en regla?' : 'Contas con pasaporte argentino?' }}
        <input v-if="isArgentinian.valueOf() === 'SI'" type="checkbox" v-model="documentation" true-value="Tiene DNI en regla" false-value="No tiene DNI en regla">
        <input v-if="isArgentinian.valueOf() === 'NO'" type="checkbox" v-model="documentation" true-value="Tiene pasaporte argentino" false-value="No tiene pasaporte argentino">
      </label>

      <!-- v-model permite tambien bindear valores que no son strings! -->
      <label>
        Puedes comenzar a trabajar inmediatamente?
        <input type="checkbox" v-model="inmediateStart" :true-value="{ puede: 'si' }" :false-value="{ puede: 'no' }">
        </input>
      </label>

      <!-- modificadores: v-model tiene modificadores que nos permiten decidir bajo que condiciones se produce el binding -->

      <!-- v-model.lazy: indica que el binding se produce en el evento 'change' en vez del evento 'input' -->
      <!-- v-model.number: fuerza la conversion del valor de un input a un tipo de dato number de JavaScript -->
      <!-- v-model.trim: al igual que el metodo de strings de JavaScript, fuerza al valor a recortar siempre los espacios vacios al principio y al final -->

      <!-- submit para ver los resultados por consola -->
      <button type="submit">send</button>
    </form>
  </div>

</template>

<style scoped>
  #container, form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  fieldset {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  button {
    margin: 10px 5px;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    cursor: pointer;
  }

  label {
    margin: 5px 2px;
  }

</style>