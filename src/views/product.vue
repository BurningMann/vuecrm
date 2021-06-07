<template>
  <div>
      <h1>{{curentItem.name}}</h1>

      <div class="img_box">
          <img :src="`/img/${curentItem.image}`" >
      </div>
  </div>
</template>

<script>
import db from '@/components/firebaseInit'
export default {
    name: 'Product',
    data () {
        return {
            curentItem : {},
            currentProductId: ''
        }
    },
    components: {
    },
    computed:{

    },
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
    mounted (){
        this.currentProductId = this.$route.query.productId
        this.getProducts()
    },
}
</script>

<style lang="scss" scoped>
    h1{
        text-align: center;
    }
</style>