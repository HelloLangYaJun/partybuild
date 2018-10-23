<template>
  <div class="main">
    <Header :headerinfo="headerinfo"></Header>
    <div class="detail-content">
      <p v-if="article.title">{{article.title}}</p>
      <div v-html="article" class="content-main">

      </div>
      <!--content-->

  </div>
  </div>
</template>

<script>
  import Header from '../common/header'

  export default {
    name: "index",
    data() {
      return {
        title:'',
        article: '',
        headerinfo: "",
      }
    },
    components: {Header},
    methods: {
      getarticle(id) {
        this.$axios.get(`http://211.67.177.56:8080/hhdj/news/newsContent.do?newsId=${id}`).then(res => {
          if (res.code == 1) {
            this.title = res.data.title
            this.article = res.data.content
            console.log(this.article.content)
            this.$axios.post('/updatejifen',{content:'查看新闻',Number:1})
          }
        })
      },
      gethistory() {
        this.$axios.get(`/articles`).then(res => {
          if(res.code==200){
            this.article=res.data[0].content
          }
        })
      }
    },
    created() {
      if (this.$route.query.type) {
        if (this.$route.query.type == 10) {
          this.gethistory()
        }
      } else {
        this.getarticle(this.$route.query.id)
      }
      this.headerinfo = this.$route.query.headerinfo
    }
  }
</script>

<style lang="scss">
  .detail-content{
    h1,h2,h3{
      font-weight: 500;
      text-align: left;
    }
  }

  .header {
    text-align: center;
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

  .detail-content {
    margin-top: 44px;
    > p {
      font-size: 20px;
      color: black;
      text-align: left;
      font-weight: bold;
    }
    .content-main {
      img {
        width: 375px;
      }
    }
  }
</style>
