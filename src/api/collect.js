import {http, get} from '../utils/request';
module.exports = {
  collects:(data) => {
    const {page} = data;
    return get({
      url:`collect/${page}`
    });
  },
  collect:(cartoonId) => {
    return http({
      url:'collect/add',
      data:{
        cartoonId:cartoonId
      }
    });
  },
  cancelCollect:(cartoonId) => {
    return http({
      url:'collect/remove',
      data:{
        cartoonId:cartoonId
      }
    });
  }
};