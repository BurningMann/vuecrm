<template>
  <div class="settings">
    <h1>Настройки</h1>
    <h2>Поля</h2>
    <div class="fields_wrapper">
      <div class="fields_wrapper__box">
        <div class="fields_wrapper__line" v-for="field in sortFields" :key="field.field_id">
          <el-input placeholder="Название поля" v-model="field.field_name" class="field_name"></el-input>
          <el-select v-model="field.field_type" placeholder="Тип поля">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <el-input-number 
            v-model="field.field_sort" 
            controls-position="right" 
            @change="handleChange" 
            :min="1" :max="999"
            placeholder="Сортирc"
            class="field_sort"
          >
          </el-input-number>
          <el-input placeholder="id_name поля" v-model="field.field_id" class="field_id"></el-input>
          <el-popconfirm
            confirm-button-text='OK'
            cancel-button-text='No'
            icon="el-icon-info"
            icon-color="red"
            title="Удалить это поле?"
            @confirm="dellCurrentField(field.field_id)"
          >
            <el-button slot="reference" type="danger" icon="el-icon-delete" circle ></el-button>
          </el-popconfirm>
        </div>
      </div>

      <h2>Добавить поле</h2>

      <div class="fields_wrapper__line ">
        <el-input placeholder="Название поля" v-model="name" class="field_name"></el-input>
        <el-select v-model="type" placeholder="Тип поля">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-input-number 
        v-model="num" 
        controls-position="right" 
        @change="handleChange" 
        :min="1" :max="999"
        placeholder="Сортирc"
        class="field_sort"
        >
        </el-input-number>
        <el-input placeholder="id_name поля" v-model="id" class="field_id"></el-input>
          <el-button type="success" icon="el-icon-check" circle @click="addField()"></el-button>
      </div>
    </div>

    <div class="button_container">
      <el-button type="success" round @click="SaveFields()">Сохранить</el-button>
      <el-button type="info" round @click="$router.push('/category/')">Отмена</el-button>
    </div>
  </div>
</template>

<script>

import db from '@/components/firebaseInit'

export default {
  name: 'Settings',
  components: {
  },
  data: () => ({
    fields_data: [
      {field_name:"Название", field_type:"Text", field_sort: 10, field_id: "product_name"},
      {field_name:"проц", field_type:"Text", field_sort: 20, field_id: "proc_name"},
      {field_name:"проц", field_type:"Text", field_sort: 20, field_id: "asd"},
    ],
    num: "",
    name: "",
    id: "",
    type: '',
    options: [{
      value: 'text',
      label: 'Text'
    }, {
      value: 'select',
      label: 'Select'
    },{
      value: 'multiselect',
      label: 'Multiselect'
    },{
      value: 'radio',
      label: 'Radio'
    },{
      value: 'checkbox',
      label: 'Checkbox'
    },],
   
  }),
  computed: {
    sortFields(){
      this.fields_data.sort(function(a, b){
          return a.field_sort - b.field_sort;
      })
    return this.fields_data
    }
  },
  methods: {
    handleChange(){},

    addField(){
      var checkId = () =>{
        let check = true
        this.fields_data.map((element)=>{
          if(element.field_id == this.id){
            check = false
          }
        })
        return check
      }
      if(this.name !='' && this.type !='' && this.id !=''){
        if(checkId()){
          const newField_data = {
            field_name:this.name, 
            field_type:this.type, 
            field_sort:this.num, 
            field_id:this.id
          }
          this.fields_data.push(newField_data)
          this.name = '',this.type='',this.num='1',this.id=''
        }else{
          this.$message.error('ID поля должно быть уникальным');
        }
      }else{
         this.$message.error('Необходимо заполнить все поля');
      }
    },

    dellCurrentField(field_id){
      this.fields_data.map((element,index)=>{
        if(element.field_id == field_id){
          this.fields_data.splice(index,1)
        }
      })
    },

    SaveFields(){
      db.collection('fields').doc('field_settings').set({fields_setings:this.fields_data})
      .then(docRef => this.$router.push('/'))
      .catch(error => console.log(err))
    },
  }
}
</script>


<style lang="scss" scoped>
    .settings{
        padding: 0 40px;
    }
  .fields_wrapper{
    display: flex;
    flex-wrap: wrap;
    &__box{
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 50px;
    }
    &__line{
      width: 100%;
      display: flex;
      justify-content: space-between;
      background: lightseagreen;
      padding: 10px;
      border-radius: 5px;
      margin-bottom: 10px;
      input{
        height: 40px;
        border: none;
        border-radius: 5px;
        padding: 0 10px;
        outline: none;
        font-size: 18px;
      }
      .field_name{
        width: 35%;
      }
      .field_sort{
        width: 10%;
        text-align: center;
        font-weight: bold;
      }
      .field_id{
         width: 20%;
      }
    }
  }
  .button_container{
    display: flex;
    justify-content: flex-end;
    margin-top: 50px;
  }
  .el-input-number.is-controls-right .el-input__inner {
    padding-left: 10px;
    padding-right: 40px;
  }
  .el-input-number__increase{
    width: 30px;
  }
</style>
