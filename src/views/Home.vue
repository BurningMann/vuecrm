<template>
  <div>
    <SettingFields/>
    <button @click="console()"></button>
  </div>
</template>

<script>

import SettingFields from '@/components/SettingFields'
import firebase from "firebase/app";
import "firebase/auth";

export default {
  name: 'Home',
  components: {
    SettingFields
  },
  methods:{
    console(){
      console.log(firebase.auth().currentUser)
/*       function getCookie(name) {
        let matches = document.cookie.match(new RegExp(
          "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
      }
      console.log(getCookie('user')) */
    }
  }
}
</script>
