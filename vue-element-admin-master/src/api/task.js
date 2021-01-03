import request from '@/utils/request'

export function getAllTasksOfProject(orgId,projectId) {
  return request({
    url: `/project/getAllTasksOfProject/${orgId}/${projectId}`,
    method: 'get',
  })
}
export function getAllTaskMyList(orgId,projectId) {
  return request({
    url: `/project/getAllTaskMyList/${orgId}/${projectId}`,
    method: 'get',
  })
}