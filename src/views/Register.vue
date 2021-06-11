<template>
<div class="register_form_container">
<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="register_form">

  <el-form-item label="Name" prop="name">
    <el-input v-model="ruleForm.name"></el-input>
  </el-form-item>
  
  <el-form-item label="Email" prop="email">
    <el-input v-model="ruleForm.email"></el-input>
  </el-form-item>


  <el-form-item label="Password" prop="pass">
    <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="Confirm" prop="checkPass">
    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
  </el-form-item>
    <el-form-item>
        <router-link to="/login/">
          Уже есть аккаунт, войти?
        </router-link>
    </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">Create</el-button>
    <el-button @click="resetForm('ruleForm')">Reset</el-button>
  </el-form-item>
  
</el-form>
</div>

</template>

<script>


export default {
  name: 'Register',
  components: {
  },
      data() {
          var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Введите пароль'));
        } else if(value.length < 6){
           callback(new Error('Пароль должен быть больше 6 символов'));
        }
        else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Повтрите пароль'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('Пароли не совпадают'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          email: '',
          pass: '',
          checkPass: '',
          name: '',
        },
        rules: {
          name: [
            { required: true, message: 'Введите ваше Имя', trigger: 'blur' }
          ],
          email: [
            { required: true, message: 'Введите E-mail', trigger: 'blur' },
            { type: 'email', message: 'Введите настоящий E-mail', trigger: 'blur' }
          ],
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: ['blur', 'change'] }
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
          name: this.ruleForm.name
        }
        try {
          await this.$store.dispatch('register', formData)
          this.$router.push('/')
        } catch (e) {} 

      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
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