import request from '@/utils/request'

export function getGroup(data) {
  return request({
    url: '/group/getGroup',
    method: 'post',
    data
  })
}

export function addGroup(data) {
  return request({
    url: '/group/addGroup',
    method: 'post',
    data
  })
}

export function updateGroup(data) {
  return request({
    url: `/group/updateGroup`,
    method: 'post',
    data
  })
}

export function deleteGroup(groupId) {
  return request({
    url: `/group/deleteGroup/${groupId}`,
    method: 'delete'
  })
}
