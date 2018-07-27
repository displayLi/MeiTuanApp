<template>
  <div id="Ratings" ref="ratingsScroll">
    <div class="scroll-box">
        <div class="rating-box">
        <div class="product-box">
          <div class="product-num">{{ratingsData.comment_score}}</div>
          <div class="seller-text">商家评分</div>
        </div>
        <div class="star-box">
          <div class="star-content">
            <p class="star-lineMargin">
              <span class="star-text">口味</span>
              <Star :stars="ratingsData.quality_score"></Star>
              <span class="score">{{ratingsData.quality_score}}</span>
            </p>
            <p class="star-lineMargin">
              <span class="star-text">包装</span>
              <Star :stars="ratingsData.pack_score"></Star>
              <span class="score">{{ratingsData.pack_score}}</span>            
            </p>
          </div>
        </div>
        <div class="express">
          <div class="express-box">
            <div class="express-num product-num">{{ratingsData.delivery_score}}</div>
            <div class="seller-text">配送评分</div>
          </div>
        </div>
      </div>
      <transversLine></transversLine>
      <div class="tab-box" v-if="ratingsData.tab">
        <div class="tab">
          <span 
            class="tab-all"
            @click="ratingsTypefn(0)"
            :class="{active:ratingsType == 0}"
          >{{ratingsData.tab[0].comment_score_title}}
          </span>
          <span
            class="tab-img"
            @click="ratingsTypefn(1)"
            :class="{active:ratingsType == 1}"
          >{{ratingsData.tab[1].comment_score_title}}
          </span>
          <span
            class="tab-evaluate"
            @click="ratingsTypefn(2)"
            :class="{active:ratingsType == 2}"
          >
            <img v-show="ratingsType == 2" src="./img/icon_sub_tab_dp_highlighted@2x.png" alt="">
            <img v-show="ratingsType != 2" src="./img/icon_sub_tab_dp_normal@2x.png" alt="">
          {{ratingsData.tab[2].comment_score_title}}
          </span>
        </div>
        <div class="dir">
          <span class="label-box" v-for="(item,index) in ratingsData.labels" :key="index">{{item.content}}{{item.label_count}}</span>
        </div>
      </div>
      <ul id="evaluate">
          <li class="evaluate-box" v-for="(key,index) in commentsData" :key="index">
              <div class="evaluate-img">
                  <img src="./img/anonymity.png" alt="默认图片" v-show="!key.user_pic_url">
                  <img :src="key.user_pic_url" alt="">
              </div>
              <div class="evaluate-text">
                  <div class="user-date">
                      <span class="users">{{key.user_name}}</span>
                      <span class="date">{{key.comment_time}}</span>
                      <p class="star-text">
                        评分：<Star :stars="key.order_comment_score"></Star>
                      </p>
                  </div>
                  <div class="evaluate-conent">
                      {{key.comment}}
                  </div>
                  <div class="data-img" v-for="(item,index) in key.comment_pics" :key="index">
                    <img :src="item.thumbnail_url" alt="">
                  </div>
              </div>
          </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Star from "../star/Star"
import BScroll from "better-scroll"
import transversLine from "../transversLine/transversLine"
const ALL = 0, IMG = 1, EVALUATE = 2; 
export default {
  name: 'Ratings',
  data () {
    return {
      ratingsData:{}, 
      ratingsType:ALL
    }
  },
  methods:{
    ratingsTypefn(type) {
      this.ratingsType = type;
    }
  },
  computed:{
    commentsData(){
      if (this.ratingsType == ALL) {
        return this.ratingsData.comments;
      }else if (this.ratingsType == IMG) {
        let arr = [];
        this.ratingsData.comments.forEach(element => {
          if (element.comment_pics.length) {
            arr.push(element);
          }
        });
        return arr;
      }else {
        return this.ratingsData.comments_dp.comments;
      }
    }
  },
  components:{
    Star,
    transversLine,
  },
  created(){
    fetch("/api/ratings")
        .then(res =>{
          return res.json()
        })
        .then(res =>{
          if (res.code == 0) {
            this.ratingsData = res.data;
            this.$nextTick(e =>{
              if (!this.scroll) {
                this.scroll = new BScroll(this.$refs.ratingsScroll,{click:true});
              }else {
                this.scroll.refresh();
              }
            })
          }
        })
  }
}
</script>

<style scoped>
  #Ratings {
    position: absolute;
    width: 100%;
    top: 205px;
    bottom: 0;
    overflow: hidden;
  }
  .data-img {
    margin:10px 0; 
    width: 200px;
    height: 300px;
  }
  .data-img img{
    width: 100%;
    height: 100%;
  }
  .rating-box{
    box-sizing: border-box;
    padding: 8px 16px;
    padding-top:20px; 
    display:flex;
  }
  .product-box{
    flex: 0 0 80px;
    text-align: center;
  }
  .product-num{
    color: #ffbb22;
    font-size: 18px;
    font-weight: bold;
  }
  .seller-text {
    color: #333;
    font-size: 14px;
    padding-top: 8px;
  }
  .star-box {
    flex: 1;
  }
  .star-content {
    padding: 8px 0 0 16px;
    font-size: 12px;
    color: #666;
  }
  .star-lineMargin {
    margin-bottom: 6px;
  }
  .star-text {
    margin-right: 8px;
  }
  .score {
    color: #ffbb22;
    font-size: 12px;
    margin-left: 6px;
  }
  .express {
    text-align: center;
    color: #666;
    border-left: 1px solid #ccc;
  }
  .express-box {
    margin: 0 0 0 18px;
  }
  .express-num {
    color: #999;
  }
  .tab-box{
    box-sizing: border-box;
    padding:16px 14px;
  }
  .tab{
    display: flex;
    text-align: center;
    font-size: 14px;
    border:1px solid #ffbb22;
    border-radius: 6px;
    color: #ffbb22;
  }
  .tab-all,.tab-img, .tab-evaluate{
    display: inline-block;
    height: 30px;
    line-height: 30px;
  }
  .tab-img, .tab-evaluate{
    border-left: 1px solid #ffbb22;
  }
  .tab-all{
    flex: 1;
  }
  .tab-img{
    flex: 1;
  }
  .tab-evaluate {
    flex: 1;
    vertical-align: middle;
  }
  .tab-evaluate img {
    width: 18px;
    height: 18px;
    vertical-align: middle;
  }
  #Ratings .active{
    color: #000;
    background-color: #ffbb22;
    font-weight: bold;
  }
  .dir{
    margin-top: 16px;
  }
  .label-box {
    text-align: center;
    padding: 3px 5px;
    background-color: #ececec;
    font-size: 12px;
    color: #666;
    margin-right: 8px;
    margin-top: 20px;
    border-radius:4px; 
  }

  #evaluate {
    box-sizing: border-box;
    padding: 0 10px;
 }
 .evaluate-box {
    width: 100%;
    font-size: 0;
    padding: 18px 0;
    line-height: 20px;
 }
 .evaluate-img {
    display: inline-block;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 10px;
    vertical-align:text-top;
    overflow: hidden;
 }
 .evaluate-img img {
     width: 100%;
     height: 100%;
 }
 .evaluate-text {
    vertical-align: text-top;
    display: inline-block;
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
      font-size: 12px;
  }
  .star-text {
    font-size: 12px;
    color: #666;
  }
</style>
