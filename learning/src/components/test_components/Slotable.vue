<script setup>

</script>

<template>
  <article>
    <h3>TITLE</h3>
    <div class="slotbox">
      <!-- slot puede renderizar algo cuando este componente 
      se pase sin contenido dentro de sus tags de apertura/clausura, es un contenido por defecto para el slot -->
      <slot> 
        Default slot content
      </slot>
    </div>
    <footer>footer</footer>
  </article>
</template>

<style scoped>
  article {
    position: relative;
    height: 250px;
    width: 150px;
    margin: 5px;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    border-radius: 10px;
    border: 1px solid #f5f5f5;
    overflow: hidden;
  }

  h3 {
    width: 100%;
    text-align: center;
    padding: 5px;
    background-color: #333;
    color: #f5f5f5;
  }

  .slotbox {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  footer {
    width: 100%;
    text-align: center;
    padding: 5px;
    background-color: #888;
    color: #333;
  }
</style>