<template>
  <div class="main">
    <Header :headerinfo="headerinfo"></Header>
    <div class="container">

      <div class="item" v-for="(item,index) in messages">
        <div class="top">
          <div class="left">
            <img :src="item.authorMsg.avatar" alt="">
          </div>
          <div class="top-middle">
            <div class="name">{{item.authorMsg.username}}</div>
            <div class="time">
              <i class="icon-time"></i>
              <p>{{item.createdAt}}</p><i class="icon-public"></i>
              <p>公开</p>
            </div>
          </div>
          <div class="right">
            <img src="../../assets/yunactivity/党员互动icon.png" alt="">
          </div>
        </div>
        <div class="middle">
          <p>{{item.content}}</p>
        </div>
        <div class="bottom">
          <p @click="openreplay(index)">回复</p><i></i>
        </div>
        <div class="replayinput" v-if="item.flag">
          <input type="text" @blur="close(index)" autofocus v-model="replaymessage">
          <button @click="replay(item)">评论</button>
        </div>

        <!--回复循环list-->
        <div class="replaydiv" v-if="item.flag">
          <div class="item" v-for="(item2,index) in item.replay">
            <div class="top">
              <div class="left">
                <img :src="item2.authorMsg.avatar" alt="">
              </div>
              <div class="top-middle">
                <div class="name">来自 {{item2.authorMsg.username}} 回复</div>
                <div class="time">
                  <i class="icon-time"></i>
                  <p>{{item2.createdAt}}</p>
                </div>
              </div>
            </div>
            <div class="middle">
              <p>{{item2.content}}</p>
            </div>
          </div>
        </div>
        <!--回复循环list-->
      </div>

    </div>
    <div class="addmessage" @click="isRplay=true">
      <img src="../../assets/yunactivity/发布btn.png" alt="">
    </div>
    <div class="zhezhao" v-if="isRplay"></div>
    <div class="replay" v-if="isRplay">
      <div class="top">
      <textarea cols="30" rows="10" class="textarea" v-model="pinglunmessage">
      </textarea>
      </div>
      <div class="footer">
        <button class="left item" @click="addmessage">发布</button>
        <button class="right item" @click="isRplay=false">取消</button>
      </div>
    </div>
  </div>
</template>

<script>
  import Header from '../common/header'

  export default {
    name: "index",
    data() {
      return {
        userinfo: {},
        headerinfo: '',
        messages: [],
        pinglunmessage: '',
        replaymessage: '',
        isRplay: false,
        pn: 1,
      }
    },
    methods: {
      replay(item) {
        // console.log(this.replaymessage)
        this.$axios.post('/message', {content: this.replaymessage, toauthor: item._id, type: 'replay'}).then(res => {
          if (res.code == 200) {
            this.$message({
              message: '回复成功',
              type: 'success'
            });
          }
          else {
            this.$message({
              message: '回复出现未知错误',
              type: 'warning'
            });
          }
        })
      },
      close(index) {
        window.setTimeout(() => {
          this.messages[index].flag = false
        }, 300)
      },
      openreplay(index) {
        this.messages[index].flag = true
        // input.focus()

      },
      addmessage() {
        this.$axios.post('/message', {content: this.pinglunmessage, toauthor: '', type: 'message'}).then(res => {
          if (res.code == 200) {
            this.$message({
              message: '发布成功',
              type: 'success'
            });
            this.getmessage()
            this.isRplay = false
          }
          else {
            this.$message({
              message: res.msg,
              type: 'warning'
            });
          }
        })
      },
      getmessage() {
        this.$axios.get(`/message?pn=${1}`).then(res => {
          if (res.code == 200) {
            var replay=[]
            var message=[]
            res.data.forEach(i => {
              if(i.type=='replay'){
                replay.push(i)
              }
              else {
                i.replay=[]
                message.push(i)
              }
              i.createdAt = this.$axios.transformtime(i.createdAt)
              i.flag = false
            })
            replay.forEach(i=>{
              message.forEach(j=>{
                if(i.toauthor==j._id){
                  j.replay.push(i)
                }
              })
            })
            this.messages = message
          }
          else {
            this.$message({
              message: res.msg,
              type: 'warning'
            });
          }
        })
      },
      getlogin() {
        this.$axios.get('/user').then(res => {
          if (res.code == 200) {
            this.userinfo = res.data
          }
          else {
          }
        })
      }
    },
    components: {Header},
    created() {
      this.headerinfo = this.$route.query.headerinfo
      this.getlogin()
      this.getmessage()
    }
  }
