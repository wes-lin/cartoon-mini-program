
var host = 'https://cdn.jsdelivr.net/gh/wes-lin/public/icon';

module.exports = [{
  url:'',
  method:'get',
  data:() => { return [{
    id:'1',
    icon:`${host}/world.png`,
    categoryName:'名著'
  }, {
    id:'2',
    icon:`${host}/history.png`,
    categoryName:'历史'
  }, {
    id:'3',
    icon:`${host}/war.png`,
    categoryName:'战争'
  },
  {
    id:'4',
    icon:`${host}/people.png`,
    categoryName:'人文'
  },
  {
    id:'5',
    icon:`${host}/text.png`,
    categoryName:'文学'
  },
  {
    id:'6',
    icon:`${host}/other.png`,
    categoryName:'其他'
  }]; }
}];