const router = require('koa-router')()
const config = require('../config.js')
const request = require('request-promise')
const fs = require('fs')
router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})
router.post('/uploadBannerImg', async (ctx, next) => {
  //获取access_token
  var files = ctx.request.files;
  var file = files.file;
  try {
    let options = {
      //获取access_token值
      uri: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + config.appid + '&secret=' + config.secret + '',
      json: true
    }
    let { access_token } = await request(options)
    let fileName = `${Date.now()}.jpg`;
    let filePath = `banner/${fileName}`;

    options = {
      method: 'POST',
      //调用云存储相关，上传图片
      uri: 'https://api.weixin.qq.com/tcb/uploadfile?access_token=' + access_token + '',
      body: {
        //环境名字
        "env": 'ahf-oz31v',
        //路径名字
        "path": filePath,
      },
      json: true,
    }
    let res = await request(options);
    let file_id = res.file_id;
//云数据库插入 云存储是以file_id当做路径的，而不是url
    options = {
      method: 'POST',
      uri: ' https://api.weixin.qq.com/tcb/databaseadd?access_token=' + access_token + '',
      body: {
        "env": 'ahf-oz31v',
        "query": "db.collection(\"banner\").add({data:{fileId:\"" + file_id + "\"}})"//插入语句
      },
      json: true
    }

    await request(options)
    ctx.body = res;
  } catch (err) {
    console.log(err);
  }
})

module.exports = router
