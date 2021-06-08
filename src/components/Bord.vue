<template>
  <div class="products_wrapper">
    <div class="products_wrapper__top_bar">
      <el-dropdown trigger="click" @command="switchSort" class="products_wrapper__button">
          <el-button type="primary">
              Сортировать<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>

          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="name" :class="{'active': sort == 'name'}">
              По имени
            </el-dropdown-item>

            <el-dropdown-item command="date_new" :class="{'active': sort == 'date_new'}">
              По дате добавления (сначала новые)
            </el-dropdown-item>

            <el-dropdown-item command="date_old" :class="{'active': sort == 'date_old'}">
              По дате добавления (сначала старые)
            </el-dropdown-item>
          </el-dropdown-menu>
      </el-dropdown>

      <el-dropdown trigger="click" @command="switchFilter" class="products_wrapper__button">
          <el-button type="primary">
              Фильтровать<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>

          <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="" :class="{'active': filter == ''}">
                Все
              </el-dropdown-item>
              
              <el-dropdown-item command="active" :class="{'active': filter == 'active'}">
                Активные элементы
              </el-dropdown-item>

              <el-dropdown-item command="deactive" :class="{'active': filter == 'deactive'}">
                Неактивные элементы
              </el-dropdown-item>
          </el-dropdown-menu>
      </el-dropdown>

      <el-button type="success" class="check_button" 
        v-if="currentFiltred.length != 0 && checkProducts.length < currentFiltred.length"
      >
        <label>
            <span>Выделить все элементы </span> 
            <input type="checkbox" v-model="all">
        </label> 
      </el-button>

      <el-button type="success" 
        v-if="checkProducts.length <= currentFiltred.length 
        && 
        checkProducts.length !=0 || checkProducts.length > currentFiltred.length" 
        @click="removeChecked()"
      >
        <span>Снять выделение со всех элементов</span>  
      </el-button>

      <el-button type="warning" 
        v-if="checkProducts.length !=0" @click="activateCheckedProducts"
      >
        Активировать выбранные элементы
      </el-button>

      <el-button type="warning" 
        v-if="checkProducts.length !=0" 
        @click="deActivateCheckedProducts"
      >
        Деактивировать выбранные элементы
      </el-button>

      <el-button type="danger" 
        v-if="checkProducts.length !=0" 
        @click="dellCheckedProducts"
      >
        Удалить выбранные элементы
      </el-button>
    </div>
    
    <div class="products_wrapper__top_bar">
      <el-input class="serch_input"
        placeholder="Поиск"
        prefix-icon="el-icon-search"
        v-model="search"
        clearable
      >
      </el-input>

      <div class="grid_state_wrapper">
        <div class="grid_state_wrapper__box" 
          :class="{'grid_state_wrapper__box--active' : gridState == 'grid'}"
          @click="switchGridState('grid')"
        >
          <img src="@/assets/grid.svg">
        </div>

        <div class="grid_state_wrapper__box" 
          :class="{'grid_state_wrapper__box--active' : gridState == 'line'}"
          @click="switchGridState('line')"
        >
          <img src="@/assets/list.svg">
        </div>
      </div>
    </div>

    <div class="product_list_wrapper"
      :class="{
        'product_list_wrapper--line': gridState == 'line', 
        'product_list_wrapper--grid': gridState == 'grid'
      }"
    >
      <div class="line"
        v-for="product in resultProducts" 
        :key="product.id"
      >
        <div class="line__box">
          <label class="line__check">                
            <input type="checkbox" :value="product.id" v-model="checkProducts" checked="checked">
          </label>

          <span class="line__name">{{CutProductName(product.name)}}</span>

          <span v-if="product.active">Активен</span>
    
          <span v-else>Неактивен</span>
        </div>

        <div class="line__box line__box_buttons">
          <el-button type="primary" 
            @click="$router.push({ 
              path: '/product/', 
              query: { productId: product.id }
            })"
          >
            Подробнее
          </el-button>

          <el-button type="danger" 
            @click="dellProduct(product.name,product.id)"
          >
            Удалить
          </el-button>
        </div>
      </div>
    </div>

    <button @click="cons()">Консоль</button>
  </div>
</template>

<script>

import db from './firebaseInit'

