Component({
  options: {
    multipleSlots: true
  },
  externalClasses:['custom-class'],
  properties: {
    empty:{
      type:Boolean,
      value:false,
      observer: function(newVal, oldVal) {
      }
    },
    loading: {
      type: Boolean,
      value: false,
      observer: function(newVal, oldVal) {
      }
    },
    complete:{
      type: Boolean,
      value: false,
      observer: function(newVal, oldVal) {
      }
    },
    page:{
      type:Number,
      value:1
    },
    pageSize:{
      type:Number,
      value:10
    },
    enablePulling:{
      type:Boolean,
      value:true
    },
    callback:{
      type:Object,
      value:{
        fetch:() => {
          return new Promise((resolve, reject) => {
            resolve([]);
          });
        },
        data:{

        }
      }
    }
  },
  data:{
    triggered:false,
    isRefreshLoading:false
  },
  lifetimes:{

  },
  methods:{
    _scrolltolower() {
      console.log('底部事件');
      this.triggerEvent('scrolltolower');
      this.load();
    },
    _scrolltoupper() {
      console.log('顶部事件');
      this.triggerEvent('scrolltoupper');
    },
    onRefresh() {
      if (this._freshing)
        return;
      this._freshing = true;
      setTimeout(() => {
        this.setData({
          triggered: false
        });
        this._freshing = false;
      }, 1000);
    },
    onPulling() {
      this.setData({
        isRefreshLoading: true
      });
    },
    onRestore() {
      console.log('刷新中。。。。');
      this.rest();
      this.triggerEvent('refresh');
      setTimeout(() => {
        this.setData({
          isRefreshLoading: false
        });
      }, 1000);
    },
    rest() {
      this.setData({
        page:1,
        complete:false,
        empty:false
      });
    },
    load() {
      if(this.data.complete || this.data.loading) {
        return;
      }
      const fetch = this.data.callback.fetch;
 
      if(fetch) {
        this.setData({
          loading:true
        });
        const page = this.data.page;
        //构建分页参数
        const data = Object.assign({}, this.data.callback.data, {
          page:page
        });
        fetch(data).then(res => {
          //数据为空
          if(page === 1 && res.length === 0) {
            this.setData({
              empty:true
            });
            //将请求数据抛出
            this.triggerEvent('load', []);
            return;
          }
          if(res.length > 0) {
            this.setData({
              page:page + 1
            });
          }
          //小于个数，表示没有更多了
          if (res.length < this.data.pageSize) {
            this.setData({
              complete:true
            });
          }
          //将请求数据抛出
          this.triggerEvent('load', res);
        }).catch().then(() => {
          this.setData({loading:false});
        });
      }
    }
  }
});