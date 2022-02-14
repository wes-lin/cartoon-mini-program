var data = require('../data');
var detail = Object.assign({
  description:'《东周列国志》是明末小说家 冯梦龙 著、清代蔡元放改编的长篇 历史演义 小说，成书于清代乾隆年间。 《东周列国志》写的是西周结束（公元前789年）至秦统一六国（公元前221年），包括春秋、战国五百多年间的历史故事，内容相当丰富复杂。',
  like:true,
  chapters:data.chapters
}, data.cartoons[0]);
module.exports = [{
  url:'',
  method:'get',
  data:() => {
    return [{
      type:1,
      data:data.cartoons
    },
    {
      type:2,
      data:data.cartoons
    },
    {
      type:3,
      data:data.cartoons
    }
    ]; }
}, {
  url:':id',
  method:'get',
  data:() => { return detail; }
}, {
  url:':id/:sort',
  data:() => { return data.chapters[0]; }
}, {
  url:'cid/:cid/:page',
  data(req) {
    const page = req.params.page;
    if (page < 5)
      return [].concat(data.cartoons).concat(data.cartoons).concat(data.cartoons);
    return [];
  }
},
{
  url:'type/:cid/:page',
  data(req) {
    const page = req.params.page;
    if (page < 5)
      return [].concat(data.cartoons).concat(data.cartoons).concat(data.cartoons);
    return [];
  }
}];