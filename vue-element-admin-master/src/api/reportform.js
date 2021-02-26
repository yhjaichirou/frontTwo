import request from '@/utils/request'

export function getProjectForm(pn,ps,orgId, search,status) {
  return request({
    url: '/reportForm/getProjectForm?pn='+pn+'&ps='+ps+'&orgId=' + orgId + "&search=" + search + "&status=" + status,
    method: 'get'
  })
}
