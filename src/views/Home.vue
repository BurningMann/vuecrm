<template>
  <div>
    <Chart/>
    <SettingFields/>
    <button @click="console()"></button>
  </div>
</template>

<script>


import {mapActions, mapGetters} from 'vuex'
import SettingFields from '@/components/SettingFields'
import Chart from '@/components/Chart'
import { Pie } from 'vue-chartjs'

export default {
  name: 'Home',
  extends: Pie,
  components: {
    SettingFields,Chart
  },
  data: ()=>({
    red : 0,
    blue : 0,
    charts : [1]
  }),
  computed:{
    ...mapGetters([
      "PRODUCTS"
    ]),
  },
  mounted(){
    this.GET_PRODUCTS_FROM_BD().then(() => {

      this.render()
    })
  },
  methods:{
    ...mapActions([
      "GET_PRODUCTS_FROM_BD"
    ]), 
    console(){
      console.log(this.PRODUCTS)
    },
    render(){
      this.PRODUCTS.map((element)=> {
        element.fields.map((f) => {
          if(f.field_name == "pill" && f.field_content == "red"){
            this.red ++
          }else if(f.field_name == "pill" && f.field_content == "blue"){
            this.blue ++
          }
        })
      })      
      this.renderChart({
        labels: ['Red', 'Blue',],
        datasets: [{
            label: 'Pill',
            data: [this.red , this.blue],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.chart{
  display: block;
    width: 800px;
    margin: 30px auto;
}
</style>
