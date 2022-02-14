import {index} from '@Api/cartoon';
import { getStorageSync, setStorageSync} from '@Utils/storage';
Page({
  data: {
    value:'',
    tags:[
      {
        type:1,
        icon:'/imgs/icon/start.png',
        label:'强力推荐',
        data:[]
      },
      {
        type:2,
        icon:'/imgs/icon/bar-chart.png',
        label:'人气排行',
        data:[]
      },
      {
        type:3,
        icon:'/imgs/icon/new.png',
        label:'最近更新',
        data:[]
      }
    ]
  },
  init() {
    // let tags = getStorageSync('tags');
    // if(tags) {
    //   this.loadTags(tags);
    //   return;
    // }
    index().then(res => {
      if(res) {
        //缓存一天
        // setStorageSync('tags', tags, 60 * 60 * 24);
        this.loadTags(res);
      } 
    });
  },
  loadTags(tags) {
    tags.forEach(tag => {
      const index = `tags[${tag.type - 1}].data`;
      this.setData({[index]:tag.data});
    });
  },
  onLoad: function(options) {
    this.init();
    //自定顶部状态栏
    var customBar = wx.getMenuButtonBoundingClientRect();
    var sysinfo = wx.getSystemInfoSync();
    var statusBarHeight = sysinfo.statusBarHeight;
    var navHeight = customBar.bottom + customBar.top - statusBarHeight;
    this.setData({
      navHeight:navHeight,
      statusBarHeight:statusBarHeight
    });
  },
  open() {
    wx.navigateTo({url: '/pages/search/index?from=home'});
  }
});