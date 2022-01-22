export * from './validata'
export * from './formatTime'
export * from './tool'
export * from './wxJsMethods'

// 拨洋葱函数
export function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }
  //由内向外，逐步调用
  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}

//数组去重
export function distinct(a, b = []) {
  let arr = a.concat(b)
  let result = []
  let obj = {}

  for (let i of arr) {
    if (!obj[i]) {
      result.push(i)
      obj[i] = 1
    }
  }
  return result
}

// 判断是否为空对象
export const isEmptyObject = obj => {
  for (var name in obj) {
    return false // 返回false，不为空对象
  }
  return true // 返回true，为空对象
}

//合并参数
export const assignData = (data, target) => {
  const ob = { ...target }
  Object.keys(target).forEach(key => {
    if (data[key]) {
      ob[key] = data[key]
    }
  })
  return ob
}

// 输入带两位小数的金额
export const formatNumber = (value, max) => {
  max = max * 1
  value = value
    .replace(/[^\d\.]/g, '')
    .replace(/^\./g, '')
    .replace(/\.{2,}/g, '.')
    .replace('.', '$#$')
    .replace(/\./g, '')
    .replace('$#$', '.')
    .replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3')

  return value > max ? max.toFixed(2) : value
}

// 银行卡打*号
export const formatBankNumber = bankNumber => {
  return bankNumber.substr(0, 4) + ' **** **** ' + bankNumber.substr(-4)
}

// 手机号打*号
export const formatPhone = phone => {
  return phone.substr(0, 3) + '****' + phone.substr(7, 11)
}

// 倒计时
export const countDown = end => {
  let total = end
  let d = parseInt(total / (60 * 60 * 24))
  let h = parseInt((total / (60 * 60)) % 24)
  let m = parseInt((total / 60) % 60)
  let s = parseInt(total % 60)
  h = h < 10 ? '0' + h : h
  m = m < 10 ? '0' + m : m
  s = s < 10 ? '0' + s : s
  return { d, h, m, s }
}

//数字转成中文
export const sectionToChinese = section => {
  var chnNumChar = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
  var chnUnitSection = ['', '万', '亿', '万亿', '亿亿']
  var chnUnitChar = ['', '十', '百', '千']

  let strIns = '',
    chnStr = ''
  let unitPos = 0
  let zero = true
  while (section > 0) {
    var v = section % 10
    if (v === 0) {
      if (!zero) {
        zero = true
        chnStr = chnNumChar[v] + chnStr
      }
    } else {
      zero = false
      strIns = chnNumChar[v]
      strIns += chnUnitChar[unitPos]
      chnStr = strIns + chnStr
    }
    unitPos++
    section = Math.floor(section / 10)
  }
  if (chnStr == '一十') return '十'
  return chnStr
}
