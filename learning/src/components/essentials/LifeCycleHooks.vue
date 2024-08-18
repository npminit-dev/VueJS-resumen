<!-- Hooks de ciclo de vida de los componentes -->
<!-- 
Cada instancia de componente Vue pasa por una serie de pasos de inicialización cuando se crea; por ejemplo, necesita configurar la observación de datos, compilar el template, montar la instancia en el DOM y actualizar el DOM cuando cambian los datos. 
En el camino, también ejecuta funciones llamadas 'hooks de ciclo de vida', brindando a los usuarios la oportunidad de agregar su propio código en etapas específicas.
-->
<script setup>

import { onBeforeMount, onBeforeUpdate, onErrorCaptured, onMounted, onRenderTracked, onRenderTriggered, onUpdated, ref } from 'vue';
import UnMountTest from '../test_components/UnMountTest.vue';

// onMounted(() => {
//   console.log('componente montado por primera vez!')
// })

/* También hay otros ganchos que se llamarán en diferentes etapas del ciclo de vida de la instancia, siendo los más utilizados onMounted, onUpdated y onUnmounted.
Al llamar a onMounted, Vue asocia automáticamente el callback registrado con la instancia del componente activo actual. 
Esto requiere que estos enlaces se registren sincrónicamente durante la configuración del componente, 
llamar a onMounted dentro de un interval/timeout, o funcion asincrona, no producira ningun efecto.
Esto no quiere decir que obligatoriamente los hooks de ciclo de vida deban ser llamados dentro de 'script setup' o 'setup()',
pueden llamarse en cualquier parte, funcion externa etc siempre en cuanto la pila de llamadas sea sincrona y se origine en 'script setup' o 'setup()'
*/

const count = ref(0)
const children = ref(true)

// explicacion de los hooks

/* 
onMounted (no valido para server side rendering): se llama al montar el componente , un componente se considera 'montado' cuando:
Se han montado todos sus componentes secundarios sincrónicos (no incluye componentes asíncronos ni componentes dentro de árboles <Suspense>).
Su propio árbol DOM ha sido creado e insertado en el contenedor principal. Tenga en cuenta que solo garantiza que el árbol DOM del componente esté en el documento si el contenedor raíz de la aplicación también está en el documento.
*/ 
onMounted(() => { 
  console.log('componente montado!')
})

/* onUpdated (no valido para server side rendering): se llama al cambiar un estado dentro del componente
Este hook se llama después de cualquier actualización DOM del componente, lo que puede deberse a diferentes cambios de estado, 
porque se pueden agrupar múltiples cambios de estado en un solo ciclo de renderizado por razones de rendimiento. 
Si necesitamos acceder al DOM actualizado después de un cambio de estado específico, utilizaremos nextTick() en su lugar.
*/
onUpdated(() => {
  console.log('componente actualizado!')
  /* actualizar estados dentro de este hook producira que vuelva a llamarse infinitamente! */
})

/* onUnmounted: (no valido para server side rendering, ver componente en test_component/UnMountTest.vue) Un componente se considera desmontado después de:
Todos sus componentes secundarios han sido desmontados.
Todos sus efectos reactivos asociados (efecto de renderizado y observadores calculados/creados durante la configuración()) se han detenido.
Utilice este hook para limpiar efectos secundarios creados manualmente, como temporizadores, detectores de eventos DOM o conexiones de servidor. 
*/

/* onBeforeMount (no valido para server side rendering):
Cuando se llama a este hook, el componente ha terminado de configurar su estado reactivo, 
pero aún no se han creado nodos DOM. Está a punto de ejecutar su efecto de renderizado DOM por primera vez.
*/
onBeforeMount(() => {
  console.log('componente a punto de montarse!')
})

/* onBeforeUpdate (no valido para server side rendering):
Registra un hook que se llamará justo antes de que el componente esté a punto de actualizar su árbol DOM debido a un cambio de estado reactivo.
*/
onBeforeUpdate(() => {
  console.log('componente a punto de actualizarse')
  /* a diferencia de onUpdate, es seguro modificar estados reactivos aqui */
})

/* onBeforeUnmount: (no valido para server side rendering, ver componente en test_component/UnMountTest.vue) 
Registra un hook que se llamará justo antes de desmontar una instancia de componente.
Cuando se llama a este hook, la instancia del componente sigue siendo completamente funcional.
*/

