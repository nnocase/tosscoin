// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    minNum: 1,
    maxNum: 10000,
    isDecimal: true,
    number: 10,
    res: [],
    isCopy: false,
    places: [1, 2, 3, 4, 5],
    place: [0],
    placeVal: 1,
  },

  changeDecimal(e){
    this.setData({
      isDecimal: e.detail.value
    })
  },

  changePlace(e){
    let place = e.detail.value
    // console.log(this.data.places[place[0]])
    this.setData({
      place,
      placeVal: this.data.places[place[0]]
    })
  },

  getMinNum(e){
    if(e.detail.value){
      this.setData({
        minNum: e.detail.value
      })
    }
  },

  getMaxNum(e){
    if(e.detail.value){
      this.setData({
        maxNum: e.detail.value
      })
    }
  },

  //生成从minNum到maxNum的随机数
  randomNum(min, max, isDecimal, number, placeVal){ 
    [max, min] = min > max ? [min, max] : [max, min] 
    // console.log(min, max, isDecimal, number)
    let res = []
    if (isDecimal){
      min = parseFloat(min);
      max = parseFloat(max);
      for(var i = 1; i <= number; i++){
        let _res = Math.random()*(max + 1 - min) + min;
        while(_res > max) {
            _res = Math.random()*(max + 1 - min) + min;
        }
        _res = _res.toFixed(placeVal)
        // _res = parseFloat(_res) // 不转float了，直接字符串
        res.push(_res)
      }
      return res
    }else{
      min = Math.ceil(min);
      max = Math.floor(max);
      for(var i = 1; i <= number; i++){
        let _res = Math.floor(Math.random() * (max - min + 1)) + min; //含最大值，含最小值 
        res.push(_res)
      }
      return res
    }
  },


  formSubmit(e) {
    let data = e.detail.value
    // console.log(data)

    if(data.number){
      let res = this.randomNum(
        this.data.minNum, 
        this.data.maxNum,
        data.isDecimal,
        data.number,
        this.data.placeVal
      )

      this.setData({
        isDecimal: data.isDecimal,
        number: data.number,
        res: res,
        isCopy: true
      })
    }else{
      wx.showToast({
        title: '请选择数量',
        icon: 'error',
        duration: 2000
      })
    }
  },

  formReset(e) {
    // console.log('form发生了reset事件，携带数据为：', e.detail.value)
    this.setData({
      res: [],
      isCopy: false,
      isDecimal: false,
      place: [0],
      placeVal: 1
    })
  },

  copyText (e) {
    let data = e.currentTarget.dataset.text
    if(this.data.isCopy) {
      data = data.join(' ')
      wx.setClipboardData({
        data: data,
        success (res) {},
        fail (err) {
          wx.showToast({
            title: '内容复制失败',
          })
        }
      })
    }
  },

  onShareAppMessage() {
    return {
      title: '随机数',
      path: 'pages/index/index'
    }
  },


  onLoad() {
    
  }
})
