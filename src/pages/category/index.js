import {categoryList} from '@Api/category';
import { getStorageSync, setStorageSync} from '@Utils/storage';
Page({
  data: {
    categories:[]
  },
  onLoad: function() {
    
    let categories = getStorageSync('categories');
    if(categories) {
      this.setData({categories:categories});
      return;
    }
    
    categoryList().then(res => {
      const categories = res;
      //缓存一天
      setStorageSync('categories', categories, 60 * 60 * 24);
      this.setData({categories:categories});
    });
  }
});