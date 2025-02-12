<template>
  <div class="health-card" v-if="weights == null"><loading /></div>
  <div class="health-card" v-else @click="modal_show.edit_show=true">
    <p :style="{color: bmiColor}">{{bmi.toFixed(2)}}</p>
    <p :style="{color: bmiColor,fontSize: 1+'rem'}">{{bmitake}}</p>
    <div id="weight-chart"></div>
  </div>
  <my-model :show="modal_show.edit_show" :modeless="false" :modalKey="'edit_show'">
    <div style="width: 100%">
      <div style="width: fit-content;margin: 0 auto;">
        <label>今日体重：</label>
        <input placeholder="请输入体重" v-model="todayWeight"/>
        <label style="margin-left: 0.3rem;">kg</label>
      </div>
    </div>
    <div style="width: 100%;display: flex;justify-content: flex-end;margin-top: 0.8rem;">
      <button class="fill" @click="submitWeight">提交</button>
    </div>
  </my-model>
</template>

<script>
import * as echarts from 'echarts';
import { ref, onMounted,  } from 'vue';
import jsonData from '../../assets/json/data.json'
import loading from '@/components/loading/pixLoading.vue'
import {useToast} from '@/assets/js/toast.js'


import { doc, updateDoc, arrayUnion,setDoc,getDoc} from "firebase/firestore";
import { db } from "@/assets/js/firebase.js";  // 引入已初始化的 storage 实例
// import MyChart from "./MyChart.vue"

