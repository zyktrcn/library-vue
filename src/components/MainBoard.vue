<template>
  <el-container>
    <el-header class="header">
      <h2>图书馆书记管理系统</h2>
      <div class="user">admin</div>
    </el-header>
    <el-container :style="{height: containerHeight}">
      <el-aside class="aside">
        <el-menu :default-active="$route.path" class="el-menu-vertical-demo" :router="true">
          <el-menu-item index="/index">
            <i class="el-icon-document"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-menu-item index="/list">
            <i class="el-icon-tickets"></i>
            <span slot="title">借阅记录</span>
          </el-menu-item>
          <!-- <el-menu-item index="/lend">
            <i class="el-icon-setting"></i>
            <span slot="title">借书</span>
          </el-menu-item>
          <el-menu-item index="/return">
            <i class="el-icon-setting"></i>
            <span slot="title">还书</span>
          </el-menu-item> -->
        </el-menu>
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'MainBoard',
  data () {
    return {
      containerHeight: 0
    }
  },
  methods: {
  },
  mounted() {
    let token = localStorage.getItem('token')
    if (!token) {
      this.$router.push('/login')
      return
    }
    this.containerHeight = document.body.clientHeight - 60 + 'px'
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
}
.user {
  float: right;
  height: 60px;
  text-align: center;
  line-height: 60px;
  padding: 0 20px;
  size: 25px;
  font-weight: bold;
  color: #409EFF;
}

.aside {
  margin-top: 1px;
}

.el-menu-vertical-demo {
  height: 100%;
}
</style>