/* onErrorCaptured: Registra un hook que se llamará cuando se haya capturado un error 
que se propaga desde un componente descendiente. */

// Los errores se pueden capturar de las siguientes fuentes:

// component renders
// controladores de eventos
// hooks del ciclo de vida
// función setup()
// watchers
// hooks de directiva personalizados
// hooks de transición

/* El hook recibe tres argumentos: el error, la instancia del componente que desencadenó el error y una cadena de información que especifica el tipo de fuente del error. */
onErrorCaptured((err, instance, info) => { 
  console.log('error: ' + err)
  console.log(instance)
  console.log('info: ' + info)
  /* En producción, el tercer argumento (información) será un código abreviado en lugar de la cadena de información completa. 
  Puede encontrar el código para la asignación de cadenas en la Referencia de códigos de error de producción, en la documentacion de Vue. */
})

/*
Puede modificar el estado del componente en errorCaptured() para mostrar un estado de error al usuario. 
Sin embargo, es importante que el estado de error no muestre el contenido original que provocó el error; de lo contrario, el componente se lanzará a un bucle de renderizado infinito.

El hook puede devolver 'false' para evitar que el error se propague más.

Reglas de propagacion:
- De forma predeterminada, todos los errores aún se envían al nivel de aplicación app.config.errorHandler si está definido, de modo que estos errores aún se puedan informar a un servicio de análisis en un solo lugar.
- Si existen varios hooks errorCaptured en la cadena de herencia o en la cadena principal de un componente, todos se invocarán ante el mismo error, en orden de abajo hacia arriba. Esto es similar al mecanismo de burbujeo de los eventos DOM nativos.
- Si el hook errorCaptured arroja un error, tanto este error como el error capturado original se envían a app.config.errorHandler.
- Un hook errorCaptured puede devolver falso para evitar que el error se propague más. Básicamente, esto significa "este error se ha solucionado y debe ignorarse". Evitará que se invoquen hooks adicionales de errorCaptured o app.config.errorHandler para este error.
*/

/* onRenderTracked (no valido para server side rendering, solo para modo desarrollo) */
/*Registra un hook de depuración que se llamará cuando el efecto de renderizado del componente haya rastreado una dependencia reactiva.*/
onRenderTracked((
  {
    effect,
    target,
    type, /* 'get' | 'has' | 'iterate' */
    key
  }
) => console.log(type))

/* onRenderTriggered (no valido para server side rendering, solo para modo desarrollo) */
/* Registra un hook de depuración que se llamará cuando una dependencia reactiva activa la repetición del efecto de renderizado del componente. */
onRenderTriggered((
  {
    effect,
    target,
    type, /* 'set' | 'add' | 'delete' | 'clear' */
    key,
    newValue,
    oldValue,
    oldTarget
  }
) => console.log(oldValue))

/* Estos hooks tendran sentido mas adelante, una vez alcanzados los conceptos 'componentes' y 'server-side-rendering */

/* onActivated​ (no valido para server side rendering)
Registra una devolución de llamada que se llamará después de que la instancia del componente se inserte en el DOM como parte de un árbol almacenado en caché por <KeepAlive>.*/

/* onDeactivated (no valido para server side rendering)
Registra una devolución de llamada que se llamará después de que la instancia del componente se elimine del DOM como parte de un árbol almacenado en caché por <KeepAlive>. */

/* onServerPrefetch (no valido para client side rendering) 
Registra una función asíncrona que se resolverá antes de que la instancia del componente se represente en el servidor.
Si la devolución de llamada devuelve una Promesa, el renderizador del servidor esperará hasta que se resuelva la Promesa antes de renderizar el componente.
Este enlace solo se llama durante la representación del lado del servidor y se puede usar para realizar la recuperación de datos solo del servidor.*/

</script>

<template>
  <div>
    <button @click="count--" :disabled="count === 0">minus</button>
    <h3>{{ count }}</h3>
    <button @click="count++">plus</button>
  </div>
  <br>
  <div>
    <button @click="children = !children">
      {{ children ? 'Desmontar hijo' : 'Montar hijo' }}
    </button>
    <UnMountTest v-if="children"/>
  </div>
</template>

<style scoped>
  div {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  h3 {
    margin: 0 10px;
  }
</style>