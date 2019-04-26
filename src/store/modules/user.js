const state = {
  user: {
    id: 1,
    name: 'admin',
    account: 'admin',
    password: 'admin',
    list: [
      {
        id: 1,
        bookId: 1,
        startTime: 1556205461390,
        endTime: 1556553600000,
        result: 1
      },
      {
        id: 2,
        bookId: 1,
        startTime: 1556205461390,
        endTime: '未归还',
        result: 0
      }
    ]
  }
}

const getters = {
  user: (state, getters, rootState) => state.user
}

const actions = {
  lendRestBook({ commit }, id) {
    commit('lendBook', id)
  },
  returnLendingBook({ commit }, id) {
    commit('returnBook', id)
  }
}

const mutations = {
  lendBook(state, id) {
    let date = new Date().getTime()
    state.user.list.push({
      id: state.user.list.length + 1,
      bookId: id,
      startTime: date,
      endTime: '未归还',
      result: 0
    })
  },
  returnBook(state, id) {
    let index = _.findIndex(state.user.list, (val) => val.id === id)
    let book = state.user.list[index]
    book.endTime = new Date().getTime()
    book.result = 1
    state.user.list[index] = book
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
