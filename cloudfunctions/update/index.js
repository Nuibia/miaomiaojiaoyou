// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV //动态获取数据库
})
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async(event, context) => {
  // return db.collection('ahf').get()
  try {
    if (typeof event.data == 'string') {
      event.data = eval('(' + event.data + ')') //将字符串转换成js
    }
    if(event.doc){
      return await db.collection(event.collection)
        .doc(event.doc)
        .update({
          data: {
            ...event.data
          },
        })
    }else{
      return await db.collection(event.collection)
        .where({ ...event.where })
        .update({
          data: {
            ...event.data
          },
        })
    }
    
  } catch (e) {
    console.error(e)
  }
}



