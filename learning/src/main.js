import './assets/main.css'

import { createApp, defineAsyncComponent } from 'vue'
import { createPinia } from 'pinia'
import GlobalComponent from './components/test_components/GlobalComponent.vue'

import App from './App.vue'
import router from './router'
import { i18nPlugin } from './utils'

const app = createApp(App) // se crea la app usando 'App' como componente raiz
// const app2 = createApp(App) // una segunda instancia de aplicacion usando el mismo componente raiz

app.use(createPinia()) // se hace uso las librerias y plugins requeridas para la app
app.use(router)
app.use(i18nPlugin, { // instalacion de plugin personalizado
  greetings: {
    hello: 'Hola'
  }
})

app.component('GlobalComponent', GlobalComponent) // registro de componentes globales (su nombre por el que vamos a llamarlo en la app, y el componente que se renderiza)
app.component('LazyComponent3', defineAsyncComponent(() => import('./components/test_components/LazyComponent.vue'))) /* componente cargado de forma diferida */

// app.config.errorHandler = (err) => { // se pueden registrar configuraciones globales para la app, como este error handler
//   console.log('Error handled in app config (main.js): ' + err)
// }

app.provide('greetings', 'Hello! i`m main.js') // se proveen valores para ser accesibles a toda la aplicación mediante inject

app.mount('#app') // se monta la aplicacion en el nodo con el id #app, similar a como react lo hace con 'root'
// app2.mount('#app2') // se monta otra instancia diferente de la misma app en otro nodo
