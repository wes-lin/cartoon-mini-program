import {get} from '../utils/request';
module.exports = {
  categoryList:() => {
    return get({
      url:'category'
    });
  }
};