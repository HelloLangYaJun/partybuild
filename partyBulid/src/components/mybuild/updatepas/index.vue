<template>
  <div class="main">
    <Header :headerinfo="headerinfo"></Header>
  <div class="update">
    <p class="p">旧密码：</p>
    <input type="text" class="input" placeholder="输入旧密码" v-model="oldpsd">
    <p class="p">新密码</p>
    <input type="text" class="input"  placeholder="输入新密码" v-model="newpsd1">
    <input type="text" class="input"  placeholder="再次输入新密码" v-model="newpsd2">
    <button class="button" @click="update">修改</button>
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
        userinfo:{},
        oldpsd:'',
        newpsd1:'',
        newpsd2:'',
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
      },
      update(){
        if(this.oldpsd&this.newpsd1&this.newpsd2){
          if(this.newpsd1==this.newpsd2){
            this.$axios.post('/updatepsd',{oldpsd:this.oldpsd,newpsd:this.newpsd1}).then(res=>{
              if(res.code==200){
                this.$message({
                  message: res.msg,
                  type: 'success'
                });
                this.$router.go(-1)
              }
              else {
                this.$message({
                  message: res.msg,
                  type: 'warning'
                });
              }
            })
          }
          else {
            this.$message({
              message: '两次密码输入不一致',
              type: 'warning'
            });
          }
        }
        else {
          this.$message({
            message: '信息填写不完整',
            type: 'warning'
          });
        }
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
  .update{
    text-align: left;
    width: 10rem;
    margin-top: 44px;
    .p{
      margin-left: .4rem;
      font-weight: bold;
      color: #555;
      height: 1.2rem;
      line-height: 1.2rem;
    }
    .input{
      width: 9rem;
      height: 1rem;
      border-radius: 5px;
      padding-left: .2rem;
      border: 1px solid #aaa;
      margin: .2rem .5rem;
    }
 .button{
   height: 1rem;
   width: 4rem;
   margin-left: 3rem;
   background-color: #c50206;
   color: #fff;
   outline: none;
   border: 1px solid #ccc;
   border-radius: 5px;
 }
  }

</style>
