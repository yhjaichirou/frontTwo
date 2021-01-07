var formatNumber = function(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
var now = new Date();

function currDate(){
	var now = new Date();
	return now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
}

//获取当前年 月 日
function currYear(){
	return now.getFullYear();
}
function currMonth(){
	return (now.getMonth() + 1);
}
function currQuarter(){
	var _month = (now.getMonth() + 1);
	if(_month<=3){
		return 1;
	}else if(_month<=6){
		return 2;
	}else if(_month<=9){
		return 3;
	}else if(_month<=12){
		return 4;
	}
}
function currMonthWeek(){
	/*
    	month = 6 - w = 当前周的还有几天过完(不算今天)
    	year + month 的和在除以7 就是当天是当前月份的第几周
	 */
	let w = now.getDay();//星期数
	let d = now.getDate();
	return Math.ceil((d + 6 - w) / 7);
}
function currDay(){
	return now.getDate();
}

//yhj
var dataTypeCycle = function(num){
	//周期类型（1:日 ， 2:月 ，3：季度 4:年,5：周）
	var str = '';
	switch(num){
	case 1:
		str = "每日"
		break;
	case 2:
		str = "每月"
		break;
	case 3:
		str = "每季度"
		break;
	case 4:
		str = "每年"
		break;
	case 5:
		str = "每周"
		break;
	}
	return str;
}
var getQuarterStr = function(){
	return ["春季","夏季","秋季","冬季"];
}
var getMonthsStr = function(){
	return ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"];
}
var getWeeksStr = function(){
	return ["星期一","星期二","星期三","星期四","星期五","星期六","星期日"];
}

// 阿拉伯数字 转 大写
function SectionToChinese(section){
	 var chnNumChar = ["零","一","二","三","四","五","六","七","八","九"];
     var chnUnitSection = ["","万","亿","万亿","亿亿"];
     var chnUnitChar = ["","十","百","千"];

     var strIns = '', chnStr = '';
     var unitPos = 0;
     var zero = true;
     while(section > 0){
         var v = section % 10;
         if(v === 0){
             if(!zero){
                 zero = true;
                 chnStr = chnNumChar[v] + chnStr;
             }
         }else{
             zero = false;
             strIns = chnNumChar[v];
             strIns += chnUnitChar[unitPos];
             chnStr = strIns + chnStr;
         }
         unitPos++;
         section = Math.floor(section / 10);
     }
     return chnStr;
}



export function dateFormat(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-');
}
export function dateFormatZHymdhm(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()
  return formatNumber(year)+"年"+formatNumber(month)+"月"+formatNumber(year)+"日 "+formatNumber(hour)+":"+formatNumber(minute);
}
export function dateFormatyMdhms(date) {

  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':');
}

export function formatTime(date) {
  if (!!date) {
    if (!(date instanceof Date))
      date = new Date(date);
    var month = date.getMonth() + 1
    var day = date.getDate()
    return `${month}月${day}日`;
  }
}

function formatDay(date) {
  if (!!date) {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()
    return [year, month, day].map(formatNumber).join('-');
  }
}

function formatDay2(date) {
  if (!!date) {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()
    return [year, month, day].map(formatNumber).join('/');
  }
}

function formatWeek(date) {
  if (!!date) {
    var day = date.getDay();
    switch (day) {
      case 0:
        return '周日'
        break;
      case 1:
        return '周一'
        break;
      case 2:
        return '周二'
        break;
      case 3:
        return '周三'
        break;
      case 4:
        return '周四'
        break;
      case 5:
        return '周五'
        break;
      case 6:
        return '周六'
        break;
    }
  }
}

function formatHour(date) {
  if (!!date) {
    var hour = new Date(date).getHours();
    var minute = new Date(date).getMinutes();
    return [hour, minute].map(formatNumber).join(':');
  }
}

function timestamp(date, divisor = 1000) {
  if (date == undefined) {
    return;
  } else if (typeof date == 'number') {
    return Math.floor(date / divisor);
  } else if (typeof date == 'string') {
    var strs = date.split(/[^0-9]/);
    return Math.floor(+new Date(strs[0] || 0, (strs[1] || 0) - 1, strs[2] || 0, strs[3] || 0, strs[4] || 0, strs[5] || 0) / divisor);
  } else if (Date.prototype.isPrototypeOf(date)) {
    return Math.floor(+date / divisor);
  }
}

