<template>
  <div class="header-container">
    <div class="l-content">
      <el-button style="margin-right:20px" @click="handMenu" icon="el-icon-menu" size="mini"></el-button>
       <!-- 面包屑区域 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="item in tags" :key="item.path" :to="{ path: item.path }" >{{ item.label }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            <img class="user" src="../assets/images/user.png" alt="">
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item command="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
      </el-dropdown>      
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Cookie from 'js-cookie'
export default {
  data(){
    return {

    }
  },
  methods:{
    handMenu(){
      this.$store.commit('collapseMenu')  //通过commit方法调用store中定义的mutation方法
    },
    handleCommand(command){
      if (command === 'logout') {
        // 清除cookie 中的token
        Cookie.remove('token')
        // 清楚cookie中的menu
        Cookie.remove('menu')
        this.$router.push({name:'login'})
      }
    },

  },
  computed: {
    ...mapState({
      tags:state => state.tab.tabsList
    })
  },
  mounted(){
    console.log(this.tags,'tags');
  }
}
</script>

<style lang="less"scoped>
  .header-container {
    padding: 0 20px;
    height: 60px;
    background-color: #333;
    display: flex;
    justify-content: space-between;  
    align-items: center; 
    .text {
      font-size: 14px;
      color: #fff;
      margin-left: 10px;
    }
    .r-content {
      .user {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
    }
    .l-content {
      display: flex;
      align-items: center;
      /deep/.el-breadcrumb__item { 
        .el-breadcrumb__inner{
          &.is-link {
            color:#666
          }
        }
        &:last-child {
          .el-breadcrumb__inner {
            color: #fff;
          }
        }
      }
    }
    
  }
</style>