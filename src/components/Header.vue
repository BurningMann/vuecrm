<template>
  <header class="header">
    <div class="header__navbar">
      <div class="header__navbar_left">
        <div class="burger" @click="sidebar()"><img src="@/assets/burger-icon.svg" alt=""></div>
        <div class="date_wrapper">{{curDate | date("datetime")}}</div>
      </div>
      <div class="header__navbar_right">
        <el-dropdown split-button type="primary" @command="handleCommand">
          {{userName}}
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="profile">Профиль</el-dropdown-item>
            <el-dropdown-item command="logout">Выйти</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </header>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";

export default {
  name: 'Header',
  components: {
  },
  data: () => ({
    curDate : new Date(),
  }),
  computed:{
    userName(){
      if(firebase.auth()){
        return firebase.auth().currentUser.email
      }
    }
  },
  methods: {
    sidebar(){
      this.$store.state.sidebarOpen = !this.$store.state.sidebarOpen
    },
    handleCommand(command){
      if(command == "logout"){
        this.$store.dispatch('logout')
        this.$router.push('/login/')
      }
    },
/*     userName(){
      console.log(firebase.auth().currentUser.email)
      return firebase.auth().currentUser.email
    } */
  },
  mounted(){
    setInterval(() => {
      this.curDate = new Date()
    }, 1000)
  },
  
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
