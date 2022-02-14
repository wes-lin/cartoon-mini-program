import {http, get} from '../utils/request';
module.exports = {
  index:() => {
    return get({
      url:'cartoon'
    });
  },
  detail:(id) => {
    return get({
      url:`cartoon/${id}`
    });
  },
  chapter:(cartoonId, sort) => {
    return get({
      url:`cartoon/${cartoonId}/${sort}`
    });
  },
  category:(data) => {
    const {categoryId, page} = data;
    return get({
      url:`cartoon/cid/${categoryId}/${page}`
    });
  },
  type:(data) => {
    const {type, page} = data;
    return get({
      url:`cartoon/type/${type}/${page}`
    });
  },
  search(data) {
    return get({
      url:'cartoon/search',
      data:data
    });
  }
};