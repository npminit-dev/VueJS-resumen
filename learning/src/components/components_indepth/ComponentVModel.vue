<!-- 
  v-model puede utilizarse en componentes para implementar un binding (union) en 2 sentidos, del padre al hijo y visceversa.
  Pero antes de ir a eso, vamos a hacer una prueba de como implementa Vue esto por debajo, simplemente usando refs y eventos.
  El componente para esta prueba ejemplo se encuentra en test_components/Input.vue
-->

<script setup>
import { ref, watchEffect } from 'vue'
import Input from '../test_components/Input.vue';
import VInput from '../test_components/VInput.vue';
import VModelAdvanced from '../test_components/VModelAdvanced.vue';

/* estados y funciones modificadoras */
const name = ref('')
const changeName = (newName) => name.value = newName

const surname = ref('')

const id = ref('')
const productName = ref('')
const category = ref('none')
const internalCode = ref('')

watchEffect(() => {
  console.clear()
  console.log('name: ' + name.value)
  console.log('surname: ' + surname.value)
  console.log('products: ' + id.value, productName.value, category.value, internalCode.value)
})

</script>

<template>
  <form>
    <!-- enviaremos el estado como prop, y ademas escucharemos el evento change del componente hijo: cuando este evento sea emitido, 
    recibiremos el valor pasado por el evento y lo asignaremos al estado, de esta forma creamos una relacion bidireccional.
    Esto es muy util para crear inputs personalizados -->
    <Input label="Name: " name="name" @change-value="changeName"/>

    <!-- Ahora vamos a usar v-model, la manera 'resumida' de crear una relacion bidireccional padre <-> hijo, 
    para eso ahora crearemos otro estado llamado 'surname' como valor de v-model para otro input personalizado,
    el componente que recibe esta prop se encuentra en test_components/VInput.vue -->
    <VInput label="Surname: " v-model:surname="surname"/> <!-- si el modelo definido dentro del hijo tiene un nombre, indicarlo despues de v-model -->

    <!-- Por ultimo, un ejemplo mas avanzado de v-model multiple, uso de modificadores y demas dentro de test_components/VModelAdvanced.vue -->
    <VModelAdvanced 
      v-model:id="id"
      v-model:product-name="productName"
      v-model:category="category"
      v-model.capitalize.trim="internalCode" 
    />
    <!-- los modificadores para componentes debemos crearlos nosotros mismos dentro de la directiva defineModel, ver el componente VModelAdvanced 
    en este caso el modificador convierte a mayuscula la primera letra del string 
    (hasta ahora no he podido usar los modificadores sobre v-models que tengan un nombre, como id, productName o category :/ )
    -->
  </form>
</template>

<style scoped></style>
