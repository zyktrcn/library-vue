<template>
  <div class="container">
    <el-card shadow="hover" class="login">
      <h1>登录</h1>
      <el-input placeholder="请输入帐号" v-model="account" clearable></el-input>
      <el-input placeholder="请输入密码" v-model="password" show-password clearable></el-input>
      <el-button type="primary" class="loginBtn" v-on:click="login" :loading="loading">登录</el-button>
      <div class="register">
        <a href="#">注册帐号</a></a>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      account: '',
      password: '',
      loading: false
    }
  },
  methods: {
    login() {
      let account = this.account
      let password = this.password

      if (account === 'admin' && password === 'admin') {
        this.$message({
          message: '登录成功',
          type: 'success'
        })
        let token = account + new Date().getTime() + password
        localStorage.setItem('token', token)
        this.$router.push('/')
      } else {
        this.$message({
          message: '账户或密码错误',
          type: 'error'
        })
      }
    }
  },
  mounted() {
    let token = localStorage.getItem('token')
    if (token) {
      this.$router.push('/')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url('../assets/bg.jpeg');
}

.login {
  width: 400px;
  height: 310px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}

.login h1 {
  text-align: center;
}

.el-input {
  margin-bottom: 20px;
}

.loginBtn {
  width: 100%;
}

.register {
  padding: 5px;
  text-align: right;
  font-size: 15px;
}

.register a {
  color: #909399;
}
</style>
