import request from '@/utils/request'

export function getConfig() {
  return request({
    url: '/config/getConfig',
    method: 'get',
  })
}
export function updateConfig(data) {
  return request({
    url: '/config/updateConfig',
    method: 'post',
    data
  })
}

export function getUserList() {
  return request({
    url: '/config/getUserList',
    method: 'get'
  })
}
