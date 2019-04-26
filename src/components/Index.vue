<template>
  <div>
    <div class="search">
      <el-input v-model="search" placeholder="请输入搜索的书名" closable></el-input>
      <el-button type="primary" v-on:click="getSearchBooks">搜索</el-button>
    </div>
    <div class="books">
      <el-table :data="listData">
        <el-table-column type="expand">
          <template slot-scope="props">
            <div class="expand">
              <div class="expand-item">
                <span class="label">书本编号</span>
                <span>{{ props.row.id }}</span>
              </div>
              <div class="expand-item">
                <span class="label">书本名称</span>
                <span>{{ props.row.name }}</span>
              </div>
              <div class="expand-item">
                <span class="label">出版社</span>
                <span>{{ props.row.publish }}</span>
              </div>
              <div class="expand-item">
                <span class="label">作者</span>
                <span>{{ props.row.author }}</span>
              </div>
              <div class="expand-item expand-img">
                <img :src="props.row.pic"  />
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="id" label="书本编号" width="100"></el-table-column>
        <el-table-column prop="name" label="书本名称"></el-table-column>
        <el-table-column prop="publish" label="出版社" width="150"></el-table-column>
        <el-table-column prop="author" label="作者" width="150"></el-table-column>
        <el-table-column label="余量" width="180">
          <template slot-scope="scope">
            <el-button :type=" scope.row.rest > 0 ? 'primary' : ''" :disabled="scope.row.rest <= 0" v-on:click="lendBook(scope.row.id)">可借：{{ scope.row.rest }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Index',
  computed: {
    ...mapGetters([
      'books',
      'user'
    ])
  },
  data () {
    return {
      search: '',
      listData: []
    }
  },
  methods: {
    ...mapActions([
      'lendRestBook',
      'checkRestBook'
    ]),
    getSearchBooks() {
      let books = []
      _.forEach(this.books, (val) => {
        if (val.name.indexOf(this.search) >= 0) {
          books.push(val)
        }
      })
      this.listData = books
    },
    lendBook(id) {
      let count = _.filter(this.user.list, (val) => !val.result).length
      if (count >= 10) {
        this.$message({
          message: '借阅书籍已达10本，无法借书！',
          type: 'error'
        })
        return
      }
      let book = _.forEach(this.listData, (val) => val.id === id)
      if (book.rest <= 0) {
        this.$message({
          message: '该书籍已全部借出！',
          type: 'error'
        })
      }
      let result = this.checkRestBook({ id, type: 'lend' })
      if (!result) return
      this.lendRestBook(id)
      this.getSearchBooks()
      this.$message({
        message: '借书成功！',
        type: 'success'
      })
    }
  },
  mounted() {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.search {
  width: 500px;
  margin: 0 auto;
}

.search .el-input {
  width: 300px;
}

.books {
  margin-top: 20px;
}

.expand {
  padding: 20px;
}

.expand-item {
  height: 50px;
  line-height: 50px;
  font-size: 18px;
}

.expand-item span {
  margin-right: 20px;
}

.expand-item .label {
  display: inline-block;
  width: 90px;
  text-align: right;
  color: #99a9bf;
}

.expand-img {
  position: absolute;
  top:10px;
  right: 100px;
}

.expand-img img {
  width: 200px;
}
</style>
