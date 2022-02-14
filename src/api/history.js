import {http, get} from '../utils/request';
module.exports = {
  histories:(data) => {
    const {page} = data;
    return get({
      url:`history/${page}`
    });
  },
  add:(cartoonId, sort) => {
    return http({
      url:'history/add',
      data:{
        cartoonId:cartoonId,
        sort:sort
      }
    });
  }
};