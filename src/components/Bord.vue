<template>
    <div class="products_wrapper">
        <div class="products_wrapper__top_bar">
            <el-dropdown trigger="click" @command="switchSort" class="products_wrapper__button">
                <el-button type="primary">
                    Сортировать<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="name" class="active">По имени</el-dropdown-item>
                    <el-dropdown-item command="date_new">По дате добавления (сначала новые)</el-dropdown-item>
                    <el-dropdown-item command="date_old">По дате добавления (сначала старые)</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <el-dropdown trigger="click" @command="switchFilter" class="products_wrapper__button">
                <el-button type="primary">
                    Фильтровать<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="">Все</el-dropdown-item>
                    <el-dropdown-item command="active">Активные элементы</el-dropdown-item>
                    <el-dropdown-item command="deactive">Неактивные элементы</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <el-button type="success" class="check_button" v-if="currentFiltred.length != 0">
                <label>
                    <span v-if="checkProducts.length < currentFiltred.length">Выделить все элементы </span> 
                    <span v-if="checkProducts.length == currentFiltred.length">Снять выделение со всех элементов</span>  
                    <input type="checkbox" v-model="all"></label> 
            </el-button>
            <el-button type="warning" v-if="checkProducts.length !=0" @click="activateCheckedProducts">Активировать выбранные элементы</el-button>
            <el-button type="warning" v-if="checkProducts.length !=0" @click="dellCheckedProducts">Удалить выбранные элементы</el-button>
            
        </div>
        
        <div class="line"  v-for="product in resultProducts" :key="product.id">

            <div class="line__box">
                <input type="checkbox" :value="product.id" v-model="checkProducts" class="line__check" checked="checked">
                <span class="line__name">{{product.name}}</span>
                <span v-if="product.active">Активен</span>
                <span v-else>Неактивен</span>
            </div>
            <div class="line__box">
                <el-button type="primary">Подробнее</el-button>
                <el-button type="danger" @click="dellProduct(product.name,product.id)">Удалить</el-button>
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
            filter: ""
        }
    },
    created () {
        this.getProducts()
    },
    computed:{
        resultProducts(){
            this.currentFiltred = this.filterProduct()
            return this.sortProduct(this.currentFiltred)    
        },
        all: {
            get() {
                return this.checkProducts.length === this.currentFiltred.length;
            },
            set(val) {
                this.checkProducts = val ? this.currentFiltred.map(n => n.id) : [];
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
        getProducts(){
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
                db.collection('products').get().then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        if(doc.id == id){
                            doc.ref.delete()  
                            this.products.map((element,index) =>{
                                if(element.id == id){
                                    this.products.splice(index,1)
                                }
                            })  
                        }
                    });
                })
            }
        },

        dellCheckedProducts(){
            if(confirm(`Удалить выбранные товары ?`)){
                db.collection('products').get().then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        if(this.checkProducts.includes(doc.id)){
                            doc.ref.delete()  
                            console.log()
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
                db.collection('products').get().then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        /* if(this.checkProducts.includes(doc.id)){
                            doc.data().active.udate(true)
                            this.products.map((element,index) =>{
                                if(element.id == doc.id){
                                    this.products.splice(index,1)
                                }
                            })  
                        } */
                    });
                })
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

    }
}
</script>


<style lang="scss" scoped>
    .products_wrapper{
        display: flex;
        flex-direction: column;
        padding: 20px;
        &__button{
            margin-right: 10px;
        }
    }
    .line{
        display: flex;
        margin: 10px 0;
        box-shadow: 0 0 5px 0 rgba(0,0,0,.5);
        padding: 10px 20px;
        border-radius: 3px;
        align-items: center;
        justify-content: space-between;
        &__check{
            margin-right: 20px;
            cursor: pointer;
        }
        &__name{
            width: 200px;
            display: inline-block;
        }
    }
    .check_button{
        padding: 0;
    }
    .check_button label{
        padding: 12px 20px;
        display: block;
        cursor: pointer;
    }
    .check_button input{
        display: none;
    }

    .el-dropdown-menu__item.active{
        background-color: #ecf5ff;
        color: #66b1ff;
    }
</style>