<template>
    <div id="cart">
        <div class="foot-cart">
            <div class="cart-icon">
                <i class="cart-icon-child icon-shopping_cart" :class="{active:cartNum}"></i>
                <i v-show="cartNum" class="cart-icon-num">{{cartNum}}</i>
                <div class="text">
                    <p class="cart-price" v-show="cartNum">￥{{cartPrice}}</p>
                    <p>另需{{CartVal.shipping_fee_tip}}</p>
                </div>
            </div>
            <div class="cart-btn" :class="{active:cartNum}">{{cartNum ? '去结算': CartVal.min_price_tip}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        name:'catr',
        props:{
            CartVal:{
                type:Object,
                default:{},
            },
            foodesIndex:{
                type:Array,
                default(){
                    return [

                    ]
                }
            }
        },
        data() {
            return {

            }
        },
        computed:{
            cartNum(){
                let index = 0;
                this.foodesIndex.forEach(element => {
                    if (element.index > 0) {
                        index += element.index;
                    }
                });
                return index;
            },
            cartPrice(){
                let num = 0;
                this.foodesIndex.forEach(el => {
                    num += el.min_price * el.index;
                }) 
                return num;
            }
        }
    }
</script>

<style scoped>
    @import url(../../icomoon/css/fonts.css);
    .foot-cart {
        width: 100%;
        height: 51px;
        display: flex;
        color: #ccc;
        line-height: 51px;
    }
    #cart .cart-icon-child {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: #4e4e4e;
        position: absolute;
        bottom: 16px;
        left: 18px;
        color: #ccc;
        text-align: center;
        line-height: 50px;
        font-size: 30px;
    }
    .cart-icon {
        flex: 1;
        background-color:#333;
        position: relative;
    }
    .cart-btn {
        text-align: center;
        flex: 0 0 120px;
        background-color: #333;
    }
    .text {
        padding:6px 0;
        font-size: 12px;
    }
    .text p{
        margin-left: 80px;
        line-height: 20px;
    }
    .cart-icon-num {
        position: absolute;
        top: -20px;
        left: 47px;
        width: 16px;
        height: 16px;
        background-color: red;
        color: #fff;
        text-align: center;
        line-height: 16px;
        border-radius: 50%;
        font-size: 12px;
        font-weight: bold;
    }
    #cart .active{
        color: #000;
        background-color: #ffbb22;
    }
    .cart-price {
        color: #fff;
        font-size:17px;
    }
</style>