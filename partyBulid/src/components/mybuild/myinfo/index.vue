<template>
    <div class="main">
      <Header :headerinfo="headerinfo"></Header>
      <div class="xiugai" @click="update">{{isEdit?'保存':"修改"}}</div>
   <div class="container">
     <div class="avatar item">
       <div class="fl">头像</div>
       <div class="fr">

        <div class="upload"  >
          <el-upload
            class="my-uploader"
            action="https://upload-z1.qiniup.com"
            :show-file-list="false"
            :data="ToKen"
            :on-success="handleAvatarSuccess">
            <!--<img v-if="imageUrl" :src="imageUrl" class="avatar">-->
            <i  class="">
              <img :src="imageUrl" alt="" >
            </i>
          </el-upload>

        </div>
         <!--<img :src="userinfo.avatar" alt="" v-if="!isEdit">-->
       </div>
     </div>
     <div class="namee item">
       <div class="fl">姓名</div>
       <input type="text" class="fr"v-model="userinfo.username" v-if="isEdit">
       <div class="fr" v-if="!isEdit">{{userinfo.username}}</div>
     </div>
     <div class="id item">
       <div class="fl">{{isEdit?'身份证号(不可更改)':"身份证号"}}</div>
       <div class="fr" >{{userinfo.id}}</div>
     </div>
     <div class="identity item">
       <div class="fl">{{isEdit?'身份(不可更改)':"身份"}}</div>
       <div class="fr" >{{userinfo.identity}}</div>
     </div>
   </div>
    </div>
</template>

<script>
  import axios from 'axios'
  import Header from '../../common/header'
    export default {
        name: "index",
      data(){
        return{
          headerinfo:'父组件',
          userinfo:{},
          isEdit:false,
          imageUrl:'',
          ToKen:{}
        }
      },
      components:{Header},
      methods:{
        handleAvatarSuccess(res, file) {
          this.imageUrl = res.url;
        },
        update(){
          if(this.isEdit){
            this.$axios.post('/user/updateinfo',{username:this.userinfo.username,avatar:this.imageUrl}).then(res=>{
              if(res.code=200){
                this.$message({
                  message: '修改成功',
                  type: 'success'
                });
                this.isEdit=false
              }
              else {
                this.$message({
                  message: '修改失败',
                  type: 'warning'
                });
              }
            })
          }
          else {
            this.isEdit=true
          }
        },
        getlogin(){
          this.$axios.get('/user').then(res=>{
            if(res.code==200){
              this.userinfo=res.data
              this.imageUrl=this.userinfo.avatar
            }
          })
        }
      },
      created(){
        axios.get('http://upload.yaojunrong.com/getToken').then(res => {
          this.ToKen = {token: res.data.data}
        })
        this.headerinfo=this.$route.query.headerinfo
         // this.userinfo= this.$route.query.userinfo
          this.getlogin()
      }
    }
</script>

<style scoped lang="scss">
  input{
    background-color: transparent;
  }
  .xiugai{
    position: fixed;
    height: 1rem;
    width: 2rem;
    right: 0rem;
    top: .1rem;
    color: white;
    font-size: 16px;
    line-height: 1rem;
    z-index: 1999;
  }
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
        width: 4rem;
      }
      .fr{
        outline: none;
        border: none;
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
      .my-uploader{
        float: right;
        height: 70px;
        width: 50px;
        border-radius: 50%;
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
