// miniprogram/pages/home/home.js

var a1 = wx.createInnerAudioContext()
var a2 = wx.createInnerAudioContext()
var a3 = wx.createInnerAudioContext()
//定时器编号
var timeoutNumber = 0
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openType: 0,//开关状态
    temperature:16,//温度
    modelType:0,//空调模式
  },
  //调低温度
  clickSub(){
    this.d()
    if(this.data.temperature>16){
      this.setData({
        temperature: this.data.temperature - 1
      })
    }else{
      wx.showToast({
        icon:'error',
        title: '已到最小温度啦',
      })
    }
  },
  //调高温度
  clickAdd(){
    this.d()
    if(this.data.temperature<31){
      this.setData({
        temperature: this.data.temperature + 1
      })
    }else{
      wx.showToast({
        icon:'error',
        title: '已到最大温度啦',
      })
    }
  },

  /**
   * 选择模式
   */
  selectModel(e){
    this.d()
    this.setData({
      modelType: e.currentTarget.dataset.t
    })
  },
  
  /**
   * 点击开关
   */
  clickSwitch(){
    this.d()
    this.setData({
      openType: !this.data.openType
    })
    if(this.data.openType == 1){
      a2.play();
      timeoutNumber = setTimeout(() => {
        a3.play()
      }, 5000);
    }else{
      a2.stop();
      a3.stop();
      clearTimeout(timeoutNumber);
    }
  },

  //滴滴的声音
  d(){
    a1.play()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    a1.src='/static/audio/di.mp3'
    a2.src='/static/audio/ac-work.mp3'
    a3.src='https://cdn.jsdelivr.net/gh/YunYouJun/air-conditioner/public/assets/audio/air-extractor-fan.mp3'
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return{
      title:'送给你一个空调，别客气热了就开哈~',
      imageUrl:'../../images/icons/a0.png'
    }
  },

  /**
   * 最重要的分享到朋友圈
   */
  onShareTimeline:function(){
    return{
      title:'给朋友圈的朋友们安排了空调，别客气热了就开哈~',
      imageUrl:'../../images/icons/a0.png'
    }
  }
})