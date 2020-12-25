import request from '@/utils/request'

export function getAllProject(orgId,search,status) {
  return request({
    url: '/project/getAllProject?orgId='+orgId+"&search="+search+"&status="+status,
    method: 'get'
  })
}
export function getProject(projectId) {
  return request({
    url: `/project/getProject/${projectId}`,
    method: 'get',
  })
}
export function clickUpdateStatus(projectId) {
  return request({
    url: '/project/clickUpdateStatus/${projectId}',
    method: 'post',
  })
}

export function getAllFormParam(orgId) {
  return request({
    url: `/project/getAllFormParam/${orgId}`,
    method: 'get',
  })
}
export function getJoiners(orgIds) {
  return request({
    url: `/project/getJoiners/${orgIds}`,
    method: 'get',
  })
}
export function authProject(projectId) {
  return request({
    url: '/project/authProject/${projectId}',
    method: 'post',
  })
}
export function addProject(data) {
  return request({
    url: '/project/addProject',
    method: 'post',
    data
  })
}

export function updateProject(data) {
  return request({
    url: `/project/updateProject`,
    method: 'post',
    data
  })
}

export function deleteProject(projectId) {
  return request({
    url: `/project/deleteProject/${projectId}`,
    method: 'delete'
  })
}
