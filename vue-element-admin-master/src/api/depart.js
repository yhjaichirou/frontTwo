import request from '@/utils/request'

export function getOrgtypes() {
  return request({
    url: `/depart/getOrgtypes`,
    method: 'get'
  })
}

export function getDepart(orgId) {
  return request({
    url: `/depart/getDepart/${orgId}`,
    method: 'get'
  })
}

export function addDepart(data) {
  return request({
    url: '/depart/addDepart',
    method: 'post',
    data
  })
}

export function updateDepart(data) {
  return request({
    url: `/depart/updateDepart`,
    method: 'post',
    data
  })
}

export function deleteDepart(id) {
  return request({
    url: `/depart/deleteDepart/${id}`,
    method: 'delete'
  })
}
