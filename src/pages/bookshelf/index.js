import {collects} from '@Api/collect';
import {histories} from '@Api/history';
Page({
  data: {
    active: 0,
    list:[],
    callback:{

    }
  },
  onChange(event) {
    const active = event.detail.name;
    console.log(`切换到标签 ${active}`);
    this.setData({
      active :active
    });
    this.selectComponent('#list-view').rest();
    this.restore();
  },
  load(e) {
    const res = e.detail;
    this.setData({
      list:this.data.list.concat(res)
    });
  },
  onLoad: function() {
    this.init();
  },
  init() {
    let fetch = null;
    if(this.data.active === 0) {
      fetch = collects;
    }else{
      fetch = histories;
    }
    this.setData({
      callback:{
        fetch:fetch
      }
    });
    this.selectComponent('#list-view').load();
  },
  restore() {
    this.setData({
      list:[]
    });
    this.init();
  }
});