<template>
  <div>
    <el-container>
      <el-aside width="auto">
        <common-aside></common-aside>
      </el-aside>
      <el-container>
        <el-header>
          <common-header></common-header>
        </el-header>
        <common-tag></common-tag>
        <el-main>
          <h1></h1>
          <!-- 路由出口 -->
          <!-- 路由匹配到的组件将渲染在这里 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>       
  </div>
</template>

<script>
import CommonAside from '../components/CommonAside.vue'
import CommonHeader from '../components/CommonHeader.vue'
import CommonTag from '../components/CommonTag.vue'

export default {
  data(){
    return {}
  },
//   beforeRouteUpdate(){

// //执行获取数据接口
//   $route.path
// },
  components:{
    CommonAside,
    CommonHeader,
    CommonTag
  }
}
</script>

<style scoped>
   .el-header {
    padding: 0;
  }
</style>