Page({
  data: {
    action:"euro-no",
    butonTitle:'抛 硬 币',
    isHidden: false,
    imageUrl:'https://s2.loli.net/2021/12/16/UbHaASBVug35Evw.png',
    title: "硬币标题",
    // coin: { 
    //   "isvalid": true, 
    //   "_id": "5c8918a5c36bb63c72871b87", 
    //   "front_url": 'https://s2.loli.net/2021/12/16/UbHaASBVug35Evw.png', 
    //   "back_url": 'https://s2.loli.net/2021/12/16/vZdy47iqFKHuVtA.png',
    //   "front_title": "硬币正面标题",
    //   "back_title": "硬币反面标题",
    //   "__v": 0
    // },
    front_url: 'https://s2.loli.net/2021/12/16/UbHaASBVug35Evw.png',
    back_url: 'https://s2.loli.net/2021/12/16/vZdy47iqFKHuVtA.png',
    isClicked: false
  },
  onLoad: function (){
    
  },
  buttonAction:function(e){
    //play audio
    this.playAudio();

    wx.vibrateShort({
      type: 'medium',
      success: function(res){
        // console.log(res)
      },
      fail: function(err) {
        // console.log(err)
      }
    })
    // console.log('此处旋转触发')
    var result = Math.floor(Math.random() * 2)
    this.setData({
      action: result == true ? "euro" : "euro-add",
      isHidden: true,
      imageUrl: result == true ? this.data.front_url : this.data.back_url,
      isClicked: true
    });
    var that = this;
    setTimeout(function () {
      let resultStr = result == true ? '正' : '反';
      console.log(resultStr)
      that.setData({
        isHidden: false,
        action: "euro-no",
        imageUrl: result == true ? that.data.front_url : that.data.back_url,
        isClicked: false
      });
    }, 2000);
  },

  playAudio() {
    const innerAudioContext = wx.createInnerAudioContext()
    innerAudioContext.autoplay = true
    innerAudioContext.src = '/static/audio/edit-tosscoin.mp3'
    innerAudioContext.onPlay(() => {
        // console.log('开始播放')
    })
    innerAudioContext.onError((res) => {
        console.log(res.errMsg)
        console.log(res.errCode)
    })
  },

  onShareAppMessage() {
    return {
      title: '抛硬币',
      path: 'pages/tosscoin/tosscoin'
    }
  }
})
