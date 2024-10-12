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

export const put = async (path, localFile) => {
  try {
    const result = await client.put(path, localFile);
    console.log(result);
    return result;
  } catch (err) {
    console.error(err);
    throw err; // 抛出错误让外部处理
  }
};

export const get = async (path) => {
  try {
    const result = await client.get(path);
    console.log(result);
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const deleteObject = async (path) => {
  try {
    const result = await client.delete(path);
    console.log(result);
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

