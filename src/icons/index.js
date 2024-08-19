// 引入所有svg图标
const requireAll = (r) => r.keys().map(r)
const request = require.context("./", true, /\.svg$/)
const svgIconResult = requireAll(request)

export default svgIconResult

// console.log(request);
console.log(request.keys());
// console.log(request.id);
// console.log(request.resolve);
// console.log("***********result*******")
// console.log(result)