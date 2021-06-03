<template>
  <div class="form_wrapper">
      <AddProduct/>
  </div>
</template>

<script>
import AddProduct from '@/components/AddProduct'
export default {
  name: 'Record',
  components: {
    AddProduct
  }
}
</script>


<style lang="scss" scoped>
    .form_wrapper{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: flex-start;
    }
</style>