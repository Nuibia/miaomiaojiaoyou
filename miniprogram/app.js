//app.js
App({
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        env: 'ahf-oz31v',
        traceUser: true,
        //检测哪个用户在进行云开发的调用
        //可以在云环境中，运营分析，用户访问中查看到信息
      })
    }

    this.globalData = {}
    this.userInfo={}
    this.userMessage=[]
  }
})
