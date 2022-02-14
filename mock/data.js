var host = 'https://cdn.jsdelivr.net/gh/wes-lin/public/cartoon';
// var host = 'http://192.168.50.128/cartoon';
const cartoons = [{
  cartoonId:'1',
  cartoonName:'东周列国',
  pyname:'dongzhoulieguo',
  cover:`${host}/dongzhoulieguo/01/fenghuoxizhuhou1.jpg`
}, {
  cartoonId:'2',
  cartoonName:'封神演义',
  pyname:'fengshenyanyi',
  cover:`${host}/fengshenyanyi/01/zhouwangwudao1.jpg`
}, {
  cartoonId:'3',
  cartoonName:'三国演义',
  pyname:'sanguoyanyi',
  cover:`${host}/sanguoyanyi/01/taoyuanjieyi1.jpg`
}, {
  cartoonId:'4',
  cartoonName:'龙记包公案',
  pyname:'longjibaogongan',
  cover:`${host}/longjibaogongan/01/baogongpoyian1.jpg`
}];

const chapters = [{
  sort:1,
  cover:`${host}/dongzhoulieguo/01/fenghuoxizhuhou1.jpg`,
  chapterName:'烽火戏诸侯',
  pyname:'fenghuoxizhuhou',
  updatedAt:'2021-12-29',
  path:`${host}/dongzhoulieguo/01`,
  ext:'jpg',
  size:109
},
{
  sort:2,
  cover:`${host}/dongzhoulieguo/02/juedijianmu1.jpg`,
  pyname:'juedijianmu',
  chapterName:'掘地救母',
  updatedAt:'2021-12-29',
  path:`${host}/dongzhoulieguo/02`,
  ext:'jpg',
  size:106
},
{
  sort:3,
  cover:`${host}/dongzhoulieguo/03/zhushihou1.jpg`,
  pyname:'zhushihou',
  chapterName:'诛石厚',
  updatedAt:'2021-12-29',
  path:`${host}/dongzhoulieguo/03`,
  ext:'jpg',
  size:89
}];

module.exports = {cartoons, chapters};