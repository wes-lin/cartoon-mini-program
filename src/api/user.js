import {http, get} from '../utils/request';
module.exports = {
  login:(code) => {
    return http({
      url:'user/login',
      ignoreToken:true,
      data:{
        code:code
      }
    });
  },
  message:(data) => {
    const {page} = data;
    return get({
      url:`user/message/${page}`
    });
  }
};