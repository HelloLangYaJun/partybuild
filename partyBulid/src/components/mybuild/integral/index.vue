<template>
  <div class="main">
    <Header :headerinfo="headerinfo"></Header>
    <div class="container">
       <div class="topbg">
         <p>{{userinfo.integral}}</p>
       </div>
      <div class="int-detail">
        <div class="icon"></div>
        <p>积分明细</p>
      </div>
      <div class="item jifen">
        <p class="left fl">积分规则</p>
        <p class="right fr fr1"></p>
      </div>
      <div class="item qiandao">
        <p class="left fl">签到</p>
        <p class="right fr">+4</p>
      </div>
      <div class="item denxiang">
        <p class="left fl">分享</p>
        <p class="right fr">+5</p>
      </div>

    </div>
  </div>
</template>

<script>
  import Header from '../../common/header'
  export default {
    name: "index",
    data(){
      return{
        headerinfo:'父组件',
        userinfo:{}
      }
    },
    components:{Header},
    methods:{
      getlogin(){
        this.$axios.get('/user').then(res=>{
          if(res.code==200){
            this.userinfo=res.data
          }
        })
      }
    },
    created(){
      this.headerinfo=this.$route.query.headerinfo
      // this.userinfo= this.$route.query.userinfo
      this.getlogin()
    }
  }
</script>

<style scoped lang="scss">
  .main{
    height: 100vh;
    background-color: #e6e6e6;
  }
  .container{
    background-color: white;
    margin-top: 44px;
    .topbg{
      height: 4rem;
      position: relative;
      background: url("../../../assets/mybuild/integary/积分bg@2x.png") no-repeat;
      background-size: 100% 4rem;
      p{
        position: absolute;
        height: 2rem;
        line-height: 2rem;
        color: white;font-size: 20px;
        width: 4rem;
        top: 1rem;
        left: 3rem;

      }
    }
    .int-detail{
      width: 100%;
      height: 1.8rem;
      display: flex;
      border-bottom: 1px solid #ccc;
      .icon{
        height: 100%;
        width: 1.4rem;
        margin:.2rem .4rem;
        background: url("../../../assets/mybuild/integary/积分明细icon@2x.png") no-repeat;
        background-size: 1.4rem 1.4rem;
      }
      p{
        line-height: 1.8rem;
      }
    }
    .jifen{
      background-color: #e6e6e6;
    }
    .item{
      padding: 0px .4rem;
      border-bottom: 1px solid #ccc;
      width: 9.2rem;
      height: 1.2rem;
      .fl{
        line-height: 1.2rem;
      }
      .fr1{
        width: 1.2rem;
        height: 1.2rem;
        background: url("../../../assets/mybuild/integary/问号icon@2x.png") no-repeat;
        background-size: .6rem .6rem;
        background-position: .6rem .3rem;
      }
      .fr{
        color: red;
        line-height: 1.2rem;
      }
    }
  }
</style>
