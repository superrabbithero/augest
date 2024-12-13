const user = {"name":"markethuang:xctest","pwd":"c34dd995a8132605764a9347dae6e8ca"}
const env_path = ["","https://xuece-xqdsj-stagingtest1.unisolution.cn/","https://xuece-xqdsj-stagingtest2.unisolution.cn/"]
let Authtoken = ""
let schoolId = 19


export function login(env) {
	var url = env_path[env]+"api/usercenter/nnauth/user/login?"+"username="+user.name+"&encryptpwd="+user.pwd +"&clienttype=BROWSER&clientversion=1.25.7&systemversion=chrome122.0.0.0";
	return new Promise((resolve, reject)=>{
		fetch(url).then(response => {
			// 检查请求是否成功
	    if (!response.ok) {
	      throw new Error('Network response was not ok');
	    }
	    // 将响应解析为 JSON
	    return response.json();
		}).then(data => {
			// console.log(data)
			Authtoken = data.data.authtoken
			schoolId = data.data.user.schoolId
			// console.log(Authtoken,schoolId)
			const jsonData = JSON.stringify({token:Authtoken,schoolId:schoolId})
			setCookie('xuecelogin',jsonData,30)
			resolve(true)
		}).catch(error => {
			// 处理请求或响应过程中发生的错误
	    console.error('There was a problem with your fetch operation:', error);
	    reject(error)
		})
	})
	
}

export function getanswercard(env, type, id) {
	var url = env_path[env]+"api/examcenter/teacher/answercard/editinfo?exampaperId="+id

	if(type == 1){
		url = env_path[env]+"api/classworkcenter/teacher/classwork/answercard/get?classworkId="+id
	}

	const jsonData = getCookie('xuecelogin')
	var data = null

	if(!jsonData){
		login(env).then(
			data=JSON.parse(jsonData)
			).catch(error=>{
				console.error('There was a problem with your fetch operation:', error);
			})
	}else{
		data = JSON.parse(jsonData)
	}
	
	return new Promise((resolve, reject) => {
		fetch(url, {
			method: 'GET',
			headers: {
				'Authtoken': data.token,
				'Xc-App-User-Schoolid': data.schoolId
			}
		}).then(response => {
			// 检查请求是否成功
	    if (!response.ok) {
	      throw new Error('Network response was not ok');
	    }
	    console.log(response)
	    // 将响应解析为 JSON
	    return response.json();
		}).then(data => {
			// console.log(data)
			if (data.code == "AUTH_EXPIRED"){
	    	login(env).then(
					getanswercard(env, type, id)
					)
	    	.catch(error=>{
	    		throw new Error(error);
				})  		
	    }else if(data.code == "ERROR" || data.code == "FAILURE" ){
	    	throw new Error('未找到考试或作业');
	    }else{
	    	var cutjsonstr = "";
	    	var pdfUrl = ""
	    	if(type == 1){
	    		cutjsonstr = data.data[0].answercard.cutParamJsonStr;
	    		pdfUrl = data.data[0].answercard.pdfUrl
	    	}else{
	    		cutjsonstr = data.data.cutparamJsonstr2;
	    		pdfUrl = data.data.pdfUrl
	    		// console.log(cutjsonstr,pdfUrl)
	    	}
	    	resolve([cutjsonstr,pdfUrl]) 
	    }

		}).catch(error => {
			// console.error('There was a problem with your fetch operation:', error);
			reject(error);
		})
	})
	
	
}

export function downloadPDF(url) {

}


// 写入 cookie
function setCookie(key, value, expires) {
  const date = new Date();
  date.setTime(date.getTime() + (expires * 24 * 60 * 60 * 1000));
  const expiresDate = "expires=" + date.toUTCString();
  document.cookie = key + "=" + value + ";" + expiresDate + ";path=/";
}

// 读取 cookie
function getCookie(key) {
  const name = key + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(';');
  for(let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i];
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  return "";
}