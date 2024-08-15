import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import GlobalComponent from './components/test_component/GlobalComponent.vue'

import App from './App.vue'
import router from './router'

const app = createApp(App) // se crea la app usando 'App' como componente raiz
// const app2 = createApp(App) // una segunda instancia de aplicacion usando el mismo componente raiz

app.use(createPinia()) // se hace uso las librerias requeridas para la app
app.use(router)

app.component('GlobalComponent', GlobalComponent) // registro de componentes globales (su nombre por el que vamos a llamarlo en la app, y el componente que se renderiza)

app.config.errorHandler = (err) => { // se pueden registrar configuraciones globales para la app, como este error handler
  console.log('Error handled in app config (main.js): ' + err)
}

app.mount('#app') // se monta la aplicacion en el nodo con el id #app, similar a como react lo hace con 'root'
// app2.mount('#app2') // se monta otra instancia diferente de la misma app en otro nodo
