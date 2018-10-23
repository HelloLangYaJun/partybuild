<template>
  <div class="main">
    <Header :headerinfo="headerinfo"></Header>
    <div class="container-think">
      <div class="item" v-for="(item) in imgList">
        <img :src="item" alt="">
      </div>
      <div class="item">
        <el-upload
          class="my-uploader"
          action="https://upload-z1.qiniup.com"
          :show-file-list="false"
          :data="ToKen"
          :on-success="handleAvatarSuccess">
          <!--<img v-if="imageUrl" :src="imageUrl" class="avatar">-->
          <i class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="10%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </div>
      <button class="upload" @click="upload">提交审核</button>
    </div>
  </div>
</template>

<script>
  import Header from '../../common/header'
  import axios from 'axios'

  export default {
    name: "index",
    data() {
      return {
        headerinfo: '父组件',
        dialogImageUrl: '',
        dialogVisible: false,
        imageUrl: '',
        imgList: [],
        ToKen: {}
      }
    },
    components: {Header},
    methods: {
      upload() {
        if (this.imgList.length) {
          var flag = true
          this.imgList.forEach(i => {
            this.$axios.post('/think', {content: i}).then(res => {
              if (res.code != 200) {
                flag = false
              }
            })
          })
          if (flag) {
            this.$message({
              message: '提交审核成功，请耐心等待审核',
              type: 'success'
            });
            this.$router.push('/')
          }
          else {
            this.$message({
              message: '提交审核失败，请重新尝试提交',
              type: 'warning'
            });
          }
        }
      },
      handleAvatarSuccess(res, file) {
        // this.imageUrl = URL.createObjectURL(file.raw);
        this.imageUrl = res.url;
        this.imgList.push(this.imageUrl)
      },
    },
    created() {
      axios.get('http://upload.yaojunrong.com/getToken').then(res => {
        this.ToKen = {token: res.data.data}
        console.log(this.ToKen)
      })
      this.headerinfo = this.$route.query.headerinfo
    }
  }
</script>

<style lang="scss">
  .chakan {
    width: 3rem;
    height: 1rem;
    position: fixed;
    top: 4px;
    line-height: 1rem;
    color: white;
    right: 0rem;
    z-index: 1999;
  }

  .upload {
    position: fixed;
    width: 7rem;
    height: 1rem;
    background-color: #c50206;
    color: white;
    left: 1.5rem;
    bottom: 1.2rem;
    outline: none;
    border: none;
    border-radius: 5px;
  }

  .container-think {
    margin-top: 54px;
    .item {
      float: left;
      width: 3rem;
      height: 3rem;
      padding: .166rem;
      img {
        width: 3rem;
        height: 3rem;
      }
      /deep/ .el-upload, .el-upload--text {
        border: 1px dotted #aaa;
        width: 3rem;
        height: 3rem;
        position: relative;
        .el-icon-plus {
          position: absolute;
          top: 1.1rem;
          left: 1.1rem;
          font-size: .8rem;
        }
        img {
          width: 3rem;
          height: 3rem;
        }
      }
    }
  }
</style>
