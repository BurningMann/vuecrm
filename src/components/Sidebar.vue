<template>
    <div class="sidebar_links_wrapper">
        <router-link 
        v-for="link in links" 
        :key="link.url" 
        tag="div" 
        class="sidebar_links_element"
        active-class="active"
        :to="link.url"
        :exact="link.exact">
          <a href="#">{{link.title}}</a>
        </router-link>
    </div>
</template>

<script>
export default {
  name: 'Sidebar',
  components: {
  },
  data: () => ({
    links: [
      { title: 'Главная', url: '/', exact: true },
      { title: 'Товары', url: '/category/' },
      { title: 'Новая запись', url: '/new/' },
      { title: 'Настройки', url: '/settings/' },
    ],
  }),
  methods: {
  }
}
</script>

<style lang="scss">
    .sidebar_links_wrapper{
        display: flex;
        flex-direction: column;
        padding: 20px 0;
        .sidebar_links_element{
            width: 100%;
            transition: .3s;
            &:hover{
                background: rgba(0,0,0,0.05);
            }
            &.active{
               background: rgba(0,0,0,0.05); 
            }
            a{
                width: 100%;
                padding: 15px 20px;
                font-size: 18px;
                font-weight: 600;
                color: #000;
                text-decoration: none;
                display: block;
            }
            
        }
    }
</style>
