//Page Object
import {detail} from '@Api/cartoon';
import Toast from '@vant/weapp/toast/toast';
import collect from '@Api/collect';
Page({
  data: {
    id:'',
    detail:{
    },
    like:false,
    isShow:false,
    loading:true
  },
  onLoad: function(options) {
    this.setData({id:options.id});
    detail(this.data.id).then(res => {
      const data = res;
      this.setData({detail:data, like:data.like});
      wx.setNavigationBarTitle({
        title: data.cartoonName
      });
    }).catch().then(() => {
      this.setData({loading:false});
    });
  },
  goChapter:function(e) {
    const {sort} = e.currentTarget.dataset;
    wx.navigateTo({url: `/pages/chapter/index?id=${this.data.id}&sort=${sort}`});
  },
  collect:function() {
    //忽略加载中
    if(this.data.loading) {
      return ;
    }
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 0,
      mask:true
    });
    let api = this.data.like ? collect.cancelCollect : collect.collect;
    api(this.data.id).then(res => {
      this.setData({
        like:!this.data.like
      });
    }).catch(err => {
      Toast.fail('请求失败');
    }).finally(() => {
      Toast.clear();
    });
  },
  toggle:function() {
    this.setData({
      isShow:!this.data.isShow
    });
  }
});