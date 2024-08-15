
<script setup> 
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue'
import TemplateSyntax from './components/essentials/TemplateSyntax.vue'
import ReactivityFundamentals from './components/essentials/ReactivityFundamentals.vue'
import ComputedProperties from './components/essentials/ComputedProperties.vue'
import ClassAndStyleBinding from './components/essentials/ClassAndStyleBinding.vue'
import ConditionalRender from './components/essentials/ConditionalRender.vue'
import ListRender from './components/essentials/ListRender.vue'
import EventHandlers from './components/essentials/EventHandlers.vue'
import FormBindings from './components/essentials/FormBindings.vue'
import LifeCycleHooks from './components/essentials/LifeCycleHooks.vue'
import Watchers from './components/essentials/Watchers.vue'
import TemplateRefs from './components/essentials/TemplateRefs.vue'
import ComponentEssentials from './components/essentials/ComponentEssentials.vue'
import Registration from './components/components_indepth/Registration.vue'
import Props from './components/components_indepth/Props.vue'

</script>

<template>

  <!-- Conceptos esenciales: -->

  <!-- <TemplateSyntax/> -->
  <!-- <ReactivityFundamentals/> -->
  <!-- <ComputedProperties/> -->
  <!-- <ClassAndStyleBinding/> -->
  <!-- <ConditionalRender/> -->
  <!-- <ListRender/> -->
  <!-- <EventHandlers/> -->
  <!-- <FormBindings/> -->
  <!-- <LifeCycleHooks/> -->
  <!-- <Watchers/> -->
  <!-- <TemplateRefs/> -->
  <!-- <ComponentEssentials/> -->

  <!-- ---------------------------------------------------------------- -->

  <!-- Componentes en profundidad -->

  <!-- <Registration/> -->
  <Props/>


  <RouterView />
</template>


