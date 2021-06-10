<template>
  <div class="settings">
    <h1>Настройки</h1>
    <h2>Поля</h2>
    <div class="fields_wrapper">
      <SettingFields/>

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
          v-model="sort" 
          controls-position="right" 
          :min="1" :max="999"
          placeholder="Сортирc"
          class="field_sort"
        >
        </el-input-number>
        <el-input placeholder="id_name поля" v-model="id" class="field_id"></el-input>
        <el-button type="info" plain icon="el-icon-more" disabled v-if="type == '' || type == 'text'"></el-button>
        <el-button type="info" plain icon="el-icon-more" @click="dialogFormVisible = true,current_fields_list = cancelChanges(fields_list)" v-else></el-button>
        <el-button type="success" icon="el-icon-check" circle @click="addField()"></el-button>
        <el-dialog 
          title="Поля" 
          :visible.sync="dialogFormVisible" 
          :close-on-click-modal="false"
          :show-close="false"
          class="additional_fields_box" 
        >
          <div class="field_container">
            <div class="line" v-for="input_field in fields_list" :key="input_field.key">
              <el-input 
                class="line__input"
                v-model="input_field.value" 
              >
              </el-input>
              <el-button type="danger" size="mini" icon="el-icon-circle-close" circle @click="dellAdditionalField(fields_list,input_field.key)"></el-button>
            </div>
          </div>
          <el-button @click="addAdditionalField(fields_list)">Добавить</el-button>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false,fields_list = current_fields_list">Cancel</el-button>
            <el-button type="primary" @click="dialogFormVisible = false">Confirm</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
    <button @click="console()">Консоль</button>
    <div class="button_container">
      <el-button type="success" round @click="SaveFields()">Сохранить</el-button>
      <el-button type="info" round @click="$router.push('/category/')">Отмена</el-button>
    </div>
  </div>
</template>

<script>

import db from '@/components/firebaseInit'
import SettingFields from '@/components/SettingFields'
import {mapGetters} from 'vuex'

export default {
  name: 'Settings',
  components: {
    SettingFields
  },
  data: () => ({
    sort: "",
    name: "",
    id: "",
    type: '',
    fields_list:[{key:1,value:''},{key:2,value:''},{key:3,value:''},{key:4,value:''},],
    current_fields_list: null,
    dialogFormVisible:false,
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
    },],
  }),
  computed: {
    ...mapGetters([
      "FIELDS"
    ]),
  },
  methods: {
    console(){
      console.log(this.current_fields_list)
      console.log(this.fields_list)
    },

    addField(){
      var checkId = () =>{
        let check = true
        this.FIELDS.map((element)=>{
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
            field_sort:this.sort, 
            field_id:this.id,
            fields_list: this.type != 'text' ? this.fields_list : [],
            current_fields_list: false,
            dialog: false,
            multiple: this.type == 'multiselect' ? true : false,
            field_content: this.type == 'text'||'select' ? "" : [],
          }
          this.FIELDS.push(newField_data)
          this.name = '',this.type='',this.sort='1',this.id='',this.fields_list=[{key:1,value:''},{key:2,value:''},{key:3,value:''},{key:4,value:''},]
        }else{
          this.$message.error('ID поля должно быть уникальным');
        }
      }else{
         this.$message.error('Необходимо заполнить все поля');
      }
    },

    SaveFields(){
      db.collection('fields').doc('field_settings').set({fields_setings:this.FIELDS})
      .then(docRef => this.$router.push('/'))
      .catch(error => console.log(err))
    },

    addAdditionalField(arr) {
      arr.push({
        key: Date.now(),
        value: ''
      });
    },

    dellAdditionalField(arr, id){
      arr.map((element,index)=>{
        if(element.key == id){
          arr.splice(index,1)
        }
      })
    },

    cancelChanges(arr){
      let newarr = []
      arr.map((element)=>{
        let newobj = {
          key:element.key,
          value: element.value
        }
        newarr.push(newobj)
      })
      return newarr
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
        width: 400px;
      }
      .field_sort{
        width: 100px;
        text-align: center;
        font-weight: bold;
      }
      .field_id{
         width: 200px;
      }
    }
  }
  .button_container{
    display: flex;
    justify-content: flex-end;
    margin-top: 50px;
  }
  .additional_fields_box{
    .field_container{
      .line{
        &__input{
          width: auto;
          margin-right: 10px;
          width: calc(100% - 38px);
        }
      }
      .el-input{
        margin-bottom: 10px;
      }
    }
  }
  .el-input-number.is-controls-right .el-input__inner {
    padding-left: 10px;
    padding-right: 40px;
  }
  .el-input-number__increase{
    width: 30px;
  }
</style>
