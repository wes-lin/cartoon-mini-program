
const getTKey = (key) => {
  return key + 'expires_time';
};
const getStorageSync = (key, def) => {
  var t_key = getTKey(key);
  var expiresTime = wx.getStorageSync(t_key);
  if(!expiresTime) {
    console.log(`${key}缓存不存在`);
    return def;
  }
  var now = parseInt(new Date().getTime() / 1000) ;
  //超时
  if(now > parseInt(expiresTime)) {
    wx.removeStorageSync(key);
    wx.removeStorageSync(t_key);
    console.log(`${key}缓存超时`);
    return def;
  }
  var res = wx.getStorageSync(key);
  if(!res) {
    return def;
  }
  return res;
};

const setStorageSync = (key, value, expires_time) => {
  wx.setStorageSync(key, value);
  var t_key = getTKey(key);
  var t_value = parseInt(new Date().getTime() / 1000) + expires_time;
  wx.setStorageSync(t_key, t_value);
};

module.exports = {
  setStorageSync:setStorageSync,
  getStorageSync:getStorageSync
};