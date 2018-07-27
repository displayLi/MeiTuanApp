<template>
    <div id="star">
        <span class="stars-box" v-for="(item,index) in ClassList" :class="item" :key="index"></span>
    </div>
</template>

<script>
    const LENGTH = 5;
    const CLA_ON = 'on';
    const CLA_HALF = 'half'
    const CLA_OFF = 'off';
    export default {
        name:'Stars',
        props:{
            stars:{
                type:Number,
            }
        },
        data() {
            return {

            }
        },
        computed:{
            ClassList(){
               let StarArr = [];
                // 4.7    
               let starNum = Math.floor(this.stars * 2) / 2;
               // 半星
               let banStar = starNum % 1 !== 0;
               // 全星
               let quanStar = Math.floor(starNum);

               for (let i = 0; i < quanStar; i++) {
                   StarArr.push(CLA_ON);
               }

               if (banStar) {
                   StarArr.push(CLA_HALF);
               }

               while(StarArr.length < LENGTH) {
                   StarArr.push(CLA_OFF)
               }
               return StarArr;
            }
        }
    }
</script>

<style scoped>
    #star {
        display: inline-block;
    }
    .stars-box {
        display: inline-block;
        width: 12px;
        height: 12px;
        background-position: center center;
        background-size: cover;
        background-repeat: no-repeat;
    }
    #star .on {
        background-image: url(image/star24_on@2x.png);
    }
    #star .half {
        background-image: url(image/star24_half@2x.png);
    }
    #star .off {
        background-image: url(image/star24_off@2x.png);
    }
</style>