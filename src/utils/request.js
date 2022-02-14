const config = require('../config/index');
const session = require('./session');
const http = (params) => {
  let data = params.data || {};
  let header = params.header || {
    'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'
  };

  //多封装一个promise 获取token
  let result = Promise.resolve();
  //忽略token
  if(!params.ignoreToken) {
    result = session.getToken();
  }
  //返回promise
  return new Promise((resolve, reject) => {
    result.then(res => {
      //成功获取token
      if(res) {
        header = {
          ...header,
          authorization:`Bearer ${res}`
        };
      }
    }).catch(e => {
      console.log('获取token失败');
    }).then(() => {
      wx.request({
        url: config.apiHost + params.url,
        data:data,
        header:header,
        method:params.method || 'POST',
        responseType:params.responseType,
        success:function(res) {
          if(res.statusCode == 200) {
            resolve(res.data);
          }else{
            reject(res.data);
          }
        },
        fail:function(e) {
          reject(e);
        }
      });
    });
  });
};
const uploadFile = (params) => {
  return new Promise((resolve, reject) => {
    wx.uploadFile({
      url: config.apiHost + 'upload', //仅为示例，非真实的接口地址
      filePath: params.filePath,
      name: 'file',
      formData: params.formData || {},
      success(res) {
        if(res.statusCode == 200) {
          resolve(res.data);
        }else{
          reject(res.data);
        }
      },
      fail(e) {
        console.log(e);
      }
    });
  });
};
const uploadMultipleFile = (obj) => {
  let target = [];
  let index = 0;
  const _uploadFile = (_obj, _target, _index) => {
    return new Promise((resolve, reject) => {
      if(_obj.length == _target.length) {
        resolve(_target);
      }else{
        if(!_index) {
          _index = 0;
        }
        //路径为空时不上传直接返回
        if(!_obj[_index]) {
          _target.push('');
          _index++;
          resolve(_uploadFile(_obj, _target, _index));
          return ;
        }
        uploadFile({
          filePath:_obj[_index]
        }).then(res => {
          _target.push(res);
          _index++;
          //递归上传图片
          resolve(_uploadFile(_obj, _target, _index));
        }).catch(error => {
          reject(error);
        });
      }
    });
  };
  return _uploadFile(obj, target, index);
};
const get = (params) => {
  return http({
    ...params,
    method:'GET'
  });
};

module.exports = {
  http:http,
  get:get,
  uploadFile:uploadFile,
  uploadMultipleFile:uploadMultipleFile
};