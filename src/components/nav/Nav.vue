<template>
  <div id="Nav">
    <ul>
      <li>
        <router-link to="/goods">
          点餐
          <i></i>
        </router-link>
      </li>
      <li>
        <router-link to="/ratings">
          评价({{ratingsDatas.comment_num}})
          <i></i>
        </router-link>
      </li>
      <li>
        <router-link to="/seller">
          商家
          <i></i>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Nav',
  props:{
    ratingsDatas:{
      type:Object,
      default:{},
    }
  }
}
</script>

<style scoped> 
  ul{
    display: flex;
    border-bottom: 1px solid #eee;
  }
  li{
    flex: 1;
    text-align: center;
  }
  li a{
    display: inline-block;
    padding: 14px 20px;
  }
  li a.active{
    color:#ffbb22;
    position: relative;
  }
  li a.active i{
    width: 20px;
    height: 2px;
    background-color: #ffbb22;
    position: absolute;
    bottom: 0;
    left: 50%;
    margin-left: -10px;
  }
</style>
