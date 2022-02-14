Page({
  data: {
    activeNames: ['1'],
    infos:[{
      activeName:'1',
      title:'数据来源',
      content:'连环画资源来自互联网，只是进行了整理归纳，如果造成侵权请联系客服删除。'
    }, {
      activeNames:'2',
      title:'如何快速提升称号？称号有什么用',
      content:'暂时没捷径，多多预览就行，而且称号并没有什么用。'
    }, {
      activeNames:'3',
      title:'广告营收',
      content:'广告的营收将用于服务器租赁费用，为小程序更好维护下去。'
    }
    ]
  },
  onChange(event) {
    this.setData({
      activeNames: event.detail
    });
  },
  handleContact(e) {
    console.log(e.detail.path);
    console.log(e.detail.query);
  }
});