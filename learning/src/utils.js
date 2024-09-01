export function sleep(ms) {
  return new Promise((res) => setTimeout(() => res(), ms))
}

export const nameKey = Symbol('key for the provided "name" value')

/* plugin para traducciones */
export const i18nPlugin = {
  install: (app, options) => { /* el plugin debe tener una funcion install, que recibe la instancia de la aplicacion, y un argumento con opciones (tendra las traduciones) */
    app.provide('translateObject', options) /* proveemos el objeto con las traducciones para toda la aplicacion */
    app.config.globalProperties.$translate = function (key) { /* creamos una propiedad global nueva para traducir, recibira las claves para la traduccion */
      let [group, translateKey] = key.split('.')
      if(group && translateKey) return options[group][translateKey] || 'translate keys invalid'
    }
  }
}

const langs = ['es', 'de']