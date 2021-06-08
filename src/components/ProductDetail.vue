<template>
  <form class="detailProductForm">
    <h1>{{curentItem.name}}</h1>
    <div class="product_content">
      <div class="product_content__element product_content__element--img">
        <div class="product_content__img_box">
          <div class="image">
            <img :src="`/img/${curentItem.image}`" v-if="curentItem.image != ''">
            <img src="@/assets/no-img.png" v-else>
          </div>
        </div>  
        <div class="product_content__button_container">
          <el-button type="danger" 
          v-if="curentItem.image != ''"
          > 
            Удалить изображение
          </el-button>

          <el-button type="success">
            <span v-if="curentItem.image != ''">Заменить изображение</span> 
            <span v-if="curentItem.image == ''">Добавить изображение</span> 
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
      currentProductId: ''
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
}
.section_title{
  width: 100%;
  text-align: left;
  font-size: 26px;
  display: inline-block;
  margin-bottom: 20px;
}
    h1{
        text-align: left;
    }
</style>