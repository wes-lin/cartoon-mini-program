const storage = require('./storage');
//获取token
const getToken = () => {
  return new Promise((resolve, reject) => {
    let token = storage.getStorageSync('token');
    if(token) {
      resolve(token);
    }else{
      wx.login({
        success: res => {
          if(res.code) {
            var user = require('../api/user');
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
            user.login(res.code).then(r => {
              token =  r.token;
              //有效时间两小时 提前1分钟刷新
              storage.setStorageSync('token', token, 59 * 60 * 2);
              resolve(token);
            }).catch(() => {
              reject('get token fail');
            });
          }else{
            reject('get code fail');
          }
        },
        fail:() => {
          reject('wx login fail');
        }
      });
    }    
  });
};

module.exports = {
  getToken:getToken
};