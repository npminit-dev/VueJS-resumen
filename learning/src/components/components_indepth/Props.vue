<!-- Paso de props
ver test_component/PropsTest.vue
-->

<script setup>
import PropsTest from '../test_components/PropsTest.vue';
import PropsValidation from '../test_components/PropsValidation.vue';

const propsTest = {
  name: 'Anna',
  surname: 'Galperovich',
  age: 17,
  isRegistered: true,
  specialities: ['QA', 'Manager']
}

</script>

<template>
  <!--
    los string pueden pasarse sin v-bind (o su shorthand), pero en cambio para otro tipo de datos debemos usar v-bind,
    ya que esto avisa a Vue que lo que viene despues es una expresion de JavaScript, no un string,
    como es el caso de 'age' e 'isRegistered' y 'specialities', que son un number, un age y un array respectivamente.
    En el caso de isRegistered (boolean) colocarlo sin valor asume que dicho valor es 'true'.
  -->
  <PropsTest 
    name="Jorge" 
    surname="Balsamo"
    :age="29"
    isRegistered
    :specialities="['Web Developer', 'PC Fixer', 'UX/UI designer']"
  />

  <!-- Vue soporta el uso de kebab-case para pasar propiedades, esto esta en consonancia con los atributos de HTML nativos (notese la propiedad isRegistered) -->
  <PropsTest 
    name="Juan" 
    surname="Rodriguez"
    :age="25"
    :is-registered="false"
    :specialities="['UX/UI designer', 'LLM engineer', 'DB engineer']"
  />

  <!-- podemos usar un objeto para pasar todas las props de una vez mediante v-bind -->
  <PropsTest v-bind="propsTest"/>


  <!-- Flujo de datos unidireccional -->

  <!-- 
    Todas las props forman un enlace unidireccional entre la propiedad del padre y del hijo: cuando la propiedad padre se actualiza, fluirá hacia la del hijo, pero no al revés. 
    Esto evita que los componentes hijos muten accidentalmente el estado del padre, lo que puede hacer que el flujo de datos de su aplicación sea más difícil de entender.
    Además, cada vez que se actualiza el componente padre, todas las props del componente hijo se actualizarán con el valor más reciente. 
    Esto significa que no debes intentar mutar una prop dentro de una componente hijo. Si lo haces, Vue te avisará en la consola con un error.
  -->

  <!-- hay 2 escenarios donde podemos pasar props y necesitamos hacer algo con ellas (ademas de renderizar valores en la plantilla)

    - Usar la prop como valor inicial para un estado del hijo.
    - Usar la prop para aplicarle una transformacion a los datos.
    En ambos no es necesario mutar la prop desde el hijo
    en el primer caso podemos pasar la prop como argumento a la funcion ref() y asi setear un valor inicial
    en el segundo podemos usar la prop para construir un valor computado.

    Ver el archivo test_component/PropsTest.vue para ver estos casos en código, pero es bastante sencillo. -->


  <!-- En objetos y arrays:
    Cuando los objetos y los arrays se pasan como props, si bien el componente hijo no puede mutar el binding de la propiedad, podrá mutar las propiedades anidadas del objeto o el arreglo. 
    Esto se debe a que en JavaScript los objetos y arrays se pasan por referencia, y a Vue le resulta excesivamente costoso evitar tales mutaciones.
    El principal inconveniente de tales mutaciones es que permiten que el componente hijo afecte el estado padre de una manera que no es obvia para el componente padre, 
    lo que potencialmente hace que sea más difícil razonar sobre el flujo de datos en el futuro. 
    Como práctica recomendada, debe evitar dichas mutaciones a menos que el padre y el hijo estén estrechamente acoplados por diseño. 
    En la mayoría de los casos, el hijo debe emitir un evento para permitir que el padre realice la mutación.
  -->

  <!-- Validacion de props: -->
  <!--
    Los componentes pueden especificar validacion para sus props, como los tipos que ya hemos visto en ./test_component/Album.vue 
    Si no se cumple un requisito, Vue le avisará en la consola JavaScript del navegador. 
    Esto es especialmente útil cuando se desarrolla un componente destinado a ser utilizado por otros.
    Para especificar validaciones de props, puede proporcionar un objeto con requisitos de validación a la macro defineProps(), en lugar de un array de strings

    Podemos ver esto ejemplificado en el archivo ./test_component/PropsValidatio.vue
  -->

  <PropsValidation
    product-name="AMD Ryzen 5 3600G"
    product-internal-code=1187
    :product-id="123456789"
    category="microprocessors"
    distributor="GlobalSupplies Inc."
  />

</template>

<style scoped>
</style>