</script>

<style scoped lang="scss">
  .replaydiv{
    background-color: #fafafa;
    .item{
      width: 8rem;
      background-color: #fafafa!important;
      padding-left: 1.2rem!important;
      border-bottom: 1px solid #ccc;
      margin-bottom: 0px!important;
    }
  }

  .replayinput {
    width: 9.6rem;
    height: 1.5rem;
    background-color: #eef3fa;
    input {
      height: .9rem;
      width: 7rem;
      margin-left: .5rem;
      border: 1px solid #00B7FF;
      border-radius: 5px;
      margin-top: .3rem;
    }
    button {
      width: 1.5rem;
      height: 1rem;
      margin-top: .25rem;
      border: none;
      border-radius: 5px;
      margin-left: .25rem;
      color: white;
      background-color: #00B7FF;
    }
  }

  .replay {
    position: fixed;
    z-index: 1999;
    bottom: 0px;
    background-color: #f1f1f1;
    height: 3.5rem;
    padding: .2rem;
    .top {
      width: 9.6rem;
      height: 2.5rem;
      textarea {
        width: 100%;
        height: 2.5rem;
      }
    }
    .footer {
      height: .6rem;
      padding: .2rem;
      .item {
        outline: none;
        border: none;
        border-radius: 3px;
        height: .6rem;
        width: 1rem;
      }
      .left {
        float: left;
        background-color: #f40;
        color: #fff;
      }
      .right {
        float: right;
        background-color: #fff;
        color: #000;
      }
    }
  }

  .zhezhao {
    position: fixed;
    top: 0px;
    width: 10rem;
    height: 100vh;
    z-index: 999;
    background: black;
    opacity: .2;
  }

  .container {
    text-align: left;
    margin-top: 44px;
    height: 100vh;
    background-color: #eef3fa;
    .item {
      background-color: white;
      padding: .2rem;
      /*height: 2.8rem;*/
      margin-bottom: 10px;
      .top {
        height: 1rem;
        display: flex;
        .left {
          height: .8rem;
          width: .8rem;
          padding: .1rem;
          img {
            border-radius: 50%;
            width: .8rem;
            height: .8rem;
          }
        }
        .top-middle {
          width: 6.8rem;
          padding: .1rem;
          .name {
            height: .5rem;
            font-size: 16px;
            line-height: .5rem;
          }
          .time {
            height: .3rem;
            font-size: 12px;
            line-height: .3rem;
            display: flex;
            .icon-time {
              width: .3rem;
              height: .3rem;
              margin-right: .1rem;
              background: url("../../assets/yunactivity/时间.png") no-repeat;
            }
            p {
              line-height: .3rem;
              margin-right: .5rem;
            }
            .icon-public {
              width: .3rem;
              height: .3rem;
              margin-right: .1rem;
              background: url("../../assets/yunactivity/声音.png") no-repeat;
            }
          }
        }
        .right {
          width: 1.8rem;
          padding: .1rem;
          img {
            margin-top: .1rem;
            height: .6rem;
            width: 1.6rem;
          }
        }
      }
      .middle {
        height: .9rem;
        p {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          overflow: hidden;
          line-height: .9rem;
        }
      }
      .bottom {
        height: .5rem;
        padding: .2rem;
        /*display: flex;*/
        text-align: center;
        i {
          float: right;
          width: .5rem;
          height: .5rem;
          background: url("../../assets/yunactivity/回复.png") no-repeat;
          background-size: .5rem .5rem;
        }
        p {
          float: right;
          width: 1.5rem;
          height: .5rem;
          line-height: .5rem;
        }
      }
    }
  }

  .addmessage {
    width: 1.5rem;
    height: 1.5rem;
    position: fixed;
    bottom: 1rem;
    right: .5rem;
    z-index: 999;
    img {
      width: 1.5rem;
      height: 1.5rem;
    }
  }
</style>
