<template>
<div>
  <Header :headerinfo="headerinfo"></Header>
  <div class="main">
    <div class="item" v-for="item in jifen">
      <div class="top"><p>{{item.content}}</p><p class="addjifen">+{{item.Number}}</p></div>
      <div class="buttom">{{item.date}}</div>
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
            headerinfo: "",
            jifen:{}
          }
      },
      methods:{
         getData(){
           this.$axios.get('/user').then(res=>{
             if(res.code==200){
               res.data.jifen.forEach(i=>{
                 i.date=this.$axios.transformtime(i.date)
               })
               this.jifen=res.data.jifen
             }
           })
        }
      },
      components: {Header},
      created(){
          this.getData()
        this.headerinfo = this.$route.query.headerinfo
      }
    }
</script>

<style scoped lang="scss">
.main{
  margin-top: 44px;
  .item{
    height: 1.6rem;
    width: 9rem;
    padding: .2rem .5rem;
    text-align: left;
    border-bottom: 1px solid #ccc;
    .top{
      display: flex;
      height: .8rem;
      display: flex;
      justify-content: space-between;
      p:nth-child(1){
        font-size: 20px;
        line-height: .8rem;
      }
      p:nth-child(2){
       color: red;
        line-height: .8rem;
      }
    }
    .buttom{
      line-height: .8rem;

    }
  }
}
</style>
