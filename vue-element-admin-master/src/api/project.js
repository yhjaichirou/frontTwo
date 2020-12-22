import request from '@/utils/request'

export function getAllProject(orgId,search,status) {
  return request({
    url: '/project/getAllProject?orgId='+orgId+"&search="+search+"&status="+status,
    method: 'get'
  })
}
export function getProject(projectId) {
  return request({
    url: '/project/getProject/{projectId}',
    method: 'get',
    data
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
    url: `/project/updateGroup`,
    method: 'post',
    data
  })
}

export function deleteProject(groupId) {
  return request({
    url: `/project/deleteGroup/${groupId}`,
    method: 'delete'
  })
}
