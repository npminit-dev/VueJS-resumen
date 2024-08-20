<!-- Las directivas personalizadas nos permiten crear una lógica propia cuando esta esta relacionada
con enlaces de datos a propiedades nativas del DOM. Recordemos que v-show, v-model y demas directivas
estan estrechamente relacionadas con los atributos del DOM -->

<!-- Las directivas personalizadas están destinadas principalmente a reutilizar la lógica que implica acceso DOM de bajo nivel en elementos simples. -->

<script setup>
import { ref } from 'vue';

/* directiva personalizada, la propiedad 'mounted' recibe una funcion con el elemento que usa la directiva como argumento
con esto nos encargamos de setear la propiedad 'disabled' en true */
const vDisabled = { /* cualquier variable en camelCase comenzada con v, puede ser usada como directiva */
  mounted: el => {
    if (el.tagName === 'BUTTON') {
      el.disabled = true
    }
  }
}

/* Uso avanzado:
Un directiva puede proporcionar varios hooks (todos opcionales):*/

const myDirective = {
  // llamado antes de que se apliquen los atributos
  // o los listeners de eventos al elemento vinculado
  created(el, binding, vnode) {
    // ver abajo para más detalles sobre los argumentos
  },
  // llamado justo antes de que el elemento sea insertado en el DOM
  beforeMount(el, binding, vnode) { },
  // llamado cuando el componente padre del elemento vinculado
  // y todos sus hijos están montados
  mounted(el, binding, vnode) { },
  // llamado antes de que el componente padre sea actualizado
  beforeUpdate(el, binding, vnode, prevVnode) { },
  // llamado después de que el componente padre y
  // todos sus hijos hayan sido actualizados
  updated(el, binding, vnode, prevVnode) { },
  // llamado antes de que el componente padre sea desmontado
  beforeUnmount(el, binding, vnode) { },
  // llamado cuando el componente padre es desmontado
  unmounted(el, binding, vnode) { }
}
/* los parametros para cada funcion se desglosan asi: */
/*
 > el: el elemento al que está vinculada la directiva. Esto se puede utilizar para manipular directamente el DOM.
 > binding: un objeto que contiene las siguientes propiedades:
    - value: El valor pasado a la directiva. Por ejemplo, en v-my-directive="1 + 1", el valor sería 2.
    - oldValue: El valor anterior, solo disponible en beforeUpdate y updated. Está disponible independientemente de si el valor ha cambiado o no.
    - arg: El argumento pasado a la directiva, si la hubiera. Por ejemplo, en v-my-directive:foo, el argumento sería "foo".
    - modifiers: Un objeto que contiene modificadores, si los hay. Por ejemplo, en v-my-directive.foo.bar, el objeto modificador sería {foo: true, bar: true}.
    - instance: La instancia del componente donde se utiliza la directiva.
    - dir: el objeto de definición de directiva.
  > vnode: el VNode subyacente que representa el elemento vinculado.
  > prevVnode: el VNode que representa el elemento vinculado del renderizado anterior. Solo disponible en los hooks beforeUpdate y updated.
 */

/* Aclaracion: Aparte de 'el', debes tratar estos argumentos como de sólo lectura y nunca modificarlos. 
Si necesita compartir información entre enlaces, se recomienda hacerlo a través del dataset del elemento. */

/* vamos a crear una directiva para visualizar en consola parte de estos atributos */
const vShowArgs = {
  mounted: (el, bindings, vnode, prevNode) => {
    console.log(`Elemento que usa la directiva: ${el}`)
    console.log(`Valor pasado a la directiva: ${bindings.value}`)
    console.log(`Argumentos pasados a la directiva: ${bindings.arg}`)
    console.log(`Modificadores pasados a la directiva: ${JSON.stringify(bindings.modifiers)}`)
  }
}
const arg = 'hello world!!!' /* estado como argumento */

/* es comun que el hook 'mounted' y 'updated' contengan la misma lógica, podemos resumirlo mediante un shorthand
pasando una funcion en lugar de un objeto. Si necesitamos pasar multiples argumentos a una directiva,
podemos hacerlo pasando un objeto. Las directivas aceptan cualquier tipo de dato de JavaScript */
const vShortAndBind = (el, binding) => {
  el.getAnimations().forEach(anim => {
    if (binding.value.isPlayState === true) anim.play()
    else anim.pause()
  })
}

const animated = ref(true)

</script>

<template>
  <!-- Usamos una directiva local, y una global definida a nivel de aplicacion (ver main.js) -->
  <button v-disabled v-submit-btn>DISABLED BUTTON</button>

  <!-- order; directiva - :argumento (solo 1) - .modificadores - =valor -->
  <div v-show-args:[arg].mod1.mod2.mod3="true">ELEMENT WITH CUSTOM DIRECTIVE</div>

  <div class="rotable" v-short-and-bind="{ isPlayState: animated }" </div>
  <button @click="animated = !animated">{{ animated ? 'pause' : 'play' }} animation</button>

  <!-- Aclaracion: Las directivas personalizadas solo deben usarse cuando la funcionalidad deseada solo se puede lograr mediante manipulación directa de DOM. 
  Es preferible usar plantillas declarativas utilizando directivas integradas como v-bind cuando sea posible porque son más eficientes y fáciles de procesar en el servidor. -->


  <!-- directivas personalizadas con componentes:
    No se recomienda el uso de directivas personalizadas en los componentes. Puede producirse un comportamiento inesperado cuando un componente tiene varios nodos raíz.
    Tengamos en cuenta que los componentes pueden tener potencialmente más de un nodo raíz. Cuando se aplica a un componente multiraíz, se ignorará la directiva y se generará una advertencia. 
    A diferencia de los atributos, las directivas no se pueden pasar a un elemento diferente con v-bind="$attrs".
   -->
</template>

<style scoped>
.rotable {
  height: 200px;
  width: 200px;
  animation: rotation 5s linear infinite;
  background-color: cadetblue
}

@keyframes rotation {
  from {
    transform: rotateZ(0);
  }

  to {
    transform: rotateZ(360deg);
  }
}
</style>