<template>
  <div class="au-layout">
    <div class="rows start gutter-l">
      <div class="cols xs12 sm12" style="padding-bottom: 8px;border-bottom: 2px solid var(--main-color);">
        <!-- <label style="margin-right: 0.5rem;">token:</label> -->
        <div v-if="!authToken" class="login-box">
          <au-select @change="changeEvn" :dataList="['test1','test2']" style="width: 80px;background-color: var(--box-bgc);"/>
          <input v-model="loginPro.username" style="width:auto" type="text" placeholder="请输入账号">
          <input v-model="loginPro.password" style="width:auto" type="password" placeholder="请输入密码">
          <button @click="login()">查询</button>
        </div>
        <div v-else class="crumbs-bar">
          <div class="crumbs">
            <div v-for="(crumb,index) in crumbs" >
              <label >{{crumb}}</label>
              <svg-icon v-if="index < crumbs.length-1" name="slash01" size="20"></svg-icon>
            </div>
          </div>
          <div>
            <button v-if="step==2" @click="step = 1,noteData = null,crumbs.pop()">返回</button>
            <button @click="logout()">切换其他学生</button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="step==1" class="rows gutter-l start">
      <div v-for="(note,index) in noteList" class="cols xs4 sm4 md3 lg2" @click="getCurNote(index)">
        <div class="notebook">
         <svg-icon name="mc-book" size="25"/>
         <label>{{note.noteName}}</label>
        </div>
      </div>
    </div>
    <div v-if="step==2" class="rows start gutter-l">
      <div class="cols xs12 sm12">
        <svg-icon name="notepad01"/>
        <label>笔记内容</label>
      </div>
      <div class="note-pages">
        <div v-for="page in noteData.params" class="item-page">
          <img :src="`${ossUrl}/${noteData.uuid}/thumb_${page}.png`">
        </div>
      </div>
      <div v-if="noteData.medias" class="cols xs12 sm12">
        <svg-icon name="picture01"/>
        <label>图片资源</label>
      </div>
      <div class="note-pages">
        <div v-for="media in noteData.medias" class="item-page">
          <img :src="`${ossUrl}/${noteData.uuid}/medias/${media}`">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted} from 'vue';
import auSelect from './Model/auSelect'
import md5 from 'md5'
import {useToast} from '@/assets/js/toast.js'

export default {
  components:{auSelect},
  setup() {
    const crumbs = ref([])
    const loginPro = ref({'username':'','password':''})
    const authToken = ref('')
    const evn = ref(0)
    const api = ['https://xuece-xqdsj-stagingtest1.unisolution.cn/api','https://xuece-xqdsj-stagingtest2.unisolution.cn/api']
    const ossUrl = ref('https://test-xueceresource.oss-cn-shanghai.aliyuncs.com/notebook/')
    const step = ref(1)
    const noteData = ref(null)
    const noteList = ref([])

    // const instance = getCurrentInstance()

    const toast = useToast()

    onMounted(() => {
      console.log(api[evn.value])
    });

    // onBeforeUnmount(() => {

    // });

    const login = (username=loginPro.value.username,password=loginPro.value.password) => {
      let hash = md5(password)
      const url = api[evn.value] + '/usercenter/nnauth/user/login?username='+username+'&encryptpwd='+hash+'&clienttype=BROWSER&clientversion=1.30.6'

      fetch(url, {
        method: 'GET',
      })
        .then(response => response.json())  // 解析响应为JSON
        .then(data => {
          if(data.code == 'SUCCESS'){
            // 将返回的data保存到一个对象中
            authToken.value = data.data.authtoken
            ossUrl.value = ossUrl.value + data.data.user.id.toString(36)
            crumbs.value.push(`${data.data.user.name}(${username})`)
            console.log(crumbs.value)
            getNoteDetails()
          }else{
            toast.show(data.msg,'error')
            console.log(data.msg)
          }
        })
        .catch(error => {
          console.error('请求失败:', error);
        });
    }

    const getNoteDetails = () => {
      console.log(authToken.value)
      const url = api[evn.value] + '/videocenter/note/details'
      fetch(url, {
        method: 'GET',
        headers: {
          'AuthToken': `${authToken.value}`, // 将authToken传递到请求头
          'Content-Type': 'application/json', // 请求头类型为JSON
        }
      })
        .then(response => response.json())  // 解析响应为JSON
        .then(data => {
          if(data.code == "SUCCESS"){
            // 将返回的data保存到一个对象中
            noteList.value = data.data;
            console.log(noteList.value)
          }else{
            toast.show(data.msg,'error')
            logout()
          }
        })
        .catch(error => {
          console.error('请求失败:', error);
        });

    }

    const getCurNote = (index) => {
      var curNote = noteList.value[index]

      noteData.value = {
        'params':curNote.params.slice(1,-1).split(','),
        'medias':[],
        'uuid':curNote.uuid
      }

      const url = api[evn.value] + '/videocenter/green/resource/url/oss/path/notebook/object/list?notebookUUID=' + curNote.uuid

      // 获得medias列表

      fetch(url, {
        method: 'POST',
        headers: {
          'AuthToken': `${authToken.value}`, // 将authToken传递到请求头
          'Content-Type': 'application/json', // 请求头类型为JSON
        }
      })
        .then(response => response.json())  // 解析响应为JSON
        .then(data => {
          // 将返回的data保存到一个对象中
          noteData.value.medias = data.data;
          crumbs.value.push(curNote.noteName)
          step.value = 2
        })
        .catch(error => {
          console.error('请求失败:', error);
        });

    }

    const logout = ()=>{
      authToken.value = ''
      noteList.value = []
      noteData.value = null
      step.value = 1
      crumbs.value = []
    }

    const changeEvn = (data) => {
      evn.value = data
    }


    

    return {
      noteList,step,getCurNote,noteData,loginPro,authToken,login,logout,ossUrl,crumbs,evn,changeEvn
    };
  }
};
</script>

<style scoped>
.login-box {
  display: flex;
  align-items: center;
}
.login-box > *{
  margin-right: 8px;
}

.crumbs,.crumbs > *{
  display: flex;
  white-space: nowrap;
  align-items: center;

}
.crumbs-bar{
  display:flex;
  width: 100%;
  justify-content: space-between;
  align-items: center
}

.notebook {
  width: 100%;
  background-color: var(--box-bgc);
  margin-bottom: 16px;
  padding: 8px;
  border-radius: 5px;
  outline: 2px solid transparent;
  transition: outline 0.3s ease-out;
} 

.notebook:hover {
  outline: 2px solid var(--main-color);
}

.notebook label {
  margin-left: 0.8rem;
} 
.note-pages {
  width: 100%;
  display: flex;
  flex-wrap: wrap
}
.item-page {
  width: calc(10% - 10px);
  margin: 5px;
  white-space: nowrap;
}
</style>
