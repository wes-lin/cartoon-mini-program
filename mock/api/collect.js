var data = require('../data');
module.exports = [{
  url:':id',
  method:'get',
  data:() => { return data.cartoons; }
}, {
  url:'remove',
  method:'post',
  data() {
    return 'ok';
  }
}, {
  url:'add',
  method:'post',
  data() {
    return 'ok';
  }
}];