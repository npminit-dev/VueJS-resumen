import { onMounted, onUnmounted, ref, toValue, watchEffect } from 'vue';

  /* este composable detectara el movimiento del mouse relativo al viewport */
export function useMousePosition() {
  /* podemos usar todas las funciones de estado, macros y hooks de ciclos de vida de la Composition API */
  const x = ref(0)
  const y = ref(0)

  const setMousePosition = (event) => {
    x.value = event.clientX
    y.value = event.clientY
  }

  onMounted(() => {
    window.addEventListener('mousemove', setMousePosition)
  })

  onUnmounted(() => {
    window.removeEventListener('mousemove', setMousePosition)
  })

  return { x, y } /* exponemos los valores para los componentes que usen este composable */
}

/* este composable va a devolver un post de una API dependiendo el id que pasemos como parametro */
export function useFetchPost(post) {
  const status = ref('ready')
  const data = ref(null)

  /* toValue es una funcion relativamente nueva en Vue, permite desenvolver refs y getters, si el argumento es un getter, se llama al getter y se devuelve el valor 
  , si es un ref, se obtiene su propiedad .value, si el argumento no es ni uno ni el otro, se devuelve tal y como fue pasado a toValue*/  
  const fetchPost = async (post) => {
    try {
      status.value = 'loading'   
      if(post === 3) throw new Error('Artificial generated error') 
      let response = await fetch(`https://jsonplaceholder.typicode.com/posts/${toValue(post)}`)
      if(!response.ok) throw new Error(`Error fetching post: ${response.status} ${response.statusText}`)
      response = await response.json()
      data.value = response
      status.value = 'ready'
    } catch(err) {
      status.value = 'Oops! something went wrong'
      data.value = err
    }

  }

  watchEffect(() => { /* cuando 'post' cambie, se hara un re-fetching */
    fetchPost(toValue(post))
  })

  return { status, data } /* se devuelve tanto la data como el status de la solicitud */
}

/* este composable es un simple counter, pero utiliza una ref en el scope del modulo, por lo que todos
los componentes que usen este composable comparten el estado de count mediante clousures */
const count = ref(0)

export const useGlobalCounter = () => {
  const increment = () => count++
  const decrement = () => count++
  return { count, increment, decrement }
}


/* Buenas practicas */

/* es una convencion que los composables comiencen con la palabra 'use' */

/* el uso de toValue es muy coveniente sobre todo al trabajar con otros desarrolladores, ya que es muy flexible:
permite que nuestros composables acepten refs/getterts o valores 'crudos', ya que toValue devolvera el valor tal y como esta en este ultimo caso

/* es una convencion devolver en los composables, un objeto no reactivo con multiples refs en su interior
para mantener la reactividad al desestructurar cuando llamemos al composable.
Si queremos utilizar el estado devuelto de los composables como propiedades del objeto, 
podemos envolver el objeto devuelto con reactive() para que las referencias se desenvuelvan. Por ejemplo:

const mouse = reactive(useMouse())
*/

/* Efectos secundarios
Está bien realizar efectos secundarios (por ejemplo, agregar detectores de eventos DOM o recuperar datos) en composables, 
pero prestemos atención a las siguientes reglas:

  - Si estamos trabajando en una aplicación que utiliza renderizado del lado del servidor (SSR),
    aseguremonos de realizar efectos secundarios específicos de DOM en los hooks del ciclo de vida posteriores al montaje, p. onMounted(). 
    Estos hooks solo se llaman en el navegador, por lo que puede estar seguro de que el código dentro de ellos tiene acceso al DOM.

  - Recordemos limpiar los efectos secundarios en onUnmounted(). Por ejemplo, si un elemento composable configura un detector de eventos DOM, deberíamos eliminar ese detector en onUnmounted() 
    como hemos visto en el ejemplo de useMousePosition(). Puede ser una buena idea usar un composable que haga esto automáticamente por nosotros, como el ejemplo useEventListener(). */

/* Restricciones de uso

Los composables solo deben llamarse en <script setup> o en el hook setup(). 
También deberían llamarse sincrónicamente en estos contextos. 
En algunos casos, también puedes llamarlos en hooks de ciclo de vida como onMounted().

Estas restricciones son importantes porque estos son los contextos donde Vue puede determinar la instancia del componente activo actual. 
El acceso a una instancia de componente activo es necesario para que:

- Se pueden registrar hooks de ciclo de vida.
- Las propiedades calculadas y los observadores se pueden vincular a él, de modo que puedan eliminarse cuando se desmonta la instancia para evitar pérdidas de memoria.
*/