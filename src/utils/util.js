const formatTime = date => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':');
};

const formatNumber = n => {
  n = n.toString();
  return n[1] ? n : '0' + n;
};

const groupingBy = (data = [], field = 'group') => {
  let result = {};
  data.forEach(item => {
    let group = item[field];
    if(!group) {
      group = 'default';
    }
    if(!result[group]) {
      result[group] = [];
    }
    result[group].push(item);
  });
  return result;
};

module.exports = {
  formatTime: formatTime,
  groupingBy:groupingBy
};
