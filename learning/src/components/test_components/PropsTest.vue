
<script setup>
import { computed, onMounted, ref, watchEffect } from 'vue';

  const props = defineProps({ /* podemos usar la sintaxis de objetos para definir las props, usamos el valor para definir los tipos */
    name: String,
    surname: String,
    age: Number,
    isRegistered: Boolean,
    specialities: Array
  })
  /* Declaramos nombres de props largos usando camelCase porque esto evita tener que usar comillas cuando los usamos como claves de propiedad 
  y nos permite hacer referencia a ellos directamente en templates porque son identificadores válidos de JavaScript: */

  /*  */
  const specialities = ref(props.specialities.length)

  const computedData = computed(() => [
    props.isRegistered ? 'is already registered' : 'should register asap',
    props.age > 18 ? 'is of legal age' : 'is a minor'
  ])

  onMounted(() => {
    console.log(specialities.value)
    console.log(computedData.value)
  })

</script>

<template>
  <article>
    <h2 v-if="name">{{ name }}</h2>
    <h3 v-if="surname">{{ surname }}</h3>
    <h4 v-if="age">Age: {{ age }}</h4>
    <h5 v-if="isRegistered">is Registered</h5>
    <h5 v-else>is NOT Registered</h5>
    <div v-if="specialities">
      <h3>Specialities</h3>
      <ul>
        <li v-for="speciality of specialities" :key="speciality">
          {{ speciality }}
        </li>
      </ul>
    </div>
  </article>
</template>

<style scoped>
  article, div {
    min-width: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: fit-content;
    margin: 10px;
    padding: 5px;
    border: 1px solid gray;
    border-radius: 10px;
    background-color: #f5f5f5;
    color: #333;
  }

  div {
    background-color: #333;
    color: #f5f5f5;
  }
</style>