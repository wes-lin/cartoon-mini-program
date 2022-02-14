Page({
  data: {
    show:false
  },
  getUserInfo(event) {
    console.log(event.detail);
  },
  previewImage() {
    const src = 'https://cartoon-1256749765.cos.ap-shanghai.myqcloud.com/assets/donation.jpg';
    wx.previewImage({
      current: src,
      urls: [src]
    });
  }
});