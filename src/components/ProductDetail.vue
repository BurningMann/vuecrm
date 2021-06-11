<template>
  <form class="detailProductForm">
    <h1><el-input 
            placeholder="Please input" 
            v-model="curentItem.name" 
            class="page_h1"
          >
          </el-input>
    </h1>
    <div class="product_content">
      <div class="product_content__element product_content__element--img">
        <div class="product_content__img_box">
          <div class="image">
            <img :src="`/img/${curentItem.image}`" v-if="curentItem.image != '' && !newImageStatus">
            <img :src="newImage" v-else-if="newImageStatus">
            <img src="@/assets/no-img.png" v-else>
          </div>
        </div>  
        <div class="product_content__button_container">
          <el-button type="danger" 
          v-if="curentItem.image != ''"
          @click="curentItem.image = '', newImage = '', newImageStatus = false"
          > 
            Удалить изображение
          </el-button>
          <el-button type="success" class="add_image_btn">
            <label>
              <span v-if="curentItem.image != '' || newImage != '' ">Заменить изображение</span> 
              <span v-if="curentItem.image == '' && newImage == '' ">Добавить изображение</span> 
              <input type="file" accept="image/*" @change="onFileChange" id="gorgc">
            </label>
          </el-button> 
        </div>
      </div>
      <div class="product_content__element">
        <div class="product_description">
          <span class="section_title">Описание</span>
          <textarea v-model="curentItem.description"></textarea>
        </div>
      </div>
    </div>
    <div class="data_list">
      <span class="section_title">Данные</span>
      <div class="data_list__line" v-for="field in curentItem.fields" :key="field.id">
        <span class="data_list__title">{{field.field_name}}:</span> 
        <div class="data_list__content">
          <el-input 
            placeholder="Please input" 
            v-model="field.field_content" 
            v-if="field.field_type == 'text'"
          >
          </el-input>

          <el-select 
            v-model="field.field_content" 
            placeholder="Select" 
            :multiple="field.field_multi" 
            v-if="field.field_type == 'select' || field.field_type == 'multiselect'"
          >
            <el-option
              v-for="item in field.fields_list"
              :key="item.key"
              :value="item.value">
            </el-option>
          </el-select>

          <el-radio-group 
            v-model="field.field_content" 
            v-if="field.field_type == 'radio'"
          >
            <el-radio 
              v-for="radio in field.fields_list"
              :key="radio.key"
              :label="radio.value"
            >
            </el-radio>
          </el-radio-group>
        </div>
      </div>
      <div class="data_list__line">
        <span class="data_list__title">Активен:</span> 
        <div class="data_list__content">
          <el-checkbox v-model="curentItem.active"></el-checkbox>
        </div>
      </div>
    </div>
    <div class="footer_button_container">
      <el-button 
        type="info" 
        icon="el-icon-back" 
        round 
        @click="$router.push('/category/')"
      >
        Назад
      </el-button>
      <el-button 
        type="success" 
        icon="el-icon-check" 
        round 
        @click="Save()"
      >
        Сохранить
      </el-button>
    </div>
  </form>
</template>

<script>

import db from '@/components/firebaseInit'

export default {
  name: 'ProductDetail',
  components: {},
  data () {
    return {
      curentItem : {},
      currentProductId: '',
      newImage: '',
      newImageStatus: false
    }
  },
  mounted (){
    this.currentProductId = this.$route.query.productId
    this.getProducts()
  },

  computed:{},

  methods:{
    getProducts(){
      db.collection('products').doc(this.currentProductId).get()
      .then((doc) => {
        if (doc.exists) {
          this.curentItem = doc.data()
        } else {
          console.log("No such document!");
        }
      })
    },
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length){
        return;
      }
      this.curentItem.image = files[0].name
      this.createImage(files[0]);
    },

    createImage(file) {
      var image = new Image();
      var reader = new FileReader();
      reader.onload = (e) => {
        this.newImage = e.target.result;
        this.newImageStatus = true
      };
      reader.readAsDataURL(file);
    }, 
    Save(){
      db.collection('products').doc(this.currentProductId).set(this.curentItem)
      .then(docRef => this.$router.push('/category/'))
      .catch(error => console.log(err))
    },   
  },
}
</script>

<style lang="scss" scoped>
.detailProductForm{
padding: 0 40px 100px;
}
.product_content{
  display: flex;
  &__element{
    width: 70%;
    &--img{
      width:30%;
    }
  }
  &__img_box{
    width: 100%;
    padding-top: 100%;
    background: darkcyan;
    .image{
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      input{
        display: none;
      }
    }
  }
  &__button_container{
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
}
.product_description{
  width: 100%;
  padding: 0 40px;
  textarea{
    width: 100%;
    resize: none;
    height: 300px;
    border: none;
    box-shadow: 0 0 5px 0 rgba(0,0,0,.5);
    outline: none;
    border-radius: 5px;
    padding: 20px;
    font-size: 18px;
  }
}
.data_list{
  margin-top: 40px;
  &__line{
    display: flex ;
    margin: 10px 0;
    align-items: center;
    min-height: 40px;
  }
  &__title{
    font-weight: bold;
    margin-right: 20px;
    width: 100px;
  }
  &__content{}
}
.section_title{
  width: 100%;
  text-align: left;
  font-size: 26px;
  display: inline-block;
  margin-bottom: 20px;
}
#gorgc{
  display: none;
}
.add_image_btn{
  padding: 0;
  
  label{
    cursor: pointer;
    display: block;
    padding: 12px 20px;
  }
}
.footer_button_container{
  margin-top: 50px;
  display: flex;
  justify-content: flex-end;
}
.page_h1{
    font-size: 30px;
    font-weight: bold;
    color: #000;
    text-align: left;
    .el-input__inner{
      color: #000;
    }
}
</style>