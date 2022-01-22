const getDate = (time) => {
    let timeUntil = ''
    if (time) {
        if (time instanceof Date) {
            timeUntil = time
        } else if (typeof time === 'number') {
            timeUntil = new Date(time)
        } else if (typeof time === 'string') {
            timeUntil = new Date(time.replace(/(-)/g, '/'))
        }
    } else {
        timeUntil = new Date()
    }
    return timeUntil
}

// 日期格式化
export const formatDate = (time) => {
    let timeUntil = getDate(time)
    let week = ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]
    let year = timeUntil.getFullYear()
    let month = timeUntil.getMonth() + 1 < 10 ? "0" + (timeUntil.getMonth() + 1) : timeUntil.getMonth() + 1
    let day = timeUntil.getDate() < 10 ? "0" + timeUntil.getDate() : timeUntil.getDate()
    let hour = timeUntil.getHours() < 10 ? "0" + timeUntil.getHours() : timeUntil.getHours()
    let minute = timeUntil.getMinutes() < 10 ? "0" + timeUntil.getMinutes() : timeUntil.getMinutes()
    week = week[timeUntil.getDay()]
    let value = `${year}-${month}-${day}`
    return { year, month, day, hour, minute, week, value }
}

export function getWeekDay (dateStr) {
    const date = getDate(dateStr)
    let curMonDayDate;
    let curWeek = date.getDay();//获取当前是周几，周日为0
    /* if (curWeek == 0) {
        curWeek = 7;
    } */
    let stDay = 0 - curWeek;//周一和当前差多少天，得出为非正数
    curMonDayDate = addDate(date, stDay).value;//获取当前周的周一日期
    let arrDate = [];
    for (var i = 0; i < 7; i++) {
        arrDate.push(addDate(new Date(curMonDayDate), i));
    }
    return arrDate;
}

export function addDate (date, days) {
    date = new Date(date);
    date.setDate(date.getDate() + days);
    const week = ['日', '一', '二', '三', '四', '五', '六']
    const y = date.getFullYear()
    const m = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1
    const d = date.getDate() < 10 ? "0" + date.getDate() : date.getDate()
    const value = `${y}-${m}-${d}`
    const w = week[date.getDay()]

    const ob = { y, m, d, w, value, }

    return ob
}

// fmt 'yyyy-MM-dd hh:mm:ss' 转换格式
export const formatDay = (fmt, tm) => {
    let times = tm ? new Date(tm.replace(/(-)/g, '/')) : new Date()
    let o = {
        "M+": times.getMonth() + 1,                 //月份
        "d+": times.getDate(),                    //日
        "h+": times.getHours(),                   //小时
        "m+": times.getMinutes(),                 //分
        "s+": times.getSeconds(),                 //秒
        "q+": Math.floor((times.getMonth() + 3) / 3), //季度
        "S": times.getMilliseconds()             //毫秒
    }
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (times.getFullYear() + "").substr(4 - RegExp.$1.length))
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)))
        }
    }
    return fmt
}