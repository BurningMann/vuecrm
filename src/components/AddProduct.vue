<template>
  <form class="record_form" @submit.prevent="saveItem">
    <div class="record_form__line">
      <p>Название:</p>
      <label>
        <input type="text" 
          v-model="name" 
          class="record_form__fild" 
          placeholder="Название товара"
        >
      </label>
    </div>

    <div class="record_form__line">
      <p>Детальное изображение:</p>
      <label class="image_add_line">
        <div class="image_add_box" 
          :class="{'file_open': image != ''}"
        >
          <img :src="image">
        </div>

        <input type="file" accept="image/*" @change="onFileChange">
      </label>
      <div class="dell_current_img" 
        @click="dellImg" 
        v-if="image != ''"
      >
        Удалить изображение
      </div>
    </div>

    <div class="record_form__line">
        <button type="submit" class="record_form__button">Добавить</button>
    </div>

    <div class="record_form__line" v-for="field in FIELDS " :key="field.key">
      <p>{{field.field_name}}:</p>
      <label v-if="field.field_type == 'text'">
        <el-input placeholder="Please input" v-model="fieldsId[field.field_id]"></el-input>
      </label>
      <label v-if="field.field_type == 'select'">
        <el-select v-model="fieldsId[field.field_id]" placeholder="Select">
          <el-option
            v-for="item in field.fields_list"
            :key="item.key"
            :label="item.value"
            :value="item.value">
          </el-option>
        </el-select>
      </label>
    </div>

    <div class="record_form__line">
      <label>
        <span>Активный</span>
        <input type="checkbox" v-model="active">
      </label>
    </div>
    <button @click.prevent="console()">Консоль</button>
  </form>
</template>

<script>

import db from './firebaseInit'
import axios from 'axios';
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'AddProduct',
  data: () => ({
    fieldsId:{},
    id: "",
    name: "",
    description: "",
    active: false,
    image: "",
    imageName: "",
  }),
  created(){
  },
  mounted(){
    this.GET_FIELDS_FROM_BD()
    this.FIELDS.map((element)=>{
      this.fieldsId[element.field_id]
    })
  },
  updated(){
  },
  computed: {
    ...mapGetters([
      "FIELDS"
    ]),
  },
  methods: {
    ...mapActions([
      "GET_FIELDS_FROM_BD"
    ]), 
    console(){
      console.log(this.fieldsId)
    },
    saveItem(){
      db.collection('products').add({
        name: this.name,
        image: this.imageName,
        processor_name: this.processor_name,
        processor_type: this.processor_type,
        ram_name: this.ram_name,
        gpu_name: this.gpu_name,
        gpu_type: this.gpu_type,
        ssd_name: this.ssd_name,
        ssd_size: this.ssd_size,
        hdd_name: this.hdd_name,
        hdd_size: this.hdd_size,
        gurancy_duration: this.gurancy_duration,
        description: this.description,
        active: this.active,
        date: new Date()
      })
      .then(docRef => this.$router.push('/'))
      .catch(error => console.log(err))

        /* let formData = new FormData();
        formData.append('file', this.file);
        axios.post('/img/',
            formData,
            {
            headers: {
                'Content-Type': 'multipart/form-data',
                'token': '030303039jddjdj'
            }
          }
        ).then(function(data){
          console.log(data.data);
        })
        .catch(function(){
          console.log('FAILURE!!');
        }); */
    },
      /* uploadImage(event) {

        const URL = '/img/'; 
        
        let data = new FormData();
        data.append('name', 'my-picture');
        data.append('file', event.target.files[0]); 
        let config = {
          header : {
            'Content-Type' : 'image/png'
          }
        }

        axios.post(
          URL, 
          data,
          config
        ).then(
          response => {
            console.log('image upload response > ', response)
          }
        )
      } */
      
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;
      this.imageName = files[0].name
      this.createImage(files[0]);
    },

    createImage(file) {
      var image = new Image();
      var reader = new FileReader();
      var vm = this;
      reader.onload = (e) => {
        vm.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },

    dellImg(){
      this.image = ""
    },
  },
}

</script>

<style lang="scss" scoped>
  .record_form{
    width: 100%;
    background: beige;
    box-shadow: 0 0 5px rgba(0,0,0,.5);
    &__line{
      border-bottom: 1px solid rgba(0,0,0,.2);
      padding: 20px;
      p{
        font-size: 20px;
        font-weight: 600;
      }
      label{
        display: flex;
        flex-direction: column;
      }
    }
    &__fild{
      width: 100%;
      height: 50px;
      border-radius: 5px;
      border: none;
      background: white;
      margin: 10px 0;
      padding: 10px;
      box-shadow: 0 0 5px 0 rgba(0,0,0,.5);
      option{
        font-size: 18px;
        line-height: 30px;
      }
    }
    textarea{
      height: 150px;
      resize: none;
    }
    &__button{
      width: 100%;
      background: white;
      border: 0px solid black;
      height: 50px;
      border-radius: 30px;
      text-transform: uppercase;
      font-weight: 600;
      cursor:pointer;
      box-shadow: 0 0 5px 0 rgba(0,0,0,.5);
    }
  }
  .image_add_line{
    width: max-content;
    margin: 0 auto;
    input{
      display: none;
    }
  }
  .image_add_box{
    width: 300px;
    height: 300px;
    margin: 0 auto;
    background: #FFFFFF;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 0 5px 0 rgba(0,0,0,.5);
    cursor:pointer;
    padding: 10px;
    border-radius: 5px;
    &::before{
      content:"+";
      font-size: 30px;
    }
    &.file_open{
      &::before{
        display: none;
      }
    }
    img{
      max-width: 100%;
      max-height: 100%;
    }
  }
  .dell_current_img{
    width: 300px;
    margin: 15px auto 0;
    background: #FFFFFF;
    padding: 10px 0;
    text-align: center;
    cursor: pointer;
  }
</style>