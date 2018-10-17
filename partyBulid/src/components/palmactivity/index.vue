<template>
    <div class="main">
      <!--<div class="header">-->
        <!--掌上组织生活-->
      <!--</div>-->
      <Header :headerinfo="headerinfo"></Header>
      <div class="banner">

      </div>
      <div class="botton">
        <div class="fl item" @click="godetail('/detail/politicsstudy?type=8')">
          <div>
            <img src="../../assets/palmactivity/icon1.png" alt="">
            <p>政治学习</p>
          </div>
        </div>
        <div class="fl item" @click="godetail('/palmactivity/think','思想汇报',true)">
          <div>
            <img src="../../assets/palmactivity/icon2.png" alt="">
            <p>思想汇报</p>
          </div>
        </div>
        <div class="fl item" @click="godetail('/palmactivity/mythink','心得总结',true)">
          <div>
            <img src="../../assets/palmactivity/icon3.png" alt="">
            <p>心得总结</p>
          </div>
        </div>
        <div class="fl item">
          <div>
            <img src="../../assets/palmactivity/icon4.png" alt="">
            <p>民主评议</p>
          </div>
        </div>
        <div class="fl item" @click="godetail('/map','流动党员找组织',true)">
          <div>
            <img src="../../assets/palmactivity/icon5.png" alt="">
            <p>流动党员找组织</p>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import Header from '../common/header'
    export default {
        name: "index",
      data(){
          return{
            headerinfo:'父组件',
            isLogin:false
          }
      },
      components:{Header},
      methods:{
        //判断是否登录
        getlogin(){
          this.$axios.get('/user').then(res=>{
            if(res.code==200){
              this.isLogin=true
            }
            else {
              this.isLogin=false
            }
          })
        },
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
      },
      created(){
          this.getlogin()
        this.headerinfo=this.$route.query.headerinfo
      }
    }
</script>

<style scoped lang="scss">
  .header {
    position: fixed;
    color: white;
    line-height: 34px;
    font-size: 16px;
    width: 100%;
    top: 0px;
    height: 34px;
    padding: 5px;
    z-index: 999;
    background-color: #c50206;
  }
  .banner{
    margin-top: 44px;
    width: 100%;
    height: 5rem;
    background: url("../../assets/palmactivity/timg.jpg");
    background-size: 100% 5rem;
  }
.botton{
  .item{
    width: 33.333%;
    height: 144px;
    div{
      width: 85px;
      height: 114px;
      margin: 15px auto;
      img{
        width: 85px;
        height: 85px;
      }
    }
  }
}
</style>
