const state = {
  books: [
    {
      id: 1,
      name: '教育技术学概论：基本理论的探索',
      publish: '广东教育出版社',
      author: '李康',
      pic: 'https://gss3.bdstatic.com/-Po3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=5d31a68f0b2442a7ae0efaa3e978ca76/ac345982b2b7d0a2cf949891cfef76094b369a59.jpg',
      rest: 11
    }
  ]
}

const getters = {
  books: (state, getters, rootState) => state.books
}

const actions = {
  checkRestBook({ commit }, { id, type }) {
    return commit('checkBook', { id, type })
  }
}

const mutations = {
  checkBook(state, { id, type }) {
    let index = _.findIndex(state.books, (val) => val.id === id)
    let book = state.books[index]
    console.log(id, index)
    if (type === 'return') {
      book.rest = book.rest + 1
    } else {
      book.rest = book.rest - 1
    }
    state.books[index] = book
    return true
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
