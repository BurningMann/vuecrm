<template>
  <div class="login_container">
    <router-view/>
  </div>
</template>

<script>

import messages from '@/messages/errorMessages'

export default {
  name: 'LoginLayout',
  components: {
  },
  computed: {
    error() {
      return this.$store.getters.error
    }
  },
  watch: {
    error(fbError) {
       this.$notify.error({
          title: 'Error',
          message: messages[fbError.code],
          showClose: false
        });
    }
  }
}
</script>

<style lang="scss">
  
</style>
