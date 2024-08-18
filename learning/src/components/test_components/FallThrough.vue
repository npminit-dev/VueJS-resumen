<script setup>

  // defineOptions({
  //   inheritAttrs: false
  // }) esto desactiva la herencia de atributos desde el padre, aunque todavia son accesibles mediante $atrrs

</script>

<template>
  <!-- este componente (este es el componente raiz, porque template no se renderiza) recibira los atributos caidos que pasemos -->
  <div :style="{ border: '1px solid red', 'border-radius': '100%' }"> <!-- el borde no se aplica porque el atributo del padre tiene prioridad -->
    <h3>fallthrough div</h3>
    <p>fallthrough atributes: {{ $attrs }}</p> <!-- la propiedad especial $attrs nos devuelve los atributos caidos que provienen del padre -->
    <!--
    Algunos detalles:
      A diferencia de las props, los atributos caidos conservan su casing original en JavaScript, por lo que se debe acceder a un atributo, digamos foo-bar, como $attrs['foo-bar'].
      Un detector de eventos v-on como @click se expondrá en el objeto como una función en $attrs.onClick
    -->
  </div>
</template>

<style scoped>
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 300px;
    width: 300px;
    border: 1px solid white;
  }

  p {
    font-size: 14px;
  }
</style>