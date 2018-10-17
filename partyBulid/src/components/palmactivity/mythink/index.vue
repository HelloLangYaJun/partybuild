<template>
  <div class="main">
    <Header :headerinfo="headerinfo"></Header>
    <div class="container-mythink">
      <div class="item" v-for="(item) in thinks">
        <div class="left">
          <img :src="item.content" alt="">
        </div>
        <div class="right">
          <div class="item">状态：<p class="red" v-if="!item.type">
              待审核
            </p>
            <p class="right" v-if="item.type">
              已通过
            </p>
          </div>
          <div class="item"> 提交时间：{{item.createdAt}}</div>
        </div>
      </div>
      <div class="tishi">已加载全部数据</div>
    </div>
  </div>
</template>

<script>
  import Header from '../../common/header'
  import axios from 'axios'
  export default {
    name: "index",
    data(){
      return{
        headerinfo:'父组件',
        thinks:[]
      }
    },
    components:{Header},
    methods:{
      getthink(){
         this.$axios.get('/think').then(res=>{
           if(res.code=200){
             this.thinks=res.data
           }
           else {
             console.log('no')
           }
         })
      }
    },
    created(){
      this.getthink()
      this.headerinfo=this.$route.query.headerinfo
    }
  }
</script>

<style  lang="scss">
.container-mythink{
  width: 10rem;
  margin-top: 44px;
  .item{
    text-align: left;
    width: 9rem;
    height: 2rem;
    padding: .49rem;
    display: flex;
    .left{
      width: 2rem;
      height: 2rem;
      img{
        width: 2rem;
        height: 2rem;
      }
    }
    .right{
      margin-left: .3rem;
      width: 7rem;
      height: 2rem;
      .item{
        width: 7rem;
        padding: 0rem;
        height: 1rem;
        line-height: 1rem;
        overflow: hidden;
        p{
          line-height: 1rem;
        }
        .red{
          color: red;
        }
        .green{
          color: limegreen;
        }
      }
    }
  }
  .tishi{

  }
}
</style>
