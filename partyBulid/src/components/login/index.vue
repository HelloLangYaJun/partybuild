<template>
    <div class="main">
      <div class="header">
        登录
      </div>
      <form action="" class="form">
        <img src="../../assets/logo.png" alt="">
         <input type="text" class="username" placeholder="请输入身份证号" v-model="username">
         <input type="text" class="password" placeholder="请输入密码" v-model="password">
      </form>
      <button class="submit" @click="login">登录</button>
    </div>
</template>

<script>
    export default {
        name: "index",
      data(){
          return{
            username:'',
            password:''
          }
      },
      methods:{
        login(){
          this.$axios.post('/login',{id:this.username,password:this.password}).then(res=>{
            if(res.code==200){
              this.$message({
                message: '登陆成功,一秒后自动跳转',
                type: 'success'
              });
              window.setTimeout(()=>{
                this.$router.go(-1)
              },1000)
            }
            else {
              this.$message({
                message: res.msg,
                type: 'warning'
              });
            }
          })
        }
      }
    }
</script>

<style scoped lang="scss">
 .main{
   border-top: 1px solid red;
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
   height: 100vh;
   width: 100%;
   background: linear-gradient( #c50206 , #f20);
   .form{
     margin-top: 74px;
     img{
       width: 200px;
       height: 50px;
       margin: 0 auto;
       margin-bottom: 20px;
     }
    input{
      display: block;
      width: 8rem;
      height: 1.2rem;
      padding-left: 5px;
      margin: 10px auto;
      outline: none;
      border: 1px solid yellow;
      border-radius: 5px;
      background: rgba(0,0,0,0);
      color: white;
      font-size: 16px;
  }

   }
   .submit{
     width: 8rem;
     height: 1.2rem;
     margin: 10px auto;
     outline: none;
     border: none;
     border-radius: 5px;
     background: #e3574f;
   }
 }
</style>
