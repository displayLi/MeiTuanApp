<template>
  <div id="Goods">
    <div class="menu-class" ref="MenuClass">
      <ul>
        <li :class="{current:itemListScroll === 0}" @click="scrollIndex(0)">
          <p>
            <img :src="good_datas.tag_icon" v-if="good_datas.tag_icon" /> {{good_datas.tag_name}}
          </p>
        </li>
        <li v-for="(key,index) in contentBody" :key="index" :class="{current:itemListScroll === index + 1}" @click="scrollIndex(index + 1)">
          <p>
            <img :src="key.icon" v-if="key.icon" /> {{key.name}}
          </p>
          <!-- 数量 -->
          <i class="menu-icon-index" v-show="showIcon(key.spus)">{{showIcon(key.spus)}}</i>
        </li>
      </ul>
    </div>
    <div class="menu-content" ref="MenuContent">
      <ul>
        <!-- 专场 -->
        <li class="content-header-img item-height">
          <p v-for="(item,index) in good_datas.operation_source_list" :key="index">
            <img :src="item.pic_url">
          </p>
        </li>
        <!-- 热销等 -->
        <li class="item-height" v-for="(ele,key) in contentBody" :key="key">
          <div class="content-title">
            <i class="content-icon"></i>
            <h3>{{ele.name}}</h3>
          </div>
          <div class="product" v-for="(key,item) in ele.spus" :key="item" @click="showDetail(key)">
            <p class="product-img">
              <img :src="key.picture" v-if="key.picture">
            </p>
            <div class="list-right">
              <h3 class="title text-overflow">{{key.name}}</h3>
              <p class="dir text-overflow ">{{key.description}}</p>
              <div class="num-price-box">
                <span>{{key.month_saled_content}}</span>
                <span>{{key.praise_content}}</span>
              </div>
              <div v-if="key.product_label_picture" class="pingjia">
                <img :src="key.product_label_picture">
              </div>
              <div class="price-box">
                <span class="price-num">￥{{key.min_price}}</span>
                <span>/{{key.unit}}</span>
              </div>
              <div class="ctrl">
                <app-addcontrol :foods="key"></app-addcontrol>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <app-detail ref="detail" :detailContent="detailContent"></app-detail>
    <div class="cart">
      <app-cart :CartVal="CartVal" :foodesIndex="foodesIndex"></app-cart>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import AddControl from "../addcontrol/AddControl"
import Cart from "../shopcart/Cart"
import Detail from "../detail/Detail"
export default {
  name: "Goods",
  data() {
    return {
      good_datas: {},
      contentBody: {},
      scrollContent:{},
      scrollClass:{},
      scrollItem:[],
      scrollY:{},
      CartVal:{},
      detailContent:{},
    };
  },
  methods: {
    scrollBar() {
      this.scrollContent = new BScroll(this.$refs.MenuContent,{probeType:3,click:true});
      this.scrollClass = new BScroll(this.$refs.MenuClass,{click:true});
      this.scrollContent.on('scroll',e => {
        this.scrollY = Math.abs(Math.round(e.y));
      })
    },
    ListHeight(){
      let ListHeight = this.$refs.MenuContent.getElementsByClassName('item-height');
      let index = 0;
      this.scrollItem.push(index);
      for (let i = 0; i < ListHeight.length; i++) {
        const element = ListHeight[i];
        index += element.offsetHeight;
        this.scrollItem.push(index);
      }
    },
    scrollIndex(key){
      let DomClass = this.$refs.MenuContent.getElementsByClassName('item-height');
      let item = DomClass[key];
      this.scrollContent.scrollToElement(item,250);
    },
    showIcon(index){
      let key = 0;
      index.forEach(element => {
        if (element.index > 0) {
          key += element.index;
        }
      });
      return key;
    },
    showDetail(data){
      this.detailContent = data;
      this.$refs.detail.showView();
    }
  },
  computed:{
    foodesIndex(){
      // forEach报错但传值正常 改用forin
      let nullNum = [];
      let dataVal = this.contentBody;

      /**
      * forEach
      */

      // dataVal.forEach(element => {
      //   element.spus.forEach(e => {
      //     if (e.index > 0 ) {
      //       nullNum.push(e.index);
      //     }
      //   })
      // });

      /**
       * forin
      */
     
      for (const key in dataVal) {
        let spust = dataVal[key].spus;
        for (const i in spust) {
          if (spust[i].index > 0 ) {
            nullNum.push(spust[i]);
          }
        }
      }
      return nullNum;
    },
    itemListScroll(){
      for (let i = 0; i < this.scrollItem.length; i++) {
        let height1 = this.scrollItem[i];
        let height2 = this.scrollItem[i+1];
        if (!this.scrollY || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i;
        }
      }
      return 0;
    }
  },
  components:{
    "app-addcontrol":AddControl,
    "app-cart":Cart,
    "app-detail":Detail,
  },
  created() {
    fetch("/api/goods")
      .then(res => {
        return res.json();
      })
      .then(result => {
        if (result.code == 0) {
          this.good_datas = result.data.container_operation_source;
          this.contentBody = result.data.food_spu_tags;
          this.CartVal = result.data.poi_info;

          // 注册滚动
          this.$nextTick(pros =>{
            this.scrollBar();
            this.ListHeight();
          })
        }
      });
  }
};
</script>

