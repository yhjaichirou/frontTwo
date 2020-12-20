import request from '@/utils/request'

export function getGroup(orgId) {
  return request({
    url: '/group/getGroup?orgId='+orgId,
    method: 'get'
  })
}

export function addGroup(data) {
  return request({
    url: '/group/addGroup',
    method: 'post',
    data
  })
}

export function updateGroup(id, data) {
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
