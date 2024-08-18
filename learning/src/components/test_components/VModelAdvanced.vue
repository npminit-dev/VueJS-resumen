<script setup>

  const idModel = defineModel('id', { required: true, type: String })
  const productModel = defineModel('productName', { required: true, type: String })
  const categoryModel = defineModel('category', 
    { 
      required: true, 
      type: String,
      validator: (value) => ['none', 'Hardware', 'Peripherics', 'Power supply'].includes(value) /* tambien podemos usar validadores */
    }
  )
  const [iCodeModel, modifiers] = defineModel({ /* podemos desestructurar el valor devuelto por defineModel para obtener los modificadores */
    required: true,
    set(value) { /* set nos permite pre-transformar un valor antes de establecerlo en el binding, lo que nos permite crear modificadores */
      let modified = value
      if(modifiers.capitalize) modified = modified.charAt(0).toUpperCase() + modified.slice(1)
      if(modifiers.trim) modified = modified.trim()
      return modified
    }
  })

</script>

<template>
  <form>
    <div>Uso avanzado de v-model</div>
    <div>
      <label>
        ID:
        <input type="text" v-model="idModel"/>
      </label>
    </div>
    <div>
      <label>
        Product name:
        <input type="text" v-model="productModel"/>
      </label>
    </div>
    <div>
      <label>
        Category:
        <select v-model="categoryModel">
          <option value="none" disabled>NONE</option>
          <option value="Hardware">HARDWARE</option>
          <option value="Peripherics">PERIPHERICS</option>
          <option value="Power supply">POWER SUPPLY</option>
        </select>
      </label>
    </div>
    <div>
      <label>
        Product internal code
        <input type="text" v-model="iCodeModel"/>
      </label>
    </div>
  </form>
</template>

<style scoped>
</style>
