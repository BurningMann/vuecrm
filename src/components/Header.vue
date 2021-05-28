<template>
  <header class="header">
    <div class="header__navbar">
      <div class="header__navbar_left">
        <div class="burger" @click="sidebar()"><img src="@/assets/burger-icon.svg" alt=""></div>
        <div class="date_wrapper">12.12.12</div>
      </div>
      <div class="header__navbar_right">
        <el-dropdown split-button type="primary">
          Username
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>Action 1</el-dropdown-item>
            <el-dropdown-item>Action 2</el-dropdown-item>
            <el-dropdown-item>Action 3</el-dropdown-item>
            <el-dropdown-item>Action 4</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </header>

</template>

<script>
export default {
  name: 'Header',
  components: {
  },
  methods: {
    sidebar(){
      this.$store.state.sidebarOpen = !this.$store.state.sidebarOpen
    }
  }
}
</script>

<style lang="scss">
  .header{
    width: 100%;
    height: 70px;
    background: #FFFFFF;
    box-shadow: 0 2px 5px 0px rgba(0,0,0,.35);
    z-index: 100;
    &__navbar{
      display: flex;
      height: 100%;
      padding: 0 20px;
      align-items: center;
      justify-content: space-between;
    }
    &__navbar_left{
      display: flex;
      align-items: center;
      .burger{
        width: 30px;
        height: 30px;
        margin-right: 50px;
        cursor: pointer;
      }
    }
  }
</style>
