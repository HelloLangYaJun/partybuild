<template>
  <div class="main">
    <Header :headerinfo="headerinfo"></Header>
    <div class="content">
      <div class="top">
        <input type="text" class="input" v-model="money" placeholder="请输入缴纳金额">
      </div>

      <div class="method">
        请选择支付方式
      </div>
      <div class="zhifu">
        <div class="weixin item">
          <div class="left">
            <img src="../../../assets/mybuild/partyfee/微信icon.png" alt="">
          </div>
          <div class="middle">
            <h2>微信支付</h2>
            <p>使用微信支付，安全便捷</p>
          </div>
          <div class="right">
            <el-radio v-model="radio" label="1">微信</el-radio>
          </div>
        </div>
        <div class="zhifubao item">
          <div class="left">
            <img src="../../../assets/mybuild/partyfee/支付宝icon.png" alt="">
          </div>
          <div class="middle">
            <h2>支付宝</h2>
            <p>支持有支付宝，网银的用户使用</p>
          </div>
          <div class="right">
            <el-radio v-model="radio" label="2">支付宝</el-radio>
          </div>
        </div>
      </div>
      <button class="button" @click="openpay">支付</button>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="70%"
    >
      <span>您有{{userinfo.money}}党费未交，此次操作缴纳{{money}}，超出将会在下次自动缴费</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="pay">确 定</el-button>
  </span>
    </el-dialog>
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
        radio:'2',
        money:'',
        dialogVisible:false
      }
    },
    components:{Header},
    methods:{
      pay(){
        this.$axios.post('/paymoney',{money:this.money}).then(res=>{
          if(res.code==200){
            this.$message({
              message: res.msg,
              type: 'success'
            });
            this.getlogin()
          }
          else {
            this.$message({
              message:  res.msg,
              type: 'warning'
            });
          }
          this.dialogVisible=false
        })
      },
      openpay(){
        console.log(this.userinfo.money)
        if(parseInt(this.money)<2000){
          this.dialogVisible=true
        }
        else {
          this.$message({
            message: '请输入有效数字，且一次最多交2000',
            type: 'warning'
          });
        }
      },
      getlogin(){
        this.$axios.get('/user').then(res=>{
          if(res.code==200){
            this.userinfo=res.data
          }
        })
      },
    },
    created(){
      this.headerinfo=this.$route.query.headerinfo
      // this.userinfo= this.$route.query.userinfo
      this.getlogin()
    }
  }
</script>

<style  lang="scss">
  /deep/.el-message-box{
    width: 300px!important;
  }
.content{
  text-align: left;
  margin-top: 44px;
  .top{
    width: 10rem;
    height: 2rem;
    .input{
      width: 6rem;
      border: 1px solid #aaa;
      border-radius: 5px;
      padding-left: 5px;
      margin-left: 2rem;
      height: 1rem;
      margin-top: .5rem;
    }
  }
  .method{
    width: 8rem;
    padding:0px 1rem;
    height: 1.5rem;
    line-height: 1.5rem;
    border-bottom: 1px solid #aaa;
  }
  .zhifu{
    width: 10rem;
    .weixin{
      width: 10rem;
      height: 2rem;

    }
    .item{
      width: 10rem;
      height: 2rem;
      display: flex;
      justify-content: space-around;
      border-bottom: 1px solid #aaa;
      .left{
        width: 1.2rem;
        height: 1.2rem;
        padding: .4rem;
        img{
          width: 1.2rem;
          height: 1.2rem;
        }
      }
      .middle{
        width: 6rem;
        height: 2rem;
        h2{
          height: 1.2rem;
          line-height: 1.2rem;
        }
        p{
          height: .6rem;
          line-height: .6rem;
        }
      }
      .right{
        width: 2rem;
        height: 2rem;
        line-height: 2rem;
      }
    }
  }

  .button{
    width: 7rem;
    height: 1rem;
    background-color: #c50206;
    outline: none;
    border: none;
    border-radius: 5px;
    margin-top: .3rem;
    margin-left: 1.5rem;
    color: white;
  }
}

</style>
