<template>
    <div class="main">
      <Header :headerinfo="headerinfo"></Header>
   <div class="container">
     <div class="avatar item">
       <div class="fl">头像</div>
       <div class="fr">
         <img :src="userinfo.avatar" alt="" >
       </div>
     </div>
     <div class="name item">
       <div class="fl">姓名</div>
       <div class="fr">{{userinfo.username}}</div>
     </div>
     <div class="id item">
       <div class="fl">身份证号</div>
       <div class="fr">{{userinfo.id}}</div>
     </div>
     <div class="identity item">
       <div class="fl">身份</div>
       <div class="fr">{{userinfo.identity}}</div>
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
  .container{
    margin-top: 44px;

    .item{
      text-align: left;
      width: 100%;
      height: 50px;
      border-bottom: 1px solid #ccc;
      .fl{
        margin-left: 10px;
        text-align: left;
        height: 100%;
        line-height: 50px;
        width: 3rem;
      }
      .fr{
        margin-right: 10px;
        text-align: right;
        line-height: 50px;
        height: 100%;
        width: 5rem;
      }
    }
    .avatar{
      height: 70px;
      .fl{
        line-height: 70px;
      }
      img{
        margin-top: 10px;
        height: 50px;
        width: 50px;
        border-radius: 50%;
      }
    }
  }
</style>
