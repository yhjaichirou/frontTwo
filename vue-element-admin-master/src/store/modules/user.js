import {
  login,
  logout,
  getInfo
} from '@/api/user'
import {
  getToken,
  setToken,
  removeToken,
  setUserInfo,
  getUserInfo,
  removeUserInfo
} from '@/utils/auth'
import router, {
  resetRouter
} from '@/router'
import md5 from "js-md5"

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: [],
  userInfo: getUserInfo(),
  userId: '',
  property:'',
  type:''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_USERINFO: (state, userInfo) => {
    state.userInfo = userInfo
  },
  SET_USERID: (state, userId) => {
    state.userId = userId
  },
  SET_ORGID: (state, orgId) => {
    state.orgId = orgId
  },
  SET_PROPERTY: (state, property) => {
    state.property = property
  },
  SET_TYPE: (state, type) => {
    state.type = type
  },
  SET_ORGNAME: (state, orgName) => {
    state.orgName = orgName
  }

}

const actions = {
  // user login
  login({
    commit
  }, userInfo) {
    const {
      username,
      password
    } = userInfo
    return new Promise((resolve, reject) => {
      login({
        username: username.trim(),
        password: md5(password)
      }).then(response => {
        const {
          data
        } = response
        console.log("登录返回信息：", data)
        commit('SET_TOKEN', data.token)
        // commit('SET_USERINFO', data.userInfo)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        const {
          data
        } = response

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const {
          roleIds,
          userName,
          avater,
          id,
          orgId,
          orgName,
          property,
          type
        } = data

        // roles must be a non-empty array
        if (!roleIds || roleIds.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }
        console.log("已存用户信息:",data)
        commit('SET_ROLES',roleIds)
        commit('SET_USERINFO', data)
        commit('SET_NAME', userName)
        commit('SET_USERID', id)
        commit('SET_AVATAR', avater)
        commit('SET_ORGID', orgId)
        commit('SET_ORGNAME', orgName)
        commit('SET_TYPE', type)
        commit('SET_PROPERTY', property)
        setUserInfo(data);
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({
    commit,
    state,
    dispatch
  }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        removeUserInfo()
        resetRouter()

        // reset visited views and cached views
        // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
        dispatch('tagsView/delAllViews', null, {
          root: true
        })

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({
    commit
  }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  async changeRoles({
    commit,
    dispatch
  }, role) {
    const token = role + '-token'

    commit('SET_TOKEN', token)
    setToken(token)

    const {
      roles
    } = await dispatch('getInfo')

    resetRouter()

    // generate accessible routes map based on roles
    const accessRoutes = await dispatch('permission/generateRoutes', roles, {
      root: true
    })
    // dynamically add accessible routes
    router.addRoutes(accessRoutes)

    // reset visited views and cached views
    dispatch('tagsView/delAllViews', null, {
      root: true
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
