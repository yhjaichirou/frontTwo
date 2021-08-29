import request from '@/utils/request'

export function importXls(data) {
  return request({
    url: '/depart/importXls',
    method: 'post',
    data
  })
}

export function getOrgtypes(ordId) {
  return request({
    url: `/depart/getOrgtypes/${ordId}`,
    method: 'get'
  })
}

export function getUpOrgs(cpropery) {
  return request({
    url: `/depart/getUpOrgs/${cpropery}`,
    method: 'get'
  })
}

export function getDepart(orgId) {
  return request({
    url: `/depart/getDepart/${orgId}`,
    method: 'get'
  })
}

export function getDepartList(data) {
  return request({
    url: '/depart/getDepartList',
    method: 'post',
    data
  })
}

export function addDepart(data) {
  return request({
    url: '/depart/addDepart',
    method: 'post',
    data
  })
}

export function updateDepart(data) {
  return request({
    url: `/depart/updateDepart`,
    method: 'post',
    data
  })
}

export function deleteDepart(departId) {
  return request({
    url: `/depart/deleteDepart/${departId}`,
    method: 'delete'
  })
}

// 成员管理

export function getPeopleList(data) {
  return request({
    url: `/depart/getPeopleList`,
    method: 'post',
    data
  })
}

export function getPeople(peoId) {
  return request({
    url: `/depart/getPeople/${peoId}`,
    method: 'get'
  })
}

export function importPelXls(data) {
  return request({
    url: '/depart/importPelXls',
    method: 'post',
    data
  })
}

export function addPeople(data) {
  return request({
    url: '/depart/addOrUpdateDepart',
    method: 'post',
    data
  })
}

export function updatePeople(data) {
  return request({
    url: `/depart/addOrUpdateDepart`,
    method: 'post',
    data
  })
}

export function deletePeople(peoId) {
  return request({
    url: `/depart/deletePeople/${peoId}`,
    method: 'delete'
  })
}
