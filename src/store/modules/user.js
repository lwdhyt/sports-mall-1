import storage from 'store'
import { login, logout } from '@/api/user.js'
import { ACCESS_TOKEN } from '@/store/mutation-types'

const user = {
  state: {
    token: ''
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    }
  },
  getters: {
    getToken(state) {
      return storage.get(ACCESS_TOKEN) || state.token
    }
  },
  actions: {
    // 登录
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo)
          .then(response => {
            const result = response.data
            if (result) {
              storage.set(ACCESS_TOKEN, result.data, 7 * 24 * 60 * 60 * 1000)
              commit('SET_TOKEN', result.data)
            }
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 获取用户信息
    GetInfo({ commit }) {
      return new Promise((resolve, reject) => {})
    },

    // 登出
    Logout({ commit, state }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        storage.remove(ACCESS_TOKEN)
        this.$router.push('/user/login')
        resolve()
      })
    }
  }
}

export default user
