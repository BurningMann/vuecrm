<template>
  <div class="fields_wrapper__box">
    <div class="fields_wrapper__line" v-for="field in sortFields" :key="field.field_id">
      <el-input placeholder="Название поля" v-model="field.field_name" class="field_name"></el-input>
      <el-select v-model="field.field_type" placeholder="Тип поля" @change="field.multiple = changeMulti(field.field_type,field.multiple),field.field_content = changeFieldContentType(field.field_type)">
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
        :controls="false"
        :min="1" :max="999"
        placeholder="Сортирc"
        class="field_sort"
      >
      </el-input-number>
      <el-input placeholder="id_name поля" v-model="field.field_id" class="field_id" disabled></el-input>

      <el-button type="info" plain icon="el-icon-more" disabled v-if="field.field_type == 'text'"></el-button>
      <el-button type="info" plain icon="el-icon-more" @click="field.dialog = true,field.current_fields_list = cancelChanges(field.fields_list)" v-else></el-button>
    <el-dialog 
      title="Поля" 
      :visible.sync="field.dialog" 
      :close-on-click-modal="false"
      :show-close="false"
      class="additional_fields_box" 
    >
      <div class="field_container">
        <div class="line" v-for="input_field in field.fields_list" :key="input_field.key">
          <el-input 
            class="line__input"
            v-model="input_field.value" 
          >
          </el-input>
          <el-button type="danger" size="mini" icon="el-icon-circle-close" circle @click="dellAdditionalField(field.fields_list,input_field.key)"></el-button>
        </div>
      </div>
      <el-button @click="addAdditionalField(field.fields_list)">Добавить</el-button>
      <span slot="footer" class="dialog-footer">
        <el-button @click="field.dialog = false,field.fields_list = field.current_fields_list">Cancel</el-button>
        <el-button type="primary" @click="field.dialog = false">Confirm</el-button>
      </span>
    </el-dialog>
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
</template>

<script>

import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'SettingFields',
  components: {
  },
  data: () => ({
    fields_data: [],
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
  mounted(){
    this.GET_FIELDS_FROM_BD()
  },
  computed: {
    ...mapGetters([
      "FIELDS"
    ]),
    sortFields(){
      if(this.FIELDS){
        this.FIELDS.sort(function(a, b){
            return a.field_sort - b.field_sort;
        })
        return this.FIELDS
      }else{
        return []
      }
    }
  },
  methods:{
    ...mapActions([
      "GET_FIELDS_FROM_BD"
    ]),    
    dellCurrentField(field_id){
      this.FIELDS.map((element,index)=>{
        if(element.field_id == field_id){
          this.FIELDS.splice(index,1)
        }
      })
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
    changeMulti(type,multi){
      if(type != 'multiselect'){
        return false
      }else{
        return true
      }
    },
    changeFieldContentType(type){
      if(type == 'multiselect'){
        return []
      }else{
        return ""
      }
    },
  },
}
</script>

<style lang="scss" scoped>
  .fields_wrapper{
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
