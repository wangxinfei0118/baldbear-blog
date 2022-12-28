
/**
 * @desc 格式化日期字符串
 * @param { Nubmer} - Date日期 , 时间不能大于当前时间，大于当前时间会返回“刚刚”。
 * @returns { String } 格式化后的日期字符串
     // 2012年01月10日 12:46
     //刚刚
    //16分钟前
    //今天10:10
    //昨天10:10
    //02月10日 10:10:11
    //2012年10月10日 10:10:11
 */
export function dateFormat(date) {
    //new Date 在 ios safari浏览器有兼容性问题处理如下：
    // ? 兼容safari : 兼容其他浏览器
    let $this = new Date( date ) == 'Invalid Date' ? new Date( date.substr(0, 19) ) : new Date(date)

    var timestamp = parseInt(Date.parse($this)) / 1000 //- 8 * 60 * 60; //（本地时间）东八区减去8小时;

    function zeroize( num ) {
        return (String(num).length == 1 ? '0' : '') + num;
    }
    var curTimestamp = parseInt(new Date().getTime() /1000); //当前时间戳
    var timestampDiff = curTimestamp - timestamp; // 参数时间戳与当前时间戳相差秒数
    var curDate = new Date( curTimestamp * 1000 ); // 当前时间日期对象
    var tmDate = new Date( timestamp * 1000 );  // 参数时间戳转换成的日期对象
 
    var Y = tmDate.getFullYear(), m = tmDate.getMonth() + 1, d = tmDate.getDate();
    var H = tmDate.getHours(), i = tmDate.getMinutes(), s = tmDate.getSeconds();
 
    if ( timestampDiff < 60 ) { // 一分钟以内
        return "刚刚";
    } else if( timestampDiff < 3600 ) { // 一小时前之内
        return Math.floor( timestampDiff / 60 ) + "分钟前";
    } else if ( curDate.getFullYear() == Y && curDate.getMonth()+1 == m && curDate.getDate() == d ) {
        return '今天 ' + zeroize(H) + ':' + zeroize(i) + ':' + zeroize(s);
    } else {
        var newDate = new Date( (curTimestamp - 86400) * 1000 ); // 参数中的时间戳加一天转换成的日期对象
        if ( newDate.getFullYear() == Y && newDate.getMonth()+1 == m && newDate.getDate() == d ) {
            return '昨天 ' + zeroize(H) + ':' + zeroize(i) + ':' + zeroize(s);
        } else if ( curDate.getFullYear() == Y ) {
            return  zeroize(m) + '月' + zeroize(d) + '日 ' + zeroize(H) + ':' + zeroize(i) + ':' + zeroize(s);
        } else {
            return  Y + '年' + zeroize(m) + '月' + zeroize(d) + '日 ' + zeroize(H) + ':' + zeroize(i) + ':' + zeroize(s);
        }
    }
  }
/**
 * @param {format} 转换后的日期格式，默认yyyy/MM/dd hh:mm:ss
 */
export function format(date, format = "yyyy-MM-dd hh:mm:ss" ){
      //new Date 在 ios safari浏览器有兼容性问题处理如下：
      // ? 兼容safari : 兼容其他浏览器
      let $this = new Date( date ) == 'Invalid Date' ? new Date( date.substr(0, 19) ) : new Date(date)

      let o = {
        'M+': $this.getMonth() + 1,
        'd+': $this.getDate(),
        'h+': $this.getHours(),
        'm+': $this.getMinutes(),
        's+': $this.getSeconds(),
        'q+': Math.floor(($this.getMonth() + 3) / 3),
        'S': $this.getMilliseconds()
      }
      if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, ($this.getFullYear() + '').substr(4 - RegExp.$1.length))
      }
      for (var k in o) {
        if (new RegExp('(' + k + ')').test(format)) {
            format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
        }
      }
      return format
}