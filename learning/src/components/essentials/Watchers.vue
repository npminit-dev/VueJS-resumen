<!-- Las propiedades computadas nos permiten calcular declarativamente valores derivados. 
Sin embargo, hay casos en los que necesitamos realizar "efectos secundarios" 
como reacción a los cambios de estado, por ejemplo, mutar el DOM o cambiar otra parte del estado según el resultado de una operación asíncrona.
Con Composition API, podemos usar la función 'watch' para activar una devolución de llamada cada vez que cambia una parte del estado reactivo
algo similar al usar un useEffect con dependencias en React -->

<script setup>
import { onUnmounted, reactive, ref, watch, watchEffect, watchPostEffect, watchSyncEffect } from 'vue';
import { sleep } from '@/utils';
let fetchStatus = ref('correct')
let count = ref(0)
let count2 = ref(0)
const person = reactive({ name: 'jorge', surname: 'balsamo' })
let postId = ref(1)
let post = ref(null)

/* observa los cambios de fetchStatus y ejecuta el callback, dicho callback puede recibir 2 parametros, el valor nuevo y el viejo, en ese orden */
watch(fetchStatus, async (newValue, oldValue) => { 
  console.log('newValue: ' + newValue)
  console.log('oldValue: ' + oldValue)
  if(fetchStatus.value === 'fetching') {
    try {
      await sleep(500)
      let data = await fetch('https://jsonplaceholder.typicode.com/users')
      data = await data.json()
      console.log(data)
      fetchStatus.value = 'correct'
    } catch(err) {
      console.log(err)
      fetchStatus.value = 'error'
    }
  }
})

/* los estados observables pueden provenir de diferentes fuentes: refs, proxies (reactives), valores computados, 
una funcion getter (funcion que devuelve un valor), o un arreglo de una o varias de las fuentes anteriores.
si queremos observar un valor primitivo, debemos enviar a 'watch' un getter que devuelva dicho valor*/
watch(() => count.value**2, (square) => {
  console.log('watcher ejecutado mediante un getter! valor obtenido: ' + square)
})

/* watcher para un arreglo */
watch([count, fetchStatus], () => {
  console.log('watcher ejecutado al observar "fetchStatus" y "count"!')
})

/* watchers para objetos:
Al usar watchers sobre estados en forma de objetos, implicitamente se crea un 'deep watcher',
esto es, que se observan todas las propiedades del objeto, independientemente de su profundidad, 
esto puede tener un impacto en el rendimiento asi que hay que observar solo los cambios necesarios
*/
watch(person, (newValue, oldValue) => {
  console.log('newValue: ' + JSON.stringify(newValue))
  console.log('oldValue: ' + JSON.stringify(oldValue))
  /* el valor nuevo y el antiguo seran iguales porque ambos apuntan al mismo objeto! 
  para que esto funcionase bien habria que reemplazar el objeto completamente */
  /* distinto sería si usamos un getter (ver debajo) */
})

watch(() => [person.name, person.surname], (newValue, oldValue) => {
  console.log('newValue: ' + newValue) // ahora el valor nuevo y el antiguo si son distintos
  console.log('oldValue: ' + oldValue)
}, /*{ deep: true } podemos forzar la visualizacion de cambios en profundidad con las opciones de los watchers*/)


/* Watchers 'inmediatos': 
Watch es diferido de forma predeterminada: la devolución de llamada no se llamará hasta que la fuente observada haya cambiado. 
Pero en algunos casos es posible que deseemos que se ejecute inmediatamente la misma lógica de devolución de llamada; 
por ejemplo, es posible que deseemos recuperar algunos datos iniciales y luego volver a recuperarlos cada vez que cambie el estado relevante.
Podemos forzar que la devolución de llamada de un watcher se ejecute inmediatamente pasando la opción inmediate: true
*/

