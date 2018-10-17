<template>
 <div class="main">
   <Header :headerinfo="headerinfo"></Header>
   <div id="container">

   </div>
 </div>
</template>

<script>
  import Header from '../common/header'
  export default {
    name: "index",
    data(){
      return{
        headerinfo:'父组件',
      }},
    components: {Header},
     methods: {
      initmap() {
        var map = new BMap.Map("container");          // 创建地图实例
        var point = new BMap.Point(116.404, 39.915);  // 创建点坐标
        map.centerAndZoom(point, 11);
        //添加控件
        map.addControl(new BMap.NavigationControl());
        map.addControl(new BMap.ScaleControl());
        map.addControl(new BMap.OverviewMapControl());
        map.addControl(new BMap.MapTypeControl());
        map.setCurrentCity("北京"); // 仅当设置城市信息时，MapTypeControl的切换功能才能可用
        // this.map.addOverlay(polygon)

        //设置起始位置
        const MapPoint1 = new BMap.Point(116.304, 39.815)
        const MapPoint2 = new BMap.Point(116.504, 39.995)
        function addMarker(point) {  // 创建图标对象
          var marker = new BMap.Marker(point);       // 创建标注
          var label = new BMap.Label("信息工程学院学生流动党支部书记：高洋 电话：13526395586!", {
            offset: new BMap.Size(15, -25)
          });
          label.setStyle({
            // width: "5rem",
            color: '#fff',
            background: '#ff8355',
            border: '1px solid "#ff8355"',
            borderRadius: "5px",
            textAlign: "center",
            height: "26px",
            lineHeight: "26px"
          });
          marker.setLabel(label);
          map.addOverlay(marker);
        }
        addMarker(MapPoint1);
        addMarker(MapPoint2);
      }
    },
    mounted() {
      this.initmap()
    },
    created() {
      this.headerinfo=this.$route.query.headerinfo
    }
  }
</script>

<style scoped lang="scss">
  #container {
    margin-top: 44px;
    width: 10rem;
    height: 100vh
  }
</style>
