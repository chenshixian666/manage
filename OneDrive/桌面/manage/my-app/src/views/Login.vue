<template>
  <el-form ref="form" label-width="70px" :inline="true" class="login-container" :model="form" :rules="rules">
    <h3 class="login_title">系统登陆</h3>
    <el-form-item label="用户名" prop="username">
      <el-input v-model="form.username" placeholder="请输入账号"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
    </el-form-item>   
    <el-form-item>
      <el-button type="primary" class="login-button" @click="submit">登录</el-button>
    </el-form-item> 
  </el-form>
</template>

<script>
import Mock from 'mockjs'
import Cookie from 'js-cookie'
import { getMenu } from '../api'
export default {
  data(){
    return {
      form:{
        username: '',
        password: ''
      },
      rules:{
        username: [
          { required: true, trigger:'blur', message: '请输入用户名'}
        ],
        password: [
          { required: true, trigger:'blur', message: '请输入密码'}
        ]
      }
    }
  },
  methods:{
    // 登录
    submit(){
      // // token信息
      // const token = Mock.Random.guid() // 调用这个方法之后我们会得到一个随机数
      // // 将token信息存入cookie用于不同页面间的通信
      // Cookie.set('token',token)

      // 校验通过
      this.$refs.form.validate((valid) => {
        if (valid) {
          getMenu(this.form).then(( { data } )=> {
            console.log(data);
            if (data.code === 20000) {
              this.$message({
                message: '登录成功',
                type: 'success'
              });
              // 将token信息存入cookie用于不同页面间的通信
              Cookie.set('token',data.data.token)
              // 获取菜单的数据，存入store中
              // data.data.menu
              // 调用store中的setMenu 将data.data.menu传入
              this.$store.commit('setMenu', data.data.menu)
              // 动态添加路由 
              this.$store.commit('addMenu', this.$router)

              // 跳转到首页
              this.$router.push('/home')
            } else {
              this.$message.error(data.data.message);
            }
          })
        }
      })

      

    }
  }
}
</script>

<style lang="less" scoped>
  .login-container {
    width: 350px;
    border: 1px solid #ccc;
    margin: 180px auto;
    padding: 35px 35px 15px 35px;
    background-color: #fff;
    border-radius: 15px;
    box-shadow: 0 0 25px #cac6c6;
    box-sizing: border-box;
    .login_title {
      text-align: center;
      margin-bottom: 40px;
      color: #505458
    }
    .el-input {
      width: 198px;
    }
    .login-button {
      margin-left: 105px;
      margin-top: 10px;

    }
  }
</style>