<template>
<div class="register_form_container">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="register_form">
    
    <el-form-item label="Email" prop="email">
        <el-input v-model="ruleForm.email"></el-input>
    </el-form-item>

    <el-form-item label="Password" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item>
        <router-link to="/register/">
          Регистрация
        </router-link>
    </el-form-item>
    <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">Login</el-button>
    </el-form-item>

    
    </el-form>
   <button @click="console()">Консоль</button>
</div>

</template>

<script>


export default {
  name: 'Login',
  components: {
  },
      data() {
          var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Введите пароль'));
        }else {
          callback();
        }
      };
      return {
        ruleForm: {
          email: '',
          pass: '',
        },
        rules: {
          email: [
            { required: true, message: 'Введите E-mail', trigger: 'blur' },
            { type: 'email', message: 'Введите настоящий E-mail', trigger: 'blur' }
          ],
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
        }
      };
    },
    methods: {
      async submitForm(formName) {
        this.$refs[formName].validate((valid) => {
            if (!valid) {
            return false;
            }
        });
        const formData = {
            email: this.ruleForm.email,
            password: this.ruleForm.pass,
        }
        try {
            await this.$store.dispatch('login', formData)
            this.$router.push('/')
        } catch (e) {}
        },
    console(){
      function getCookie(name) {
        let matches = document.cookie.match(new RegExp(
          "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
      }
      console.log(getCookie('user'))
    }
    }
}
</script>

<style lang="scss" scoped>
.register_form_container{
    width: 100%;
    height: 100vh;
    max-width: 600px;
    margin: 0 auto;
    display: flex;
    align-items: center;
}
.register_form_container .register_form{
    width: 100%;
}
</style>