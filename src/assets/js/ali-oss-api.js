const OSS = require('ali-oss');

const client = new OSS({
  // 从环境变量中获取访问凭证。运行本代码示例之前，请确保已设置环境变量OSS_ACCESS_KEY_ID和OSS_ACCESS_KEY_SECRET。
  accessKeyId: '',
  accessKeySecret: '',
  // yourRegion填写Bucket所在地域。以华东1（杭州）为例，Region填写为oss-cn-hangzhou。
  region: 'oss-cn-beijing',
  authorizationV4: true,
  // yourBucketName填写Bucket名称。
  bucket: 'superrabbithero-appmanage',
});

// client.listBuckets()
//   .then((result)=>{
//     console.log(result)
//   })
//   .catch(err=>{
//     console.log(err)
//   })

export default put(path,localFile){
  // 自定义请求头
  // const headers = {
  //   // 指定Object的存储类型。
  //   'x-oss-storage-class': 'Standard',
  //   // 指定Object的访问权限。
  //   'x-oss-object-acl': 'private',
  //   // 通过文件URL访问文件时，指定以附件形式下载文件，下载后的文件名称定义为example.txt。
  //   'Content-Disposition': 'attachment; filename="example.txt"',
  //   // 设置Object的标签，可同时设置多个标签。
  //   'x-oss-tagging': 'Tag1=1&Tag2=2',
  //   // 指定PutObject操作时是否覆盖同名目标Object。此处设置为true，表示禁止覆盖同名Object。
  //   'x-oss-forbid-overwrite': 'true',
  // };
  client.put(path,localFile)
    .then((result)=>{
      console.log(result)
    })
    .catch((err)=>{
      console.log(err)
    })
}

export default get(path,localFile){
  client.put(path,localFile)
    .then((result)=>{
      console.log(result)
    })
    .catch((err)=>{
      console.log(err)
    })
}

export default deleteObject(path){
  client.delete(path)
    .then((result)=>{
      console.log(result)
    })
    .catch((err)=>{
      console.log(err)
    })
}