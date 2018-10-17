<template>
  <div>
    <div class="header">
      <div class="logo fl"></div>
      <div class="login fr" v-if="!isLogin" @click="gologin()">
        登录
      </div>
    </div>
    <div class="main">
      <router-view/>
    </div>
    <div class="tabbar">
      <a v-bind:class="{ active: tabbar[0],baritem:true }" @click="godetail('/','首页',1)">
        <i>
          <img src="../../assets/layout/党_red.png" alt="" class="tabbarimg" v-if="tabbar[0]">
          <img src="../../assets/layout/党_grey.png" alt="" class="tabbarimg" v-if="!tabbar[0]">
        </i>
        <p>首页</p>
      </a>
      <a v-bind:class="{ active: tabbar[1],baritem:true }" @click="godetail('/news?type=2','通知早知道',2)">
        <i>
          <img src="../../assets/layout/消息_grey.png" alt="" class="tabbarimg" v-if="!tabbar[1]">
          <img src="../../assets/layout/消息_red.png" alt="" class="tabbarimg" v-if="tabbar[1]">
        </i>
        <p>通知早知道</p>
      </a>
      <a v-bind:class="{ active: tabbar[2],baritem:true }" @click="godetail('/mybuild','我的党建',3)">
        <i>
          <img src="../../assets/layout/会员_grey.png" alt="" class="tabbarimg" v-if="!tabbar[2]">
          <img src="../../assets/layout/会员_red.png" alt="" class="tabbarimg" v-if="tabbar[2]">
        </i>
        <p>我的党建</p>
      </a>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
  export default {
    name: "layout",
    data() {
      return {
        isLogin: false,
        tabbar:[true,false,false]
      }
    },
   updated(){
     if(Vue.prototype.tabbar2){
       this.tabbar= Vue.prototype.tabbar2
     }
   },
    methods: {
      gologin() {
        this.$router.push('/login')
      },
      getlogin() {
        this.$axios.get('/user').then(res => {
          if (res.code == 200) {
            this.isLogin = true
          }
          else {
            this.isLogin = false
          }
        })
      },
      godetail(route,info,tabbar){
        this.tabbar[0]=false
        this.tabbar[1]=false
        this.tabbar[2]=false
        this.tabbar[tabbar-1]=true
        this.$router.push({path:route, query:{headerinfo: info}})
         Vue.prototype.tabbar2=this.tabbar
      },
    },
    created() {
      console.log(window.location.pathname)
      this.getlogin()
    }
  }
  // window.onload = function () {
  //   var item = document.getElementsByClassName('baritem')
  //   var img = document.getElementsByClassName('tabbarimg')
  //   var noactive = [img4, img5, img6]
  //   var active = [img1, img2, img3]
  //   for (let i = 0; i < item.length; i++) {
  //     console.log('ok')
  //     item[i].onclick = e => {
  //       for (let i = 0; i < item.length; i++) {
  //         item[i].className = 'baritem'
  //         img[i].src = noactive[i]
  //       }
  //       img[i].src = active[i]
  //       item[i].className = 'baritem active'
  //     }
  //   }
  // }
</script>

<style scoped lang="scss">
  .header {
    position: fixed;
    width: 100%;
    top: 0px;
    height: 34px;
    padding: 5px;
    z-index: 999;
    background-color: #c50206;
    .logo {
      width: 136px;
      height: 100%;
      background: url("../../assets/logo.png") no-repeat;
      background-size: 136px, 34px;
    }
    .login {
      color: white;
      font-size: 16px;
      line-height: 34px;
      width: 50px;
      height: 34px;
    }
  }

  .main {
    margin-top: 44px;
    margin-bottom: 48px;
  }

  .tabbar {
    height: 48px;
    z-index: 999;
    width: 100%;
    color: #888;
    position: fixed;
    display: flex;
    background-color: white;
    justify-content: space-around;
    bottom: 0px;
    .baritem {
      width: 100px;
      flex-grow: 1;
      display: block;
      i {
        display: block;
        width: 100%;
        height: 32px;
        img {
          margin-top: 5px;
          width: 21px;
          height: 26px;
        }
      }
      p {
        font-size: 10px;
      }
    }
    .active {
      border-top: 2px solid #ef473a;
      color: #ef473a;
    }
  }
</style>
