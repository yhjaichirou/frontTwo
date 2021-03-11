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

export function getUserInfo(userId) {
  return request({
    url: `/admin/getUserInfo/${userId}`,
    method: 'get'
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

export function getRoleList(orgId,roleId) {
  return request({
    url: `/admin/getRoleList/${orgId}/${roleId}`,
    method: 'get'
  })
}
export function getOrgList(loginOrgId,roleId) {
  return request({
    url: `/admin/getOrgList/${loginOrgId}/${roleId}`,
    method: 'get'
  })
}
export function getGroupList(orgId) {
  return request({
    url: `/admin/getGroupList/${orgId}`,
    method: 'get'
  })
}

export function getUser(id) {
  return request({
    url: `/admin/getUser/${id}`,
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
    url: `/admin/deleteUser/${userId}`,
    method: 'delete'
  })
}
