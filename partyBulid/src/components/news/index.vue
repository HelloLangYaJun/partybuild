<template>
  <div class="main">
    <!--<div class="header">-->
    <!--<i class="back" @click="back"></i>-->
    <!--信工新闻眼-->
    <!--</div>-->
    <!--//普通list页面-->
    <div class="list" v-if="type" >
      <div class="item" v-for="(item,index) in list">
        <div class="container" @click="goarticle(item.newsId)">
          <div class="img">
            <img :src="item.pic" alt="">
          </div>
          <div class="rightinfo">
            <div class="top">
              <span>
                {{item.title}}
              </span>
            </div>
            <div class="bottom">
              <div class="time">
                {{item.currentTime}}
              </div>
              <div class="looknum">
                <i></i><p>{{item.count}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--//照片墙页面-->
    <div class="photo" v-if="!type">
      <div class="item" v-for="(item,index) in list">
        <div @click="goarticle(item.newsId)" class="link">
          <img :src="item.pic" alt="">
          <p>{{item.title}}</p>
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
        list:[],
        headerinfo:'父组件',
        type:true
      }
    },
    components:{Header},
    methods:{
      back(){
        this.$router.go(-1)
      },
      goarticle(id,info){
        // this.$router.push(`/articledetail?id=${id}`,info)
        this.$router.push({path:`/articledetail?id=${id}`, query:{headerinfo: this.headerinfo}})
      },
      getinfo(type){
        http://211.67.177.56:8080/hhdj/news/newsList.do?page=1&rows=10&type=3
          this.$axios.get(`http://211.67.177.56:8080/hhdj/news/newsList.do?page=1&rows=10&type=${type}`).then(res=>{
            if(res.code==1){
              this.list=res.rows
            }
          })
      }

    },
    created(){
      this.headerinfo=this.$route.query.headerinfo
      console.log( this.headerinfo)
      if(this.headerinfo=='随时随地拍'){
        this.type=false
      }
      this.getinfo(this.$route.query.type)
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
    .back{
      display: block;
      height: 34px;
      width: 40px;
      position: absolute;
      left: 20px;
      background: url("../../assets/detail/返回_btn.png") no-repeat;
      background-position: 0px 10px;
    }
  }
  .photo{
    width: 100%;
    text-align: left;
    margin-top: 44px;
    .item{
      width: 5rem;
      height: 5rem;
      margin: 10px 0px;
      float: left;
      .link{
        display: block;
        width: 4.5rem;
        height: 4.5rem;
        padding: .5rem;
        img{
          width: 4.5rem;
          height: 4rem;
        }
      }
    }
  }
  .list{
    text-align: left;
    margin-top: 44px;
    width: 100%;
    .item{
      width: 100%;
      height: 99px;
      display: block;
      border-bottom: 1px solid #aaa;
      .container{
        height: 79px;
        padding: 10px;
        display: flex;
        justify-content: space-around;
        .img{
          width: 80px;
          height: 80px;
          flex-shrink:0;
          img{
            width: 80px;
            height: 80px;
          }
        }
        .rightinfo{
          margin-left: 10px;
          height: 80px;
          flex-grow: 1;
          .top{
            width: 100%;
            height: 56px;
            font-size: 16px;
          }
          .bottom{
            width: 100%;
            height: 24px;
            display: flex;
            font-size: 10px;
            line-height: 24px;
            justify-content: space-between;
            .looknum{
              display: flex;
              justify-content: space-between;
              i{
                width: 14px;
                height: 11px;
                margin-top: 7px;
                background: url("../../assets/detail/12-eye.png");
                background-size: 14px 11px;
                opacity: .5;

              }
            }
          }
        }
      }
    }
  }
</style>
