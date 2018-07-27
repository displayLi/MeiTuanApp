<template>
    <ul id="evaluate" v-if="detailContent">
        <li class="evaluate-box" v-for="(key,index) in detailContent.comment_list" :key="index">
            <div class="evaluate-img">
                <img src="./img/anonymity.png" alt="默认图片" v-show="!key.user_icon">
                <img :src="key.user_icon" alt="">
            </div>
            <div class="evaluate-text">
                <div class="user-date">
                    <span class="users">{{key.user_name}}</span>
                    <span class="date">{{key.comment_time}}</span>
                </div>
                <div class="evaluate-conent">
                    {{key.comment_content}}
                </div>
            </div>
        </li>
    </ul>
</template>

<script>
    export default {
        name:'evaluate',
        props:{
            detailContent:{
                type:Object,
            }
        },
        data () {
            return {

            }
        },
        methods:{
            
        },
    }
</script>

<style scoped>
 #evaluate {
    box-sizing: border-box;
    padding: 0 10px;
 }
 .evaluate-box {
    width: 100%;
    font-size: 0;
    padding: 10px 0;
    line-height: 20px;
 }
 .evaluate-img {
    display: inline-block;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 10px;
    vertical-align: middle;
    overflow: hidden;
 }
 .evaluate-img img {
     width: 100%;
     height: 100%;
 }
 .evaluate-text {
    display: inline-block;
    vertical-align: middle;
    width: 80%;
 }
  .evaluate-text .user-date {
      font-size: 14px;
      color: #666;
  }
  .evaluate-text .user-date .user {
      font-size: 14px;
  }
  .evaluate-text .user-date .date{
      float: right;
  }
  .evaluate-conent {
      font-size: 14px;
  }
</style>