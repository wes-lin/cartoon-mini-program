//Page Object
import {search} from '@Api/cartoon';
import Toast from '@vant/weapp/toast/toast';
Page({
  data: {
    keyword:'',
    from:'',
    list:[],
    callback:{
      fetch:search
    }
  },
  //options(Object)
  onLoad: function(options) {
    if(options.from) {
      this.setData({
        from:options.from
      });
    }
  },
  goChapter:function(e) {
    const {id} = e.currentTarget.dataset;
    wx.navigateTo({url: `/pages/detail/index?id=${id}`});
  },
  onChange(e) {
    const keyword = e.detail;
    this.setData({
      keyword: keyword,
      'callback.data':{keyword:keyword}
    });
  },
  fetch() {
    let param = this.data.keyword;
    if(!param) {
      Toast('请输入关键词');
      return;
    }
    this.selectComponent('#list-view').load();
  },
  restore() {
    this.setData({
      list:[]
    });
    this.selectComponent('#list-view').rest();
    this.fetch();
  },
  load(e) {
    const res = e.detail;
    this.setData({
      list:this.data.list.concat(res)
    });
  }
});