<template>
      <form class="record_form" @submit.prevent="saveItem">
         <div class="record_form__line">
              <p>Название:</p>
              <label>
                <input type="text" name="name" v-model="name" class="record_form__fild" placeholder="Название товара">
              </label>
          </div>
                    <div class="record_form__line">
              <button type="submit" class="record_form__button">Send</button>
          </div>
          <div class="record_form__line">
              <p>Процессор:</p>
              <label>
                <span>Название</span>
                <input type="text" name="name" v-model="processor_name" class="record_form__fild" placeholder="Название">
              </label>
              <label>
                <span>Производитель</span>
                <select v-model="processor_type" class="record_form__fild">
                    <option value="Intel">Intel</option>
                    <option value="AMD">AMD</option>
                </select>
              </label>
          </div>
          <div class="record_form__line">
              <p>Оперативная память:</p>
              <label>
                <span>Название</span>
                <input type="text" name="name" v-model="ram_name" class="record_form__fild" placeholder="Название">
              </label>
          </div>
          <div class="record_form__line">
              <p>Видеокарта:</p>
              <label>
                <span>Название</span>
                <input type="text" name="name" v-model="gpu_name" class="record_form__fild" placeholder="Название">
              </label>
              <label>
                <span>Производитель</span>
                <select v-model="gpu_type" class="record_form__fild">
                    <option value="Intel">NVIDIA</option>
                    <option value="AMD">AMD</option>
                </select>
              </label>
          </div>
          <div class="record_form__line">
              <p>SSD:</p>
              <label>
                <span>Название</span>
                <input type="text" name="name" v-model="ssd_name" class="record_form__fild" placeholder="Название">
              </label>
              <label>
                <span>Размер</span>
                <select v-model="ssd_size" class="record_form__fild">
                    <option value="240">240 GB</option>
                    <option value="480">480 GB</option>
                    <option value="500">500 GB</option>
                </select>
              </label>              
          </div>  
          <div class="record_form__line">
              <p>Жёсткий диск:</p>
              <label>
                <span>Название</span>
                <input type="text" name="name" v-model="hdd_name" class="record_form__fild" placeholder="Название">
              </label>
              <label>
                <span>Размер</span>
                <select v-model="hdd_size" class="record_form__fild">
                    <option value="2">2 терробайта</option>
                    <option value="1">1 терробайт</option>
                </select>
              </label>
          </div>  
           <div class="record_form__line">
              <p>Гарантия:</p>
              <label>
                <span>Длительность гарантии</span>
                <select v-model="gurancy_duration" class="record_form__fild">
                    <option value="12">12 месяцев</option>
                    <option value="24">24 месяца</option>
                </select>
              </label>
          </div>   
          <div class="record_form__line">
            <textarea name="description" v-model="description" class="record_form__fild" placeholder="Описание" >

            </textarea>
          </div>              
            <div class="record_form__line">
                <label>
                    <span>Активный</span>
                    <input type="checkbox" v-model="active">
                </label>
            </div>

          
      </form>
</template>

<script>
import db from './firebaseInit'
export default {
    name: 'AddProduct',
    data () {
        return {
            id: "",
            name: "",
            processor_name: "",
            processor_type: "",
            gpu_name: "",
            gpu_type: "",
            ram_name: "",
            ssd_name: "",
            ssd_size: "",
            hdd_name: "",
            hdd_size: "",
            gurancy_duration: "",
            description: "",
            active: false,
        }

    },
    methods: {
        saveItem(){
            db.collection('products').add({
                name: this.name,
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
        }
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
</style>