import {message} from '@Api/user';
import utils from '@Utils/util';
Page({
  data:{
    messages:[],
    callback:{
      fetch:message
    }
  },
  onLoad: function(options) {
    this.selectComponent('#list-view').load();
  },
  restore() {
    this.setData({
      messages:[]
    });
    this.selectComponent('#list-view').load();
  },
  load(e) {
    const res = e.detail;
    //[date:[{messageId:1,content:'消息内容'}]]
    let messages = this.data.messages;
    const messagesGroup = utils.groupingBy(res, 'createdAt');
    Object.keys(messagesGroup).forEach(key => {
      let included = messages.find(m => m.date === key);
      if(included) {
        included.messages = included.messages.concat(messagesGroup[key]);
      }else{
        messages.push({date:key, messages:messagesGroup[key]});
      }
    });
    this.setData({
      messages:messages
    });
  }
});