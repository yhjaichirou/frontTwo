import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/admin/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/admin/userinfo',
    method: 'post'
  })
}

export function generateRoutes(data) {
  return request({
    url: '/admin/getRouter',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/admin/logout',
    method: 'post'
  })
}

export function getUsers(orgId) {
  return request({
    url: '/admin/getUsers?orgId='+orgId,
    method: 'get'
  })
}

export function addUser(data) {
  return request({
    url: '/admin/addUser',
    method: 'post',
    data
  })
}

export function updateUser(data) {
  return request({
    url: '/admin/updateUser',
    method: 'post',
    data
  })
}
export function deleteUser(userId) {
  return request({
    url: '/admin/deleteUser/${userId}',
    method: 'post'
  })
}
