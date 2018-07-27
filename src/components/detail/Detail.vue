<template>
    <transition name="detail">
        <div v-show="detail"  id="detail-container" ref="scrollBar">
            <div class="box">
                <div class="detail-content">
                <div class="detail-img">
                    <img class="project-img" :src="detailContent.picture" alt="产品图片">
                    <p class="icon-box">
                        <span @click="showView()" class="iconClose icon-close"></span>
                        <span class="more"><img src="./img/more.png" alt="更多"></span>
                        <span class="share"><img src="./img/share.png" alt="分享"></span>
                    </p>
                </div>
                <div class="detail-body">
                    <h3 class="detail-title">{{detailContent.name}}</h3>
                    <p class="detail-num">{{detailContent.month_saled_content}}</p>
                    <p class="detail-dp" v-show="detailContent.product_label_picture">
                        <img :src="detailContent.product_label_picture" alt="大众点评图标">
                    </p>
                    <span class="detail-priceBox">
                        <span class="detail-price">￥{{detailContent.min_price}}</span>
                        <span class="detail-unit">/{{detailContent.unit}}</span>
                    </span>
                    <app-addcontrol :foods="detailContent" class="addProduct" v-show="detailContent.index"></app-addcontrol>
                    <div class="select" @click="btnClick()" v-show="!detailContent.index || detailContent.index == 0">
                        选规格
                    </div>
                    </div>
                <transversLine></transversLine>
            </div>
            <div class="evaluate-header" v-if="detailContent.rating">
                <span class="pj-number">{{detailContent.rating.title}}
                    <span style="font-size:13px;">( {{detailContent.rating.like_ratio_desc}}</span>
                    <span style="color:red">{{detailContent.rating.like_ratio}}</span>
                    )
                </span>
                <span class="pj-sl icon-keyboard_arrow_right">{{detailContent.rating.snd_title}}</span>
            </div>
            <div class="evaluate-body">
                <app-evaluate :detailContent="detailContent.rating"></app-evaluate>
            </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import transversLine from "../transversLine/transversLine"
    import AddControl from "../addcontrol/AddControl"
    import BScroll from "better-scroll"
    import Vue from "vue"
    import Evaluate from "../evaluate/Evaluate"
    export default {
        name:'Detail',
        props:{
            detailContent:{
                type:Object,
                default:{},
            },
        },
        data() {
            return {
                detail:false,
            }
        },
        methods:{
            showView() {
                if (!this.detail) {
                    this.detail = true;
                    this.$nextTick(e =>{
                        if (!this.scroll) {
                            this.scroll = new BScroll(this.$refs.scrollBar,{click:true})
                        }else {
                            this.scroll.refresh();
                        }
                    })
                }else {
                    this.detail = false;
                }
            },
            btnClick(){
                Vue.set(this.detailContent,"index",1);
            },
        },
        components:{
            "app-addcontrol":AddControl,
            "transversLine":transversLine,
            "app-evaluate":Evaluate,
        },
    }
</script>

<style scoped>
    @import url(../../icomoon/css/fonts.css);
    #detail-container{
        position: fixed;
        left: 0;
        top: 0;
        bottom: 50px;
        width: 100%;
        background-color: white;
        z-index:2;
    }
    .detail-enter-active, .detail-leave-active {
        transition: transform 1s;
    }
    .detail-enter, .detail-leave-to {
        transform: translateX(100%);
    }
    .detail-content {
        padding-top:100%; 
        position: relative;
    }
    .detail-img{
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
    }
    .detail-img .project-img {
       width: 100%;
    }
    .icon-box {
        position: absolute;
        width: 100%;
        height: 30px;
        top: 20px;
    }
    .icon-box .more,.icon-box .share {
        float: right;
        width: 30px;
        height: 30px;  
    }
    .icon-box .share {
        margin-right: 10px;
    }
    .icon-box .more {
        margin-right: 14px;
    }
    .icon-box .more img,.icon-box .share img{
        width: 100%;
        height: 100%;
    }
    .iconClose {
        display: inline-block;
        width: 30px;
        height: 100%;
        margin-left: 20px;
        background-color: #666;
        color: #fff;
        text-align: center;
        line-height: 30px;
        font-size: 20px;
        border-radius: 50%;
        font-weight: bold;
    }
    .detail-body {
        box-sizing: border-box;
        padding: 0 18px;
        line-height: 20px;
    }
    .detail-title {
        font-weight: bold;
    }
    .detail-num {
        font-size: 14px;
        color: #c0c0c0;
    }
    .detail-dp {
        width: 80px;
        height: 22px;
        margin: 2px 0;
    }
    .detail-dp img{
        width: 100%;
        height: 100%;
    }
    .detail-priceBox {
        font: bold 14px/14px "Microsoft YaHei";
    }
    .detail-priceBox .detail-price {
        color: red;
    }
    .detail-priceBox .detail-unit {
        color: #666;
    }
    .select {
        float: right;
        width: 60px;
        height: 30px;
        background-color:#ffbb22;
        text-align: center;
        line-height: 30px;  
        border-radius: 6px;
        font-size: 14px;
        margin-top:-20px;
    }
    .addProduct {
        float: right;
    }
    .evaluate-header {
        box-sizing: border-box;
        padding: 0 10px;
        font-size: 14px;
        font-weight: bold;
        line-height: 40px;
    }
    .pj-sl {
        float: right;
        position: relative;
        top: 12px;
        right: 10px;
        color: #666;
        font-weight: 400;
        vertical-align: middle;
    }
</style>