export default {
  name: 'HealthCard',
  components:{loading},
  setup(){
    const weights = ref(null)
    const weight = ref(0)
    const height = ref(1.74)
    const bmi = ref(0)
    const bmiColor = ref(null)
    const bmitake = ref("")
    const docRef = doc(db, "jsonfiles", "myWeightJson")
    const modal_show = ref({edit_show:false})
    const todayWeight = ref(null)
    const todayHasAdded = ref(false)
    const toast = useToast()

    onMounted(() => {

      init()
      
    });

    // function setWeight(w){
    //   weight.value = w
    //   weights.value.push(w)
    //   localStorage.setItem('myweights', weights.value)
    // }

    const init = ()=>{
      const date = new Date();
      const today = getFormateDate(date)

      weights.value = null

      fetchJson().then((result)=>{
        weights.value = result
      }).catch((error)=>{
        weights.value = jsonData.myweights
      }).finally(()=>{
        weight.value = weights.value.slice(-1)[0].value
        if(weights.value.slice(-1)[0].date == today){
          todayWeight.value = weights.value.slice(-1)[0].value
          todayHasAdded.value = true
        }
        
        bmi.value = weight.value/height.value/height.value
        setBmiColor(bmi.value)
        drawchart(getdata(weights.value.slice(-7)),getweightdate(weights.value.slice(-7)))
      })
    }

    async function addMyWeight(weight) {
      const date = new Date();
      const today = getFormateDate(date)
      try {
        // 假设你要更新/写入 Firestore 集合中的文档
        await updateDoc(docRef, { myweights:arrayUnion({date:today,value:weight})});
        console.log("Document successfully written!");
        return 'success'
      } catch (error) {
        console.error("Error writing document:", error);
        return error
      }
    }

    async function fetchJson() {
      try {
        // 假设 JSON 文件存储在 Firestore 的一个集合中，叫做 "jsonFiles"
        const docSnap = await getDoc(docRef);
        return docSnap.data().myweights
      } catch (error) {
        console.error("Error fetching document:", error);
        throw error
      }
    }

    const submitWeight = () => {

      const regex = /^-?\d+(\.\d+)?$/;

      if (regex.test(todayWeight.value)) {
        todayWeight.value = parseFloat(todayWeight.value).toFixed(2);  // 保留两位小数
        if(todayHasAdded.value){
          //更新
          console.log('更新')
        }else{
          //新增
          addMyWeight(todayWeight.value).then((result)=>{
            if(result === 'success'){
              init()
            }else{
              console.log('更新失败请重试')
              toast.show('更新失败请重试','error')
            }
          })
        }
      } else {
          console.log('请输入有效的数字');  // 提示信息
          toast.show('请输入有效的数字','error')
          todayWeight.value = null;  
      }
      
    }

    function setBmiColor(bmi = bmi.value){

      if(bmi < 18.5){
        // 体重过低
        bmiColor.value = '#fab1a0'
        bmitake.value = "体重过低"
      }else if(bmi < 24){
        //nomal
        bmiColor.value = '#55efc4'
        bmitake.value = "正常"
      }else if(bmi < 28){
        //pre fat
        bmiColor.value = '#ffab5b'
        bmitake.value = "肥胖前期"
      }else if(bmi < 30){
        //fat I
        bmiColor.value = '#ffab5b'
        bmitake.value = "I 度肥胖"
      }else if(bmi < 40){
        //fat II
        bmiColor.value = '#d63031'
        bmitake.value = "II 度肥胖"
      }else{
        //fat III
        bmiColor.value = '#d63031'
        bmitake.value = "III 度肥胖"
      }
    }

    function getchartcolor(weight){
      var bmi = weight/height.value/height.value
      if(bmi < 18.5){
        // 体重过低
        return '#fab1a0'
      }else if(bmi < 24){
        //nomal
        return '#55efc4'
      }else if(bmi < 28){
        //pre fat
        return '#ffab5b'
      }else if(bmi < 30){
        //fat I
        return '#ffab5b'
      }else if(bmi < 40){
        //fat II
        return '#d63031'
      }else{
        //fat III
        return '#d63031'
      }
    }

    function getchartlinecolor(){
      if(weights.value.slice(-7,-6)[0].value >= weight.value){
        return '#55efc4'
      }else{
        return '#ffeaa7'
      }
    }

    function getdata(array){
      console.log(array)
      let datas = []
      for (var i=0; i<array.length;i++){
        datas.push({
          value:array[i].value,
          itemStyle:{
            color: getchartcolor(array[i].value),
            lineStyle:{
                color: getchartcolor(array[i].value)
              }
          }
        })
      }
      console.log(datas)
      return datas
    }

    function getweightdate(array){
      console.log(array)
      let datas = []
      for (var i=0; i<array.length;i++){
        datas.push(array[i].date)
      }
      console.log(datas)
      return datas
    }

    function drawchart(data,dates){
      let myChart = echarts.init(document.getElementById("weight-chart"));
      // 绘制图表
      myChart.setOption({
        xAxis: {
          show: false,  //不显示axisTick、axisLine、axisLab
          data: dates,
        },
        yAxis: {
          show:false,
          min: 'dataMin',
          max: 'dataMax'
        },
        grid:{
          left:10,
          right:10,
          top:10,
          bottom:10
        },
        series: [
          {
            name: "体重",
            type: "line",
            data: data,
            symbol: 'emptycircle',
            symbolSize: 6,
            itemStyle:{
              color: bmiColor.value,
              // borderColor:bmiColor.value,
              
            }
          }
        ],
        tooltip: { // 鼠标悬浮提示框显示 X和Y 轴数据
         trigger: 'axis',
         backgroundColor: 'rgba(32, 33, 36,.7)',
         borderColor: 'rgba(32, 33, 36,0.20)',
         // borderWidth: 1,
         textStyle: { // 文字提示样式
           color: '#fff',
           fontSize: '12'
         },
         axisPointer: { // 坐标轴虚线
           type: 'none',
           // label: {
           //     backgroundColor: '#6a7985'
           // }
         },
        }
      });
      window.onresize = function () { // 自适应大小
        myChart.resize();
      };
    }

    const getFormateDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从0开始，所以需要加1
      const day = String(date.getDate()).padStart(2, '0'); // 确保是两位数
      return `${year}-${month}-${day}`;
    }

    return{
      weights,
      weight,
      todayWeight,
      height,
      bmi,
      bmiColor,
      bmitake,
      modal_show,
      submitWeight
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .health-card {
    display: flex;
    flex-direction: column;
    align-items: center;

  }

  .health-card > p {
    font-size: 2rem;
    margin: 0;
  }

  #weight-chart {
    height: 60px;
    width: 100%;
    max-width: 250px;
  }

</style>

