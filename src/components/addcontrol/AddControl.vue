<template>
    <div id="AddControl">
        <div class="icon-box">
            <transition name="animation">
                <div v-show="foods.index" 
                     class="sub-icon icon-remove_circle_outline" 
                     @click.prevent.stop="computedsDelete()"
                >
                </div>
            </transition>
            <transition name="number">
                <div v-show="foods.index" class="text-num">{{foods.index}}</div>
            </transition>
            <div class="add-icon icon-add_circle" 
                 @click.prevent.stop="computedsAdd()"
            >
                <i class="add_bgc"></i>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from "vue"
    export default {
        name:"AddControl",
        props:{
            foods:{
                type:Object,
                default:{}
            },
        },
        data() {
            return {

            }
        },
        methods:{
            computedsDelete(){
                if (this.foods.index -- <= 1) {
                    this.foods.index = 0;
                }
            },
            computedsAdd(){
                if (!this.foods.index) {
                    Vue.set(this.foods,"index",1);
                }else {
                    this.foods.index++;
                }
            }
        }
    }
</script>

<style scoped>
    @import url(../../icomoon/css/fonts.css);
    .add-icon,.sub-icon,.sub-icon,.text-num{
        display: inline-block;
        vertical-align: middle;
        font-size: 26px;
    }
    .text-num {
        font-size: 16px;
    }
    .add-icon{
        color:#ffbb22;
        position: relative;
    }
    .add_bgc {
        background-color: #000;
        position: absolute;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        left: 4px;
        top: 6px;
        z-index: -1;
    }
    .sub-icon {
        color:#b4b4b4;
    }
    /* 按钮 ==== 数字 */
    .animation-enter-active,.number-enter-active {
        transition: all 1s;
    }
    .animation-leave-active,.number-leave-active {
        transition: all 1s;
    }
    .animation-enter, .animation-leave-to,.number-enter, .number-leave-to {
        transform: translateX(30px) rotate(180deg);
        opacity: 0;
    }
</style>