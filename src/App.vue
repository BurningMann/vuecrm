<template>
  <div id="app">
    <Preloader v-show="this.$store.state.showPreloader == true" />
    <component :is="layout">
      <router-view/>
    </component>
  </div>
</template>

<script>
import LoginLayout from '@/layouts/LoginLayout'
import MainLayout from '@/layouts/MainLayout'
import Preloader from "@/components/Preloader"
export default {
  computed: {
    layout () {
      return this.$route.meta.layout + 'Layout'
    }
  },
  components: {
    LoginLayout,MainLayout,Preloader
  },
  mounted(){
    this.$store.state.showPreloader = false
  }
}
</script>

<style lang="scss">
  @import 'assets/css/styles.css';
</style>
