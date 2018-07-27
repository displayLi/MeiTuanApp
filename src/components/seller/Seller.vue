<template>
  <div id="Seller" ref="sellerScroll">
    <div class="scroll-body">
      <div class="line">
      <transversLine></transversLine>
    </div>
    <!-- 地址栏 -->
    <div class="address-box">
      <div class="address">
        <i class="stamp bgIcon"></i>
        <span class="address-text">{{sellerData.address}}</span>
        <i class="phone bgIcon icon-right"></i>
      </div>
      <div class="scrollBody" ref="spanAllW">
        <!-- ref="spanAllW" -->
          <div class="scrollXbox" v-if="sellerData.poi_env" ref="scrolled">
            <span v-for="(key,index) in sellerData.poi_env.thumbnails_url_list" :key="index" ref="imgW">
              <img :src="key">
            </span>
          </div>
      </div>
      <div class="doc">
        <i class="secure-icon bgIcon"></i>
        <span class="secure">查看食品安全档案</span>
        <i class="icon-keyboard_arrow_right bgIcon icon-right"></i>
      </div>
    </div>
    <div class="line">
      <transversLine></transversLine>
    </div>
    <!-- 配送时间位置 -->
    <div class="shopping-time">
      <div class="address">
        <i class="servers bgIcon"></i>
        <span class="address-text">配送服务：{{sellerData.app_delivery_tip}}</span>
      </div>
      <div class="doc">
        <i class="timer bgImage"></i>
        <span class="secure">配送时间：{{sellerData.shipping_time}}</span>
      </div>
    </div>
    <div class="line">
      <transversLine></transversLine>
    </div>
    <!-- 最下面盒子 -->
    <div class="seller-box" v-if="sellerData.poi_service">
       <div class="address">
        <span>
          <i class="shop-server bgImage"></i>
          <span class="address-text">商家服务</span>
        </span>
        <span>
          <img class="poi_img" :src="sellerData.poi_service[0].icon" alt="">
          <span class="address-text">{{sellerData.poi_service[0].content}}</span>
        </span>
      </div>
      <div class="doc">
        <img class="poi_img" :src="sellerData.discounts2[0].icon_url" alt="">
        <span class="secure">{{sellerData.discounts2[0].info}}</span>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import transversLine from "../transversLine/transversLine"
import BScroll from "better-scroll"
export default {
  name: 'Seller',
  data () {
    return {
      sellerData:{}
    }
  },
  methods:{

  },
  computed:{

  },
  created(){
    fetch('/api/seller')
    .then(res =>{
      return res.json();
    })
    .then(res =>{
      if (res.code == 0) {
        this.sellerData = res.data;
        this.$nextTick(e =>{
          if (this.sellerData.poi_service) {
            let imgW = this.$refs.imgW[0].clientWidth + 10;
            let spanAll = this.$refs.imgW.length;
            let spanAllWidth = imgW * spanAll + "px";
            this.$refs.scrolled.style.width = spanAllWidth;
            this.scroll = new BScroll(this.$refs.spanAllW,{scrollX:true});
          }
          this.scroll = new BScroll(this.$refs.sellerScroll,{click:true});
        })
      }
    })
  },
  components:{
    transversLine,
  }
}
</script>

<style scoped>
@import url(../../icomoon/css/fonts.css);
.line {
  margin-top:-12px;
}
#Seller {
  position: absolute;
  top: 205px;
  bottom: 0;
  overflow: hidden;
  width: 100%;
}

.address-box,.shopping-time,.seller-box{
  box-sizing: border-box;
  padding: 0 14px;
  font-size: 14px;
}
.address,.doc{
  padding: 10px 0;
  line-height: 30px;
  position: relative;
}
.bgIcon {
  display: inline-block;
  width: 16px;
  height: 18px;
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  vertical-align: middle;
}
.bgImage{
   display: inline-block;
    width: 18px;
    height: 18px;
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
    vertical-align: middle;
}
.stamp {
  background-image: url(./img/address.png);
  margin-right: 4px;
}
.icon-right{
    position: absolute;
    right: 8px;
    top: 16px;
}
.address-text {
  vertical-align: middle;
  margin-right: 20px;
}
.phone {
  background-image: url(./img/phone.png);
}
.secure-icon {
  background-image: url(./img/safety.png);
}
.servers{
  background-image: url(./img/delivery.png);
}
.timer{
  background-image: url(./img/time.png);
}

.shop-server {
  background-image: url(./img/server.png);

}
.poi_img {
  width: 18px;
  height: 18px;
  vertical-align: middle;
}

.scroll-img-body {
  width: 100%;
  overflow: hidden;
}

.scrollXbox {
  /* box-sizing: border-box;
  padding: 0; */
}

.scrollXbox span {
  display: inline-block;
  width: 120px;
  height: 88px;
  margin-right: 10px;
  border-radius:6px;
  overflow: hidden;
}
.scrollXbox span img {
  width: 100%;
  height: 100%;
}
</style>
