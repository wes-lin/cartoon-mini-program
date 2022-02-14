//Page Object
import {category, type} from '@Api/cartoon';
Page({
  data: {
    list:[],
    callback:{
    }
  },
  //options(Object)
  onLoad: function(options) {
    if(options.title) {
      wx.setNavigationBarTitle({
        title: options.title
      });
    }
    if(options.typeId) {
      this.setData({
        callback:{
          fetch:type,
          data:{type:options.typeId}
        }
      });
    }else if(options.categoryId) {
      this.setData({
        callback:{
          fetch:category,
          data:{categoryId:options.categoryId}
        }
      });
    }
    this.selectComponent('#list-view').load();
  },
  load(e) {
    const res = e.detail;
    this.setData({
      list:this.data.list.concat(res)
    });
  },
  restore() {
    this.setData({
      list:[]
    });
    this.selectComponent('#list-view').load();
  }
});