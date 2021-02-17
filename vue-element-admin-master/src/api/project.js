import request from '@/utils/request'

export function getTzqkList(orgId,projectId){
  return request({
    url: `/project/getTzqkList/${projectId}`,
    method: 'get'
  })
}
export function getAllMsg(orgId) {
  return request({
    url: `/project/getAllMsg/${orgId}`,
    method: 'get'
  })
}
export function getAllProject(orgId, search, status) {
  return request({
    url: '/project/getAllProject?orgId=' + orgId + "&search=" + search + "&status=" + status,
    method: 'get'
  })
}
export function getProject(projectId) {
  return request({
    url: `/project/getProject/${projectId}`,
    method: 'get',
  })
}
export function getProjectAboutSHB(projectId) {
  return request({
    url: `/project/getProjectAboutSHB/${projectId}`,
    method: 'get',
  })
}

export function clickUpdateStatus(projectId) {
  return request({
    url: '/project/clickUpdateStatus/${projectId}',
    method: 'post',
  })
}

export function getAllOrgs() {
  return request({
    url: `/project/getAllOrgs`,
    method: 'get',
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
export function getLeadersOfOrgId(orgId) {
  return request({
    url: `/project/getLeadersOfOrgId/${orgId}`,
    method: 'get',
  })
}


export function authProject(projectId) {
  return request({
    url: `/project/authProject/${projectId}`,
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


//任务
export function getAllTaskList(projectId,typeId) {
  return request({
    url: `/project/getAllTaskList/${projectId}/${typeId}`,
    method: 'get',
  })
}
export function getAllCountMap(projectId) {
  return request({
    url: `/project/getAllCountMap/${projectId}`,
    method: 'get',
  })
}

export function getTask(id) {
  return request({
    url: `/project/getTask/${id}`,
    method: 'get',
  })
}
export function getExecutorList(orgId) {
  return request({
    url: `/project/getExecutorList/${orgId}`,
    method: 'get',
  })
}

export function getAllTaskFormParam(projectId) {
  return request({
    url: `/project/getAllTaskFormParam/${projectId}`,
    method: 'get',
  })
}
export function addTask(data) {
  return request({
    url: '/project/addTask',
    method: 'post',
    data
  })
}
export function updateTask(data) {
  return request({
    url: `/project/updateTask`,
    method: 'post',
    data
  })
}
export function deleteTask(projectId) {
  return request({
    url: `/project/deleteTask/${projectId}`,
    method: 'delete'
  })
}
export function getFileList(projectId,pn,ps) {
  return request({
    url: `/project/getFileList/${projectId}/${pn}/${ps}`,
    method: 'get'
  })
}
