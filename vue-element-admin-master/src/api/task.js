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
export function getTask(id) {
  return request({
    url: `/project/getTask/${id}`,
    method: 'get',
  })
}

export function fileDelete(taskId,fileId) {
  return request({
    url: `/project/fileDelete/${taskId}/${fileId}`,
    method: 'delete',
  })
}
export function confirmTask(data) {
  return request({
    url: `/project/confirmTask`,
    method: 'post',
    data
  })
}
export function taskDb(taskId) {
  return request({
    url: `/project/taskDb/${taskId}`,
    method: 'post',
  })
}

