<template>
  <div id="Header" class="bg-wrap" :style="head_pic_url">
    <!-- 头部搜索框部分 -->
    <div class="header-top" >
      <span class="return">
        <i class="icon-arrow_lift"></i>
      </span>
      <div class="search">
        <input type="text" placeholder="请输入要搜索的内容">
      </div>
      <div class="more-box">
        <span class="pindan">拼单</span>
        <span class="more">•••</span>
      </div>
    </div>
    <div class="container">
      <!-- 头部名称部分 -->
      <div class="header-center">
        <span class="logo">
          <img :src="poiInfo.pic_url" alt="麦当劳logo">
        </span>
        <h3 class="title">{{poiInfo.name}}</h3>
        <div @click="collect()" class="collect">
          <p class="start-img">
            <img src="../../assets/star.png" alt="喜欢图标">
          </p>
          <p>收藏</p>
        </div>
      </div>
      <!-- 头部公告部分 -->
      <div class="notice" v-for="(key,index) in poiInfo.discounts2" :key="index">
        <i class="new-icon bg-default" :style="'background-image:url('+ key.icon_url +')'"></i>
        <span class="notice-text">{{key.info}}</span>
        <span class="notice-link">1个活动 ></span>
      </div>
    </div>
    <!-- 弹出层 -->
    <transition name="trans">
      <div class="popups-box" v-show="displays">
        <div class="bg-img bg-default" :style="'background-image:url(' + poiInfo.poi_back_pic_url + ')'">
          <div class="popups-content">
            <p class="logo">
              <img :src="poiInfo.pic_url" alt="麦当劳logo">
            </p>
            <h3 class="popups-name">{{poiInfo.name}}</h3>
            <div class="stars">
              <app-star :stars="poiInfo.wm_poi_score"></app-star>
              <span>{{poiInfo.wm_poi_score}}</span>
            </div>
            <p class="pei-song">
              <span>{{poiInfo.min_price_tip}}</span>
              <i>|</i>
              <span>{{poiInfo.shipping_fee_tip}}</span>
              <i>|</i>
              <span>{{poiInfo.delivery_time_tip}}</span>
            </p>
            <p class="timer">配送时间：{{poiInfo.shipping_time}}</p>
            <div class="hrs"></div>
            <div class="popups-notice" v-for="(key,index) in poiInfo.discounts2" :key="index">
              <i class="new-icon bg-default" :style="'background-image:url('+ key.icon_url +')'"></i>
              <span class="popups-notice-text">{{key.info}}</span>
            </div>
          </div>
        </div>
        <span class="close-popups icon-close" @click="closePopups()"></span>
        <p class="hr"></p>
      </div>
    </transition>
  </div>
</template>

<script>
import Star from '../star/Star'
export default {
  name: "Header",
  props: {
    poiInfo: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      displays: false
    };
  },
  methods: {
    collect() {
      this.displays = true;
    },
    closePopups() {
      this.displays = false;
    }
  },
  computed: {
    head_pic_url() {
      return "background-image:url(" + this.poiInfo.head_pic_url + ")";
    }
  },
  components:{
    "app-star":Star,
  }
};
</script>

<style scoped>
@import url(../../icomoon/css/fonts.css);
.bg-default {
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
}
#Header {
  height: 160px;
}
.container {
  height: 113px;
  position: relative;
}
.header-top {
  padding-top: 20px;
  position: relative;
}
.return {
  padding: 5px;
  position: absolute;
  left: 6px;
  z-index: 2;
  color: #ccc;
}
.search {
  width: 100%;
  box-sizing: border-box;
  padding: 0 120px 0 40px;
  position: relative;
}
.search input {
  display: inline-block;
  width: 100%;
  padding: 6px 0 6px 30px;
  background-color: #eee;
  border: 0;
  border-radius: 25px;
  outline: none;
  font-size: 12px;
}
.search::before {
  content: " ";
  width: 16px;
  height: 16px;
  background: url(../../assets/search.png) center center no-repeat;
  background-size: cover;
  position: absolute;
  top: 6px;
  left: 48px;
}
.more-box {
  position: absolute;
  right: 5px;
  top: 20px;
  font-size: 12px;
  color: #fff;
}
.pindan {
  padding: 2px;
  border: 1px solid #fff;
}
.more {
  display: inline-block;
  width: 20px;
  height: 20px;
  padding: 5px 10px;
  line-height: 20px;
}
.bg-wrap {
  background-repeat: no-repeat;
  background-position: center -12px;
  background-size: 100% 135%;
}
.header-center {
  color: #fff;
}
.logo {
  display: inline-block;
  width: 45px;
  height: 45px;
  overflow: hidden;
  border-radius: 4px;
  margin: 25px 0 0 14px;
}
.logo img {
  width: 100%;
  height: 100%;
}
.title {
  color: #fff;
  position: absolute;
  top: 40px;
  left: 70px;
}
.collect {
  position: absolute;
  right: 20px;
  top: 30px;
  font-size: 12px;
}
.start-img {
  width: 25px;
  height: 25px;
  margin-bottom: 6px;
}
.start-img img {
  width: 100%;
  height: 100%;
}
.notice {
  width: 100%;
  color: #fff;
  box-sizing: border-box;
  padding: 0 10px;
  margin-top: 20px;
}
.new-icon {
  float: left;
  margin-right: 4px;
  width: 16px;
  height: 16px;
  vertical-align: middle;
}
.notice-text,
.notice-link {
  font-size: 12px;
  cursor: pointer;
}
.notice-text {
  max-width: 74%;
  line-height: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
.notice-link {
  position: absolute;
  padding: 5px 0;
  right: 8px;
  bottom: 2px;
}
.popups-box {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 3;
}
.bg-img {
  width: 90%;
  height: 80%;
  position: absolute;
  left: 50%;
  margin-left: -45%;
  margin-top: 40px;
  border-radius: 14px;
}
.close-popups {
  position: absolute;
  bottom: 26px;
  left: 50%;
  z-index: 20;
  margin-left: -20px;
  width: 40px;
  height: 40px;
  background-color: #aaa;
  border-radius: 50%;
  text-align: center;
  line-height: 40px;
  font-size: 18px;
}
.trans-enter-active, .trans-leave-active {
  transition: opacity .8s;
}
.trans-enter, .trans-leave-to {
  opacity: 0;
}
.popups-content {
  text-align: center;
  color:#ccc;
  width: 95%;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 0 12px;
  font-size: 12px;
}
.popups-content .logo {
  margin-top:40px; 
}
.popups-name {
  color: white;
  margin: 10px 0;
  font-size: 16px;
}
.pei-song {
  margin: 10px 0;
}
.pei-song i {
  margin: 0 6px;
}
.timer {
  font-size: 12px;
}
.hrs {
  margin:20px 0;
  border-bottom: 1px solid #ccc;
}

.popups-notice {
  margin:0 auto;
  text-align: center;
}
.popups-notice-text {
  vertical-align: middle;
}
.popups-notice .new-icon {
  float: none;
  width: 16px;
  height: 16px;
  display: inline-block;
}
</style>
