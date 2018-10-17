<template>
    <div>
      <div class="header">
        我的党建
      </div>
      <div class="top">
        <div class="info" @click="login()">
          <div class="img">
            <img :src="userinfo.avatar" alt="" v-if="isLogin">
          </div>
          <p v-if="isLogin">{{userinfo.username}}</p>
          <p v-if="!isLogin">您还未登录，请先登录</p>
        </div>
      </div>
      <div class="setting">
        <ul>
          <li @click="gosetting('/mybuild/myinfo','个人信息')">
           <i class="left">
             <img src="../../assets/mybuild/个人信息@2x.png" alt="">
           </i> <p>个人信息</p>
            <i class="right">
              <img src="../../assets/mybuild/形状-7-拷贝-5@2x.png" alt="">
            </i>
          </li>
          <li @click="gosetting('/mybuild/integral','个人量化积分')">
            <i class="left">
              <img src="../../assets/mybuild/量化积分icon@2x.png" alt="">
            </i> <p>个人量化积分</p><i class="right">
            <img src="../../assets/mybuild/形状-7-拷贝-5@2x.png" alt="">
          </i>
          </li>
          <li @click="gosetting('/mybuild/updatepsd','修改密码')">
            <i class="left">
              <img src="../../assets/mybuild/修改密码icon@2x.png" alt="">
            </i> <p>修改密码</p><i class="right">
            <img src="../../assets/mybuild/形状-7-拷贝-5@2x.png" alt="">
          </i>
          </li>
          <li  @click="gosetting('/mybuild/partyfee','党费缴纳')">
            <i class="left">
              <img src="../../assets/mybuild/量化积分icon@2x.png" alt="">
            </i> <p>党费缴纳</p><i class="right">
            <img src="../../assets/mybuild/形状-7-拷贝-5@2x.png" alt="">
          </i>
          </li>
        </ul>
      </div>
      <button class="logout" @click="logout" v-if="isLogin">退出登录</button>
    </div>
</template>

<script>
    export default {
        name: "index",
      data(){
        return{
          isLogin:false,
          userinfo:{}
        }
      },
      methods:{
        logout(){
          this.$axios.get('/logout').then(res=>{
            if(res.code==200){
              this.$message({
                message: '退出登录成功',
                type: 'success'
              });
              this.getlogin()
            }
          })
        },
        gosetting(route,info){
          if(this.isLogin){
            this.$router.push({path:route,query:{headerinfo:info}})
          }
         else {
            this.$message({
              message: '您还未登录',
              type: 'success'
            });
            window.setTimeout(()=>{
              this.$router.push('/login')
            },1000)
          }
        },
        login(){
          if(this.isLogin){

          }
          else {
            this.$router.push('/login')
          }
        },
          //注册用户
        regist(){
          this.$axios.post('/user',{username:'郎老师',id:"500240199506201530",password:'5201314'}).then(res=>{
            if(res.code==200){

            }
          })
        },
        //判断是否登录
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
      created(){
          this.getlogin()
          // this.regist()
      }
    }
</script>

<style scoped lang="scss">
  .logout{
    width: 7rem;
    height: 1rem;
    background: #c50206;
    border-radius: 5px;
    border: none;
    position: fixed;
    bottom: 2rem;
    color: white;
    left: 1.5rem;
  }
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
 .top{
   margin-top: 44px;
   height: 140px;
   position: relative;
   background-color: #c50206;
   display: flex;
   justify-content: space-around;
   .info{
     display: flex;
     flex-direction: column;
     align-items: center;
     justify-content: space-around;
     position: absolute;
     width: 120px;
     height: 100px;
     bottom: 10px;
     .img{
       width: 62px;
       height: 62px;
       border-radius: 50%;
       background: white;
       img{
         width: 62px;
         height: 62px;
         border-radius: 50%;
       }
     }
     p{
       font-size: 12px;
       color: white;
     }
   }
 }
  .setting{
    text-align: left;
    li{
      height: 50px;
      border-bottom: 1px solid #aaa;
      position: relative;
      .left{
        width: 32px;
        height: 32px;
        left: 0px;
        top: 0px;
        padding: 9px;
        position: absolute;
        img{
          width: 32px;
          height: 32px;
        }
      }
      .right{
        width: 32px;
        height: 32px;
        right: 0px;
        top: 0px;
        padding: 9px;
        position: absolute;
        img{
          padding:12.5px 10px ;
          width: 7px;
          height: 12px;
        }
      }
      p{
        padding: 16px 54px;
      }
    }

  }
</style>
