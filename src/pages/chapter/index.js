import {chapter} from '@Api/cartoon';
const createFlatListContext = require('miniprogram-flat-list');
var cxt ;  
Page({
  data: {
    pager:{
      page :0,
      size:10,
      hasMore:true
    },
    loading:false,
    deviceOrientation:''
  },
  onLoad: function(option) {

    wx.getSystemInfo({
      success: (res) => {
        var { windowWidth, windowHeight } = res;
        var height = (3 * (windowWidth - 16)) / 4;
        this.setData({
          windowWidth:windowWidth,
          windowHeight:windowHeight,
          imageHeight:height
        });
      }
    });

    this.setData({
      id:option.id,
      sort:option.sort
    });

    cxt = createFlatListContext({
      id:'flatList',
      dataKey:'list',
      page:this
    });
    
    chapter(this.data.id, this.data.sort).then(res => {
      const data = res;
      const imgs = [];
      for(var i = 1;i <= data.size;i++) {
        imgs.push(`${data.path}/${data.pyname}${i}.${data.ext}`);
      }
      this.setData({imgs:imgs});
      wx.setNavigationBarTitle({
        title: data.chapterName
      });
      var arry = this.loadData();
      cxt.appendList(arry);
    });

  },
  scrolltolower:function() {
    var arry = this.loadData();
    cxt.appendList(arry);
  },
  loadData() {
    if(this.data.loading) {
      console.log('loading....');
      return;
    }
    this.setData({loading:true});
    if(!this.data.pager.hasMore) {
      console.log('no data...');
      return ;
    }
    let params = {
      page:this.data.pager.page,
      pageSize:this.data.pager.size
    };
    const data = this.data.imgs.slice(params.page * params.pageSize, (params.page + 1) * params.pageSize);
    if(data.length > 0) {
      var index = params.page * params.pageSize;
      const _data = data.map(img => {
        return {
          url :img,
          idx:index++
        };
      });
      this.setData({
        'pager.page':params.page + 1,
        loading:false
      });
      return _data;
    }else{
      this.setData({
        'pager.hasMore':false,
        loading:false
      });
      return [];
    }
  },
  onResize(res) {
    console.log(res);
    var { windowWidth, windowHeight } = res.size;
    var {deviceOrientation} = res;
    var height = (3 * (windowWidth - 16)) / 4;
    this.setData({
      windowWidth:windowWidth,
      windowHeight:windowHeight,
      imageHeight:height,
      deviceOrientation:deviceOrientation
    });
  }
});