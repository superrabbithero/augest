const user = {"name":"markethuang:xctest","pwd":"c34dd995a8132605764a9347dae6e8ca"}
const env_path = ["","https://xqdsj-stagingtest1.xuece.cn/","https://xqdsj-stagingtest2.xuece.cn/"]
let Authtoken = ""
let schoolId = 19


export function login(env, callback) {
	var url = env_path[env]+"api/usercenter/nnauth/user/login?"+"username="+user.name+"&encryptpwd="+user.pwd +"&clienttype=BROWSER&clientversion=1.25.7&systemversion=chrome122.0.0.0";

	// 创建 XMLHttpRequest 对象
	const xhr = new XMLHttpRequest();

	// 配置请求
	xhr.open('GET', url, true);

	// 监听请求状态的变化
	xhr.onreadystatechange = function() {
	  // 当请求完成且成功时
	  if (xhr.readyState === 4 && xhr.status === 200) {
	    // 处理返回的数据
	    const response = JSON.parse(xhr.responseText);
	    Authtoken = response.data.authtoken
	    schoolId = response.data.user.schoolId
	    const jsonData = JSON.stringify({token:Authtoken,schoolId:schoolId})
	    setCookie('xuecelogin',jsonData,30)
	    callback(null)
	  }else{
	  	callback(new Error('登录失败'))
	  }
	};

	// 发送请求
	xhr.send();
}

export function getanswercard(env, type, id, callback) {
	var url = env_path[env]+"api/examcenter/teacher/answercard/editinfo?exampaperId="+id

	if(type == 1){
		url = env_path[env]+"api/classworkcenter/teacher/classwork/answercard/get?classworkId="+id
	}
	// 创建 XMLHttpRequest 对象
	// console.log(url)
	const xhr = new XMLHttpRequest();

	// 配置请求
	xhr.open('GET', url, true);

	const jsonData = getCookie('xuecelogin')
	let data = null

	if(jsonData){
		data = JSON.parse(jsonData)
	}else{
		login(env, (loginError) => {
	    		if (loginError){
	    			callback(loginError)
	    		}else{
	    			const jsonData = getCookie('xuecelogin')
					data = JSON.parse(jsonData)
	    		}
	    	})
		
	}
	


	// 设置请求头
	xhr.setRequestHeader('Authtoken', data.token);
	xhr.setRequestHeader('Xc-App-User-Schoolid', data.schoolId);

	// console.log(data.token)


	// 监听请求状态的变化
	xhr.onreadystatechange = function() {
	  // 当请求完成且成功时
	  if (xhr.readyState === 4 && xhr.status === 200) {
	    // 处理返回的数据
	    const response = JSON.parse(xhr.responseText);

	    if (response.code == "AUTH_EXPIRED" ||response.code == "AUTH_ANOTHERNEW"){
	    	login(env, (loginError) => {
	    		if (loginError){
	    			callback(loginError)
	    		}else{
	    			getanswercard(env, type, id, callback)
	    		}
	    	})
	    }else if(response.code == "ERROR" || response.code == "FAILURE" ){
	    	callback(new Error('未找到考试或作业'))
	    }else{
	    	var cutjsonstr = "";
	    	var pdfUrl = ""
	    	if(type == 1){
	    		cutjsonstr = response.data[0].answercard.cutParamJsonStr;
	    		pdfUrl = response.data[0].answercard.pdfUrl
	    	}else{
	    		console.log(response.data)
	    		cutjsonstr = response.data.cutparamJsonstr2;
	    		pdfUrl = response.data.pdfUrl
	    		// console.log(cutjsonstr,pdfUrl)
	    	}
	    	callback(null, {cutjsonstr,pdfUrl})
	    }
	    
	    // console.log(response);
	  }
	};

	// 发送请求
	xhr.send();

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