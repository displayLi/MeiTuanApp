<template>
  <div id="app">
   <app-header :poiInfo="poiInfo"></app-header>
   <app-nav :ratingsDatas="ratingsDatas"></app-nav>
   <keep-alive>
    <router-view></router-view>
   </keep-alive>
  </div>
</template>

<script>
import Header from '@/components/header/Header'
import Nav from '@/components/nav/Nav'
export default {
  name: 'App',
  data(){
    return {
      poiInfo:{},
      ratingsDatas:{},
    }
  },
  components:{
    'app-header':Header,
    'app-nav':Nav
  },
  created(){
    fetch('/api/goods')
         .then(res => {
          return res.json()
         })
         .then(result => {
           if (result.code == 0) {
             this.poiInfo = result.data.poi_info;
           }
         })
         fetch('/api/ratings')
         .then(res => {
          return res.json()
         })
         .then(result => {
           if (result.code == 0) {
             this.ratingsDatas = result.data;
           }
         })
  }
}
</script>

<style>
</style>
