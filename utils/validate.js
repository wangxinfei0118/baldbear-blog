// 校验用户名是否合法 只允许6-30位数字、字母和下划线
export function isvalidUsername(str) {
  const valid_map = /^[a-zA-Z0-9_]{6,30}$/
  return valid_map.test(str)
}

// 校验手机号是否合法
export function isvalidMobile(str) {
  const valid_map = 11 && /^1(3|4|5|7|8|9)\d{9}$/
  return valid_map.test(str)
}

// 校验邮箱是否合法
export function isvalidEmail(str) {
  const valid_map = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
  return valid_map.test(str)
}

/* 合法uri*/
export function validateURL(textval) {
  const urlregex =
    /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(textval)
}
