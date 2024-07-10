// 引入所有svg图标
const requireAll = (r) => r.keys().map(r)
const request = require.context("./svg", false, /\.svg$/)
const result = requireAll(request)

console.log(request);
console.log(request.keys());
console.log(request.id);
console.log(request.resolve);
console.log("***********result*******")
console.log(result)