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
      <a class="baritem active" @click="godetail('/')">
        <i>
          <img src="../../assets/layout/党_red.png" alt="" class="tabbarimg">
        </i>
        <p>首页</p>
      </a>
      <a class="baritem" @click="godetail('/news?type=2','通知早知道')">
        <i>
          <img src="../../assets/layout/消息_grey.png" alt="" class="tabbarimg">
        </i>
        <p>通知早知道</p>
      </a>
      <a class="baritem" @click="godetail('/mybuild')">
        <i>
          <img src="../../assets/layout/会员_grey.png" alt="" class="tabbarimg">
        </i>
        <p>我的党建</p>
      </a>
    </div>
  </div>
</template>

<script>
  import img1 from '../../assets/layout/党_red.png'
  import img2 from '../../assets/layout/消息_red.png'
  import img3 from '../../assets/layout/会员_red.png'
  import img4 from '../../assets/layout/党_grey.png'
  import img5 from "../../assets/layout/消息_grey.png"
  import img6 from "../../assets/layout/会员_grey.png"

  export default {
    name: "layout",
    data() {
      return {
        isLogin: false
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
      godetail(route,info,flag){
        this.$router.push({path:route, query:{headerinfo: info}})
      },
      // godetail(route) {
      //   this.$router.push(route)
      // },
    },
    created() {
      this.getlogin()
    }
  }
  window.onload = function () {
    var item = document.getElementsByClassName('baritem')
    var img = document.getElementsByClassName('tabbarimg')
    var noactive = [img4, img5, img6]
    var active = [img1, img2, img3]
    for (let i = 0; i < item.length; i++) {
      console.log('ok')
      item[i].onclick = e => {
        for (let i = 0; i < item.length; i++) {
          item[i].className = 'baritem'
          img[i].src = noactive[i]
        }
        img[i].src = active[i]
        item[i].className = 'baritem active'
      }
    }
  }
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
