<template>
  <div class="books">
    <el-table :data="listData">
      <el-table-column type="expand">
        <template slot-scope="props">
          <div class="expand">
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
            <div class="expand-item">
              <span class="label">借出时间</span>
              <span>{{ props.row.startTime }}</span>
            </div>
            <div class="expand-item">
              <span class="label">归还时间</span>
              <span>{{ props.row.endTime }}</span>
            </div>
            <div class="expand-item expand-img">
              <img :src="props.row.pic"  />
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="书本名称"></el-table-column>
      <el-table-column prop="publish" label="出版社"></el-table-column>
      <el-table-column prop="author" label="作者" width="150"></el-table-column>
      <el-table-column prop="startTime" label="借出时间"></el-table-column>
      <el-table-column prop="endTime" label="归还时间">
        <template slot-scope="scope">
          <el-button type="primary" v-if="!scope.row.result" v-on:click="returnBook(scope.row.id)">还书</el-button>
          <span v-if="scope.row.result">{{ scope.row.endTime }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Index',
  computed: {
    ...mapGetters([
      'user',
      'books'
    ])
  },
  data () {
    return {
      listData: []
    }
  },
  methods: {
    ...mapActions([
      'returnLendingBook',
      'checkRestBook'
    ]),
    getUserLendList() {
      let books = []
      _.forEach(this.user.list, (val) => {
        let index = _.findIndex(this.books, (obj) => obj.id === val.bookId)
        let { name, publish, author, pic } = this.books[index]
        let { id, startTime, endTime, result } = val
        console.log(startTime)
        startTime = this.dateFormatter(startTime)
        endTime = this.dateFormatter(endTime)
        books.push({ id, name, publish, author, pic, startTime, endTime, result })
      })
      return books
    },
    dateFormatter(time) {
      if (typeof(time) === 'string') {
        return time
      }
      let date = new Date(time)
      return `${date.getFullYear()}年${date.getMonth()+1}月${date.getDate()}日 ${date.getHours()}点${date.getMinutes()}分`
    },
    returnBook(id) {
      this.returnLendingBook(id)
      let book = _.find(this.user.list, (val) => val.id === id)
      this.checkRestBook({ id: book.bookId, type: 'return' })
      this.listData = this.getUserLendList()
      this.$message({
        message: '还书成功!',
        type: 'success'
      })
    }
  },
  mounted() {
    this.listData = this.getUserLendList()
    console.log(this.listData)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
  top:30px;
  right: 100px;
}

.expand-img img {
  width: 200px;
}
</style>
