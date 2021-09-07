var formatNumber = function(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
export function dateFormat(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  return [year, month, day].map(formatNumber).join('-')
}
export function dateFormatZHymdhm(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  var hour = date.getHours()
  var minute = date.getMinutes()
  return formatNumber(year) + '年' + formatNumber(month) + '月' + formatNumber(day) + '日 ' + formatNumber(hour) + ':' + formatNumber(minute)
}
export function dateFormatyMdhms(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

export function formatTime(date) {
  if (date) {
    if (!(date instanceof Date)) { date = new Date(date) }
    var month = date.getMonth() + 1
    var day = date.getDate()
    return `${month}月${day}日`
  }
}

export function formatDay(date) {
  if (date) {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()
    return [year, month, day].map(formatNumber).join('-')
  }
}

export function formatDay2(date) {
  if (date) {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()
    return [year, month, day].map(formatNumber).join('/')
  }
}
export default {
  dateFormat, dateFormatyMdhms
}
