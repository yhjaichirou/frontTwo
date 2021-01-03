import request from '@/utils/request'

export function getYjs(orgId, search, status) {
  return request({
    url: '/yj/getYjs?orgId=' + orgId + "&search=" + search + "&status=" + status,
    method: 'get'
  })
}