function detimestamp(date) {
  if (!!date) {
    return new Date(date * 1000);
  }
}

//日期比较  前>=后->true  否则返回 false
function compareDate(date1,date2){
	var d1 = new Date(date1.replace(/-/g, "/"));
	var d2 = new Date(date2.replace(/-/g, "/"));
	if(date1!=""&&date2!=""&&d1 >=d2)
	{
		return false;
	}else{
		return
	}
}
//计算偏移日期
//diffCount 偏移量    正负决定偏移方向
function dateShifting(date, diffCount) {
	  var start_date = new Date(date.replace(/-/g,"/"));
	  var result_date = new Date(start_date.getTime() + diffCount) ;
	  return result_date.getFullYear() + "-" + (result_date.getMonth() + 1) + "-" + result_date.getDate();
}
function dateDiff(startDate, endDate) {
  var start_date = new Date(startDate.replace(/-/g,"/"));
  var end_date = new Date(endDate.replace(/-/g,"/"));

  //时间差的毫秒数
  var dateDiff = end_date.getTime() - start_date.getTime();
  //计算出相差天数
  var dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000));

  //计算天数后剩余的毫秒数
  var leave1 = dateDiff % (24 * 3600 * 1000);

  //计算出小时数
  var hours = Math.floor(leave1 / (3600 * 1000));

  //计算相差分钟数
  //计算小时数后剩余的毫秒数
  var leave2 = leave1 % (3600 * 1000)
  //计算相差分钟数
  var minutes = Math.floor(leave2 / (60 * 1000));


  //计算相差秒数
  var leave3 = leave2 % (60 * 1000) //计算分钟数后剩余的毫秒数
  var seconds = Math.round(leave3 / 1000)

  return dayDiff;
}

function add0(m) {
  return m < 10 ? '0' + m : m
}

function formatToDate(timestamp) {
  var time = new Date(timestamp);
  var y = time.getFullYear();
  var m = time.getMonth() + 1;
  var d = time.getDate();
  var h = time.getHours();
  var mm = time.getMinutes();
  var s = time.getSeconds();
  return y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mm) + ':' + add0(s);
}
function formatToDate2(timestamp) {
  var time = new Date();
  time.setTime(timestamp);
  var y = time.getFullYear();
  var m = time.getMonth() + 1;
  var d = time.getDate();
  var h = time.getHours();
  var mm = time.getMinutes();
  var s = time.getSeconds();
  return y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mm) + ':' + add0(s);
}


function isPoneAvailable(poneInput) {
//	 var myreg=/^1(3|4|5|6|7|8|9)\d{9}$/;
	var myreg = /^1[3456789]\d{9}$/;
    if (!myreg.test(poneInput)) {
        return false;
    } else {
        return true;
    }
}
//身份证验证
function isCarAvailable(input) {
    var myreg=/^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
    if (!myreg.test(input)) {
        return false;
    } else {
        return true;
    }
}
//  格式化文件大小
export function renderFileSize(value){
    if(null==value||value==''){
        return "0 Bytes";
    }
    var unitArr = new Array("Bytes","KB","MB","GB","TB","PB","EB","ZB","YB");
    var index=0,
    srcsize = parseFloat(value);
    index=Math.floor(Math.log(srcsize)/Math.log(1024));
    var size =srcsize/Math.pow(1024,index);
    //  保留的小数位数
    size=size.toFixed(2);
    return size+" "+unitArr[index];
}


export default {
  // currDate,currYear,currMonth,currQuarter,currMonthWeek,dataTypeCycle,currDay,
  // getQuarterStr,getMonthsStr,SectionToChinese,dateFormat,dateFormatyMdhms,
  // formatTime,formatDay,formatDay2,formatWeek,formatHour,timestamp,detimestamp,
  // compareDate,dateShifting,dateDiff,formatToDate,formatToDate2,isPoneAvailable,isCarAvailable
  dateFormat
}
