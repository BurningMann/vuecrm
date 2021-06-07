<template>
  <div class="app-main-layout">
    
    <Header/>
    <div class="layout_main_area" :class="{'sidebar_hidden': !this.$store.state.sidebarOpen}" >
      <div class="sidebar">
        <Sidebar/>
      </div>
      <div class="content">
        <router-view/>
      </div>
      
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header"
import Sidebar from "@/components/Sidebar"

export default {
  name: 'MainLayout',
  components: {
    Header,Sidebar,
  },
  data(){
    return {
      preloader:true
    }
  },
}
</script>

<style lang="scss" scoped>
  .layout_main_area{
    width: 100%;
    min-height: calc(100vh - 70px);
    display: flex;
    .sidebar{
      position: absolute;
      width: 250px;
      height: 100%;
      background: #FFFFFF;
      box-shadow: 2px 0px 5px 0px rgba(0,0,0,.35);
      z-index: 50;
      transition: .5s;
    }
    .content{
      width: 100%;
      padding-left: 250px;
      background: #FFFFFF;
      transition: .5s;
    }
    &.sidebar_hidden{
      .sidebar{
        transform: translateX(-250px);
      }
      .content{
        padding-left: 0;
      }
    }
  }
</style>