<template>
  <div>
    <div class="swiper">
      <swiper :options="swiperOption">
        <swiper-slide v-for="(item,index) in swiper" :key="index">
          <div class="item">
            <img :src="item.imgUrl" alt="" class="swiperitem">
            <div class="info">{{item.title}}</div>
          </div>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
        <div class="swiper-scrollbar" slot="scrollbar"></div>
      </swiper>
    </div>
    <div class="botton">
      <div class="top item">
        <div @click="godetail('/detail/xingong?type=0','信工新闻眼')">
          <img src="../../assets/index/icon_01@2x.png" alt="">
          <p>信工新闻眼</p>
        </div>
        <div @click="godetail('/palmactivity','掌上组织生活')">
          <img src="../../assets/index/icon_02@2x.png" alt="">
          <p>掌上组织生活</p>
        </div>
        <div @click="godetail('/yunhudong','党员云互动',true)">
          <img src="../../assets/index/icon_03@2x.png" alt="">
          <p>党员云互动</p>
        </div>
      </div>
      <div class="buttom item">
        <div @click="godetail('/detail/yidiantong?type=3','党建一点通')">
          <img src="../../assets/index/icon_04@2x.png" alt="">
          <p>党建一点通</p>
        </div>
        <div @click="godetail('/detail/liangshengfen?type=5','党员亮身份')">
          <img src="../../assets/index/icon_05@2x.png" alt="">
          <p>党员亮身份</p>
        </div>
        <div @click="godetail('/articledetail?type=10','党史上的今天')">
          <img src="../../assets/index/icon_06@2x.png" alt="">
          <p>党史上的今天</p>
        </div>
      </div>
    </div>

    <div class="baner">

    </div>
    <div class="footer">
      <div class="left item"></div>
      <div class="middle item">
        <div @click="godetail('/detail/studyevery?type=6','随时随地学')"></div>
        <div @click="godetail('/detail/photoevery?type=4','随时随地拍')"></div>
      </div>
      <div class="right item">
        <div @click="godetail('/detail/zhidubuild?type=7','制度建设')"></div>
        <div @click="godetail('/detail/activity?type=1','特色活动')"></div>
      </div>
    </div>
  </div>
</template>

<script>
  // import axios from 'axios'
  // require styles
  import 'swiper/dist/css/swiper.css'
  import {swiper, swiperSlide} from 'vue-awesome-swiper'

  export default {
    name: "index",
    data() {
      return {
        swiper: [],
        swiperOption: {
          autoplay: true,
          pagination: {
            el: '.swiper-pagination',
            autoplay: {
              delay: 1000,
              stopOnLastSlide: false,
              disableOnInteraction: true,
            },
          }
        }
      }
    },
    components: {
      userinfo:{},
      isLogin:false,
      swiper,
      swiperSlide
    },
    methods: {
      godetail(route,info,flag){
        if(flag){
         if(this.isLogin){
           this.$router.push({path:route, query:{headerinfo: info}})
         }
         else {
           this.$router.push('/login')
         }
        }
        else {
          this.$router.push({path:route, query:{headerinfo: info}})
        }
      },
      getswiper() {
          this.$axios.get('http://211.67.177.56:8080/hhdj/carousel/carouselList.do?type=0').then(res => {
              if (res.code = 200) {
                this.swiper = res.rows
              }
              else {

              }
            }
          )
      },
      getlogin(){
        this.$axios.get('/user').then(res=>{
          if(res.code==200){
            this.isLogin=true
            this.userinfo=res.data
          }
          else {
            this.isLogin=false
          }
        })
      }
    },
    created() {
      this.getlogin()
      this.getswiper()
    }
  }
</script>

<style scoped lang="scss">
  .swiperitem {
    width: 100%;
    height: 187px;
  }
  .item{
    position: relative;
    overflow: hidden;
    .info{
      position: absolute;
      width: 100%;
      height: 25px;
      background-color: rgba(0,0,0,.5);
      color: white;
      bottom: 5px;
      z-index: 9999;
    }
  }
  .botton{
    width: 100%;
    height: 200px;
    background: url("../../assets/index/bt_bg@2x.png");
    .item{
      height: 100px;
      display: flex;
      justify-content: space-around;
      flex-grow: 1;
    div{
      min-width: 100px;
      img{
        height: 50px;
        margin-top: 10px;
        width: 50px;
      }
    }
    }
  }
  .baner{
    height: 90px;
    background: url("../../assets/index/banner01@2x.png") no-repeat;
    background-size: 100% 90px;
  }
  .footer{
    height: 160px;
    width: 100%;
    background: url("../../assets/index/tese.png");
    background-size: 100% 160px;
    display: flex;
    justify-content: space-around;

    .item{
      flex-grow: 1;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      div{
        flex-grow: 1;
        width: 100%;
      }
    }
  }
</style>