export default {
  name: 'Bord',
  data () {
    return {
      products: [],
      checkProducts: [],
      currentFiltred: [],
      sort: "",
      filter: "",
      search: this.$store.state.searchProduct,
      gridState : this.$store.state.gridState,
    }
  },

  created(){
    this.getProducts()
  },

  mounted(){
    this.checkProducts = this.$store.state.currentFiltred
  },

  beforeDestroy(){
    this.$store.state.currentFiltred = this.checkProducts
    this.$store.state.searchProduct = this.search 
  },

  computed:{
    resultProducts(){
      this.currentFiltred = this.filterProduct()
      this.currentFiltred = this.sortProduct(this.currentFiltred)
      return this.currentFiltred = this.searchProduct(this.currentFiltred)   
    },
    all: {
      get(){},
      set(){
        this.currentFiltred.map(n => {
          !this.checkProducts.includes(n.id) ? this.checkProducts.push(n.id) : false
        });
      },
    },
  },

  methods:{
    cons(){  
        console.log(this.checkProducts)          
    },

    switchSort(command){
      this.$store.state.productSort = command
      this.sort = command
    },

    switchFilter(command){
      this.$store.state.productFilter = command
      this.filter = command
    },

    switchGridState(state){
      this.$store.state.gridState = state
      this.gridState = state
    },

    CutProductName(name){
      if(name.length > 40){
        return name.substr(0, 37)+'...'
      }else{return name}
    },

    removeChecked(){
      this.currentFiltred.map(element => {
        if(this.checkProducts.includes(element.id)){
          this.checkProducts.splice(this.checkProducts.indexOf(element.id),1)
        }
      })
    },

    getProducts(){
      this.products = []
      db.collection('products').get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const data ={
            'id': doc.id,
            'date': doc.data().date,
            'name': doc.data().name,
            'active': doc.data().active
          }    
          this.products.push(data)
        });
      })
    },

    dellProduct(name,id){
      if(confirm(`Удалить ${name} ?`)){
        db.collection('products').doc(id).get().then(doc => {
          doc.ref.delete()  
          this.products.map((element,index) =>{
            if(element.id == id){
              this.products.splice(index,1)
            }
          })  
        })
      }
    },

    dellCheckedProducts(){
      if(confirm(`Удалить выбранные позиции (${this.checkProducts.length}) ?`)){
        db.collection('products').get().then(querySnapshot => {
          querySnapshot.forEach(doc => {
            if(this.checkProducts.includes(doc.id)){
              doc.ref.delete()
              this.products.map((element,index) =>{
                if(element.id == doc.id){
                  this.products.splice(index,1)
                }
              })  
            }
          });
          this.checkProducts = []
        })
      }
    },

    activateCheckedProducts(){
      if(confirm(`Активировать выбранные товары ?`)){
        this.checkProducts.map((element)=>{
          db.collection('products').doc(element).update({active:true})
        })
        this.checkProducts = []
        this.getProducts()
      }
    },

    deActivateCheckedProducts(){
      if(confirm(`Деактивировать выбранные товары ?`)){
        this.checkProducts.map((element)=>{
          db.collection('products').doc(element).update({active:false})
        })
        this.checkProducts = []
        this.getProducts()
      } 
    },

    sortProduct(filtred){
      this.sort = this.$store.state.productSort
      if(this.sort == "name"){
        filtred.sort(function(a, b){
          if(a.name.toLowerCase() < b.name.toLowerCase()) { return -1; }
          if(a.name.toLowerCase() > b.name.toLowerCase()) { return 1; }
          return 0;
        })
      }else if (this.sort == "date_new"){
        filtred.sort(function(a, b){
          return b.date - a.date;
        })
      }else if (this.sort == "date_old"){
        filtred.sort(function(a, b){
          return a.date - b.date;
        })
      }
    return filtred
    },

    filterProduct(){
      this.filter = this.$store.state.productFilter
      let filtredProducts = []
      let newprod = this.products
      if(this.filter == "active"){
        newprod.map((element)=>{
          if(element.active){
            filtredProducts.push(element)
          }
        })
        return filtredProducts
      }else if(this.filter == "deactive"){
        newprod.map((element)=>{
          if(!element.active){
            filtredProducts.push(element)
          }
        })
        return filtredProducts
      }
    return this.products    
    },

    searchProduct(searching){
      let searchingProducts = []
      if( this.search != ""){
        searching.map((element)=>{
          if(element.name.toLowerCase().indexOf(this.search.toLowerCase()) != -1){
            searchingProducts.push(element)
          }
        })
        return searchingProducts
      }else{
        return searching 
      }   
    }
  }
}

</script>


<style lang="scss" scoped>

.products_wrapper {
  display: flex;
  flex-direction: column;
  padding: 20px;
  &__top_bar {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    .serch_input {
      width: calc(100% - 110px);
    }
    .grid_state_wrapper {
      width: 110px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      &__box {
        width: 35px;
        height: 35px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        margin: 0 5px;
        border: 2px solid #FFFFFF;
        padding: 2px;
        border-radius: 3px;
        &--active {
          border-color: #409EFF;
        }
      }
    }
  }
}
.product_list_wrapper{
  display: flex;
  flex-wrap: wrap;
  .line {
    display: flex;
    width: 100%;
    margin: 10px 0;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, .5);
    padding: 10px 10px 10px 100px;
    border-radius: 3px;
    align-items: center;
    justify-content: space-between;
    &__box{
      display: flex;
      position: unset;
      align-items: center;
    }
    &__check {
      cursor: pointer;
      height: 100%;
      width: 70px;
      border-right: 2px solid #ddd;
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      left: 0;
      top: 0;
    }
    &__name {
      width: 200px;
      font-weight: bold;
      display: inline-block;
      margin-right: 40px;
      word-break: break-word;
    }
    .el-button{
      margin: 0 0 0 5px;
    }
  }
  &--grid {
    margin: 0 -10px;
    .line{
      width: calc(33.333% - 20px);
      margin: 10px;
      flex-direction: column;
      padding: 20px 45px;
      &__box{
        flex-direction: column;
      }
      &__box_buttons{
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        margin-top: 10px;
      }
      &__check{
        position: absolute;
        top: 0;
        left: 0;
        width: 40px;
        height: 40px;
        border-right: 2px solid #ddd;
        border-bottom:  2px solid #ddd;
        border-radius: 0 0 5px 0;
      }
      &__name{
        width: 100%;
        text-align: center;
        margin:0 0 10px 0;
      }
      .el-button{
        min-width: 115px;
        margin: 0 5px;
      }
    }
  }
}
.check_button {
  padding: 0;
  margin-right: 10px;
}
.check_button label {
  padding: 12px 20px;
  display: block;
  cursor: pointer;
}
.check_button input {
  display: none;
}
.el-button {
  margin-left: 0;
  margin-right: 10px;
  margin-bottom: 10px;
}
.el-dropdown-menu__item.active {
  background-color: #ecf5ff;
  color: #66b1ff;
}

</style>