<style scoped>
#Goods {
  display: flex;
  position: absolute;
  top: 206px;
  bottom: 51px;
  width: 100%;
  overflow: hidden;
}

.menu-class {
  flex: 0 0 80px;
  font-size: 13px;
}

.menu-content {
  flex: 1;
}

.menu-class li {
  padding: 16px 10px 15px 10px;
  border-bottom: 1px solid #e4e4e4;
  background-color: #f1f1f1;
  position: relative;
}

.menu-icon-index {
  position: absolute;
  right: 6px;
  top: 4px;
  color: #fff;
  background-color: red;
  width: 14px;
  height: 14px;
  border-radius:50%;
  text-align: center;
  line-height: 14px;
  font-size: 12px;
}

.menu-class li p {
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 17px;
  overflow: hidden;
}

.text-overflow {
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 14px;
}

.menu-class li img {
  width: 16px;
  height: 16px;
  vertical-align: sub;
}

.menu-content {
  width: 100%;
}
.content-header-img p {
  box-sizing: border-box;
  padding: 0 10px;
  margin-top: 8px;
}
.content-header-img img {
  width: 100%;
  border-radius: 6px;
}

.content-title {
  height: 30px;
  margin-top: 12px;
  border-top: 1px solid #e4e4e4;
  font-size: 14px;
  line-height: 30px;
}
.content-title .content-icon {
  display: inline-block;
  width: 6px;
  height: 14px;
  background-color: #ffbb22;
  margin-left: 20px;
  vertical-align: sub;
}

.content-title h3 {
  display: inline-block;
}
.product {
  width: 100%;
  box-sizing: border-box;
  padding: 0 20px 0 10px;
  margin: 20px 0;
  position: relative;
}
.product-img {
  width: 34%;
  display: inline-block;
}
.product-img img {
  width: 100%;
  vertical-align: middle;
}
.list-right {
  width: 64%;
  line-height: 18px;
  display: inline-block;
  vertical-align: middle;
}
.title {
  width: 100%;
  font-size: 14px;
  line-height: 18px;
}
.dir {
  font-size: 12px;
  color: #ccc;
}
.num-price-box {
  font-size: 12px;
  color: #666;
}
.num-price-box span {
  display: inline-block;
  padding: 5px 4px;
}
.pingjia {
  width: 58px;
  height: 16px;
}
.pingjia img {
  width: 100%;
  height: 100%;
}
.price-box {
  font-size: 12px;
  color: #666;
  font-weight: bold;
}
.price-box .price-num {
  color: red;
}
#Goods .current{
  background-color: #fff;
  font-weight: bold;
}
.ctrl {
  position: absolute;
  right: 20px;
  bottom: 6px;
}
.cart {
  width: 100%;
  position: fixed;
  bottom: 0;
  z-index:2;
}
</style>
