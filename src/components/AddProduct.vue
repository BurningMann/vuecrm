<template>
  <form class="record_form">
    <div class="record_form__line">
      <p>Название:</p>
      <label>
        <el-input placeholder="Please input" v-model="name"></el-input>
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
      <p>Описание</p>
      <el-input
        type="textarea"
        placeholder="Please input"
        v-model="description"
        class="description"
        resize="none"
        rows="7"
        >
      </el-input>
    </div>

    <div class="record_form__line" v-for="field in FIELDS " :key="field.key">
      <p>{{field.field_name}}:</p>

      <label v-if="field.field_type == 'text'">
        <el-input placeholder="Please input" v-model="field.field_content"></el-input>
      </label>

      <label v-if="field.field_type == 'select' || field.field_type == 'multiselect'">
        <el-select v-model="field.field_content" placeholder="Select" :multiple="field.multiple">
          <el-option
            v-for="item in field.fields_list"
            :key="item.key"
            :value="item.value"
            >
          </el-option>
        </el-select>
      </label>

      <label v-if="field.field_type == 'radio'">
        <el-radio-group v-model="field.field_content">
          <el-radio 
            v-for="radio in field.fields_list"
            :key="radio.key"
            :label="radio.value"
          >
          </el-radio>
        </el-radio-group>
      </label>  
    </div>

    <div class="record_form__line">
      <label>
        <p>Активный:</p>
        <el-checkbox v-model="active" label="Товар активен ?" border></el-checkbox>
      </label>
    </div>
    
    <div class="record_form__line">
      <el-button round class="record_form__button" @click="saveItem">Добавить</el-button>
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
    },
    saveItem(){
      let fields = []
      this.FIELDS.map((element)=>{
        fields.push({
            field_type:element.field_type,
            field_content:element.field_content,
            field_name:element.field_name,
            field_multi: element.multiple,
            fields_list: element.fields_list
        })  
      })
      db.collection('products').add({
        name: this.name,
        image: this.imageName,
        description: this.description,
        active: this.active,
        date: new Date(),
        fields: fields
      })
      .then(docRef => this.$router.push('/category/'))
      .catch(error => console.log(err))
    },
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
      reader.onload = (e) => {
        this.image = e.target.result;
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
    &__button{
      width: 60%;
      display: block;
      margin: 0 auto;
      align-self: unset;
      text-transform: uppercase;
      font-weight: 600;
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