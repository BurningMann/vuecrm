<template>
    <div class="products_wrapper">
        <div class="line"  v-for="product in products" :key="product.id">
            <div class="line__box"><span>{{product.name}}</span></div>
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
            products: []
        }
    },
    created () {
        db.collection('products').get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
                const data ={
                    'id': doc.id,
                    'name': doc.data().name,
                }
                this.products.push(data)
            });
        })
    },
    methods:{
        cons(){

            
        },
        dellProduct(name,id){
            db.collection('products').get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
                if(doc.id == id){
                    doc.ref.delete()  
                    this.products.map((element,index) =>{
                        if(element.id == id){
                            console.log( this.products)
                         /*    this.products.slice(index,1)
                            console.log() */
                        }
                    })  
                }
            });
        })  
        }
    }
}
</script>


<style lang="scss" scoped>
    .products_wrapper{
        display: flex;
        flex-direction: column;
        padding: 20px;
    }
    .line{
        display: flex;
        margin: 10px 0;
        box-shadow: 0 0 5px 0 rgba(0,0,0,.5);
        padding: 10px 20px;
        border-radius: 3px;
        align-items: center;
        justify-content: space-between;
    }
</style>