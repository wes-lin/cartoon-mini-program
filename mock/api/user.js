
var messages = [
  {messageId:1, content:'消息内容1', createdAt:'2022-01-01'},
  {messageId:2, content:'消息内容2', createdAt:'2022-01-01'},
  {messageId:3, content:'消息内容3', createdAt:'2022-01-01'},
  {messageId:4, content:'消息内容4', createdAt:'2022-01-01'},
  {messageId:5, content:'消息内容5', createdAt:'2021-12-31'},
  {messageId:6, content:'消息内容5', createdAt:'2021-12-31'},
  {messageId:7, content:'消息内容5', createdAt:'2021-12-31'},
  {messageId:8, content:'消息内容5', createdAt:'2021-12-31'},
  {messageId:9, content:'消息内容6', createdAt:'2021-12-30'},
  {messageId:10, content:'消息内容6', createdAt:'2021-12-30'},
  {messageId:11, content:'消息内容6', createdAt:'2021-12-30'}
];

module.exports = [{
  url:'login',
  method:'post',
  data:() => { 
    return {
      token:'1234'
    };
  }
},
{
  url:'message/:page',
  data(req) {
    const page = req.params.page;
    if (page <= 1)
      return [].concat(messages);
    return [];
  }
}
];