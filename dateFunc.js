/**
 * @author MrFlyHouse
 * @description 这个文件包含了一些我自己编写的Date对象相关的方法，便于做一些日期校验
 */

/**
 * 获取今日零点的时间戳
 */
const getTodayTimestamp = () => {
  const date = new Date();
  return Date.UTC(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    0,
    0,
    0,
    0,
  );
};

/**
 * 将YYYYMMDD格式字符串转化为YYYY-MM-DD格式的字符串
 * YYYY-MM-DD格式可以用来新建Date对象，因此更为常用
 * @param {string} str
 * @returns {string}
 */
const strToDateString = (str) => {
  const year = str.slice(0, 4);
  const month = str.slice(4, 6);
  const day = str.slice(6, 8);
  return `${year}-${month}-${day}`;
};

/**
 * 将给定时间戳转化为YYYY-MM-DD格式字符串
 * YYYY-MM-DD格式可以用来新建Date对象，因此更为常用
 * @param {number} timestamp
 * @returns {string}
 */
const timestampToDateString = (timestamp) => {
  const date = new Date(timestamp);
  const year = date.getFullYear().toString();
  // month和day都有可能出现个位数的情况，直接拼接无法满足YYYYMMDD格式，因此使用padStart进行前置补0
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = (date.getDate() + 1).toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * 验证某个YYYYMMDD格式的字符串是否为合法日期格式（可用于验证身份证中间位数是否为正常的日期）
 *
 * 首先将字符串转化为YYYY-MM-DD格式的合法日期字符串
 * 随后通过Date.parse来判断字符串可否转化为合法时间戳数字，不能转化说明不是日期
 * 再将转化后的时间戳重新转变为YYYY-MM-DD跟转化前的字符串进行对比，来确认是否出现日期被浏览器自动校正的情况
 * @param {string} str
 * @returns {boolean}
 */
const checkStringIsDate = (str) => {
  let flag = true;
  // 不为8位说明入参不是YYYYMMDD格式，认定为日期字符串格式错误
  if (str.length !== 8) {
    flag = false;
  }
  // 是8位，则开始进行转化
  else {
    const dateStr = strToDateString(str);
    const parseTimestamp = Date.parse(dateStr);
    const convertDateStr = timestampToDateString(parseTimestamp);
    // 转化后的时间戳为NaN说明这个字符串不是日期字符串
    // 将转换后的时间戳重新转回字符串，如果和原字符串不同，说明原字符串被浏览器矫正，原字符串依旧不合法
    if (isNaN(parseTimestamp) || dateStr !== convertDateStr) {
      flag = false;
    }
  }
  return flag;
};
