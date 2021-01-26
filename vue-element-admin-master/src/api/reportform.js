import request from '@/utils/request'

export function getProjectForm(orgId, status) {
  return request({
    url: '/project/getProjectForm?orgId=' + orgId + "&search=" + search + "&status=" + status,
    method: 'get'
  })
}
