import request from '@/utils/request'

export function getRoutes() {
  return request({
    url: '/admin/getAllRouters',
    method: 'get'
  })
}

export function getRoles(data) {
  return request({
    url: '/admin/getRoles',
    method: 'post',
    data
  })
}

export function addRole(data) {
  return request({
    url: '/admin/addRole',
    method: 'post',
    data
  })
}

export function updateRole(data) {
  return request({
    url: `/admin/updateRole`,
    method: 'post',
    data
  })
}

export function deleteRole(id) {
  return request({
    url: `/vue-element-admin/role/${id}`,
    method: 'delete'
  })
}