watch(postId, async () => {
  console.log('watcher "inmediato" ejecutado!')
  try {
    if(Number.isInteger(postId.value)) {
      let postResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId.value}`)
      if(postResponse.status === 404) {
        post.value = null
        return
      }
      postResponse = await postResponse.json()
      if(typeof postResponse === 'object' && postResponse.hasOwnProperty('id')) post.value = postResponse
    } else post.value = null
  } catch(err) {
    console.log(err)
    post.value = null
  }
}, { immediate: true })

/* Watchers se un solo uso:
La devolución de llamada del watcher se ejecutará cada vez que cambie la fuente observada. 
Si desea que la devolución de llamada se active solo una vez cuando cambia la fuente, use la opción once: true.
*/
watch(postId, () => {
  console.log('watcher de un solo uso ejecutado')
}, { once: true })

/* watchEffect: 
Es común que la devolución de llamada del watcher utilice exactamente el mismo estado reactivo que la fuente que se trackea. 
podemos definir un watchEffect, que se encargara de automaticamente de trackear el/los estado/s que se esten usando en la funcion
sin tener que especificarlo nosotros mismos. watchEffect se comporta por defecto como un watcher 'inmediato', por lo que no hay que definir la opcion 'inmediate'.
*/

watchEffect(() => {
  console.log('watchEffect ejecutado! propiedad trackeada: postId: ' + postId.value) /* postId trackeado, podrian trackearse mas estados si se desease */
})

/* watchEffect solo rastrea las dependencias durante su ejecución sincrónica. 
Cuando se usa con una devolución de llamada asíncrona, solo se rastrearán las propiedades a las que se accedió antes del primer tick de 'await'. */


/* watch VS watchEffect */

/*
watch solo rastrea la fuente observada explícitamente. 
No rastreará nada a lo que se acceda dentro de la devolución de llamada. 
Además, la devolución de llamada solo se activa cuando la fuente realmente ha cambiado. 
watch separa el seguimiento de dependencias del efecto secundario, lo que nos brinda un control más preciso sobre cuándo debe activarse la devolución de llamada.

watchEffect, por otro lado, combina el seguimiento de la dependencia y los efectos secundarios en una sola fase. 
Realiza un seguimiento automático de cada propiedad reactiva a la que se accede durante su ejecución sincrónica. 
Esto es más conveniente y normalmente da como resultado un código más conciso, pero hace que sus dependencias reactivas sean menos explícitas.
*/

/*
Timing de activacion de los watchers

Cuando muta el estado reactivo, puede activar tanto actualizaciones de componentes de Vue como devoluciones de llamadas de watchers creadas por usted.
De manera similar a las actualizaciones de componentes, las devoluciones de llamadas de los watchers creados por el usuario se agrupan para evitar invocaciones duplicadas. 
Por ejemplo, probablemente no queramos que un watcher se active mil veces si insertamos sincrónicamente mil elementos en una matriz que se está observando.
De forma predeterminada, la devolución de llamada de un watcher se llama después de que se actualice el componente principal (si corresponde) y antes de que se actualice el DOM del componente propietario. 
Esto significa que si intenta acceder al DOM del componente propietario dentro de una devolución de llamada del watcher, el DOM estará en un estado previo a la actualización.

Estos 'timings' pueden cambiarse con la opcion 'flush'
*/

/* Post Watchers:

Si desea acceder al DOM del componente propietario dentro de una devolución de llamada de un watcher después de que Vue lo haya actualizado, 
debe especificar la opción flush: 'post': */

watch(count2, () => { /* puede usarse watchEffect tambien */
  console.log('post-watcher ejecutado despues de que Vue haya actualizado el DOM!')
}, { flush: 'post' })

/* para watchEffect existe una abreviatura conveniente para configurarlo como postWatcher: */
watchPostEffect(() => {
  count2.value /* hacemos esto para que watchEffect detecte la dependencia */
  console.log('post-watch-effect ejecutado despues de que Vue haya actualizado el DOM!')
})

/* Sync watchers
También es posible crear un watcher que se active sincrónicamente, antes de cualquier actualización administrada por Vue: 
*/

watch(count2, () => { /* puede usarse watchEffect tambien */
  console.log('sync watcher ejecutado antes de que Vue haya actualizado el DOM!')
}, { flush: 'sync' })

watchSyncEffect(() => {
  count2.value /* hacemos esto para que watchEffect detecte la dependencia */
  console.log('sync-watch-effect ejecutado antes de que Vue haya actualizado el DOM!')
})

/*
Los watchers de sincronización no tienen procesamiento por lotes ni activadores cada vez que se detecta una mutación reactiva. 
Está bien usarlos para observar valores booleanos simples, pero evite usarlos en fuentes de datos que puedan sufrir mutaciones sincrónicas muchas veces, ej: arrays.
*/


/* Detencion de watchers */

/* 
Los watchers declarados sincrónicamente dentro de setup() o <script setup> están vinculados a la instancia del componente propietario y se detendrán automáticamente cuando se desmonte el componente propietario. 
En la mayoría de los casos, no necesita preocuparse por detener al watcher usted mismo.
La clave aquí es que el watcher debe crearse de forma sincrónica: 
si el watcher se crea en una devolución de llamada asíncrona, no estará vinculado al componente propietario y deberá detenerse manualmente para evitar pérdidas de memoria.
*/

let unwatch = null;

setTimeout(() => {
  unwatch = watch(count2, () => { /* este watcher no esta vinculado al componente, por lo que debe ser limpiado manualmente con la funcion que devuelve */
    console.log('watcher ejecutado, inicializado asincronamente!')
  }, { immediate: true })
}, 1000)

onUnmounted(() => {
  if(typeof unwatch === 'function') unwatch() /* por ejemplo, al desmontar el componente */
})

</script>

<template>
  <div>
    <h2 v-if="fetchStatus === 'correct'">all correct</h2>
    <h2 v-if="fetchStatus === 'fetching'">fetching...</h2>
    <h2 v-if="fetchStatus === 'error'">error {{ ':(' }}</h2>
    <button @click="fetchStatus = 'fetching'">fetch</button>
  </div>
  <div>
    <h2>Count: {{ count }}</h2>
    <div>
      <button @click="count--" :disabled="count <= 0">minus</button>
      <button @click="count++">plus</button>
    </div>
  </div>

  <br>

  <div>
    <label>
      name:
      <input type="text" v-model.trim="person.name">
    </label>
    <label>
      surname:
      <input type="text" v-model.trim="person.surname">
    </label>
  </div>

  <br>

  <div>
    <article v-if="post !== null">
      <h4>{{ post.title }}</h4>
      <p>{{ post.body.slice(0, 100) + '...' }}</p>
    </article>
    <h3 v-else>
      No post found!
    </h3>
    <label>
      Post ID:
      <input type="number" v-model.number="postId" min="1" max="100">
    </label>
  </div>

  <br>

  <div>
    <h2>Count2: {{ count2 }}</h2>
    <div>
      <button @click="count2--" :disabled="count2 <= 0">minus</button>
      <button @click="count2++">plus</button>
    </div>
  </div>
</template>

<style scoped>
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px 20px;
    margin: 10px;
    border: 1px dotted #f5f5f5
  }
</style>