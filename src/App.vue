<template>
  <div id="app">
    <component :is="layout">
      <router-view/>
    </component>
  </div>
</template>

<script>
import CategoryLayout from '@/layouts/CategoryLayout'
import MainLayout from '@/layouts/MainLayout'

export default {
  computed: {
    layout () {
      return this.$route.meta.layout + 'Layout'
    }
  },
  components: {
    CategoryLayout,MainLayout
  }
}
</script>

<style lang="scss">
  @import 'assets/css/styles.css';
</style>
