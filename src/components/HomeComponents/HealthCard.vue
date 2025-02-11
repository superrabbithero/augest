<template>
  <div class="health-card" >
    <p :style="{color: bmiColor}">{{bmi.toFixed(2)}}</p>
    <p :style="{color: bmiColor,fontSize: 1+'rem'}">{{bmitake}}</p>
    <div id="weight-chart"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import { ref, onMounted,  } from 'vue';
import jsonData from '../../assets/json/data.json'

import { doc, updateDoc, arrayUnion,setDoc,getDoc} from "firebase/firestore";
import { db } from "@/assets/js/firebase.js";  // 引入已初始化的 storage 实例
// import MyChart from "./MyChart.vue"

export default {
  name: 'HealthCard',
  setup(){
    const weights = ref(jsonData.myweights)
    const weight = ref(0)
    const height = ref(1.74)
    const bmi = ref(0)
    const bmiColor = ref(null)
    const bmitake = ref("")
    const docRef = doc(db, "jsonfiles", "myWeightJson")

    onMounted(() => {
      

      fetchJson().then((result)=>{
        weights.value = result
      }).finally(()=>{
        weight.value = weights.value.slice(-1)[0].value
        bmi.value = weight.value/height.value/height.value
        setBmiColor(bmi.value)
        drawchart(getdata(weights.value.slice(-7)),getweightdate(weights.value.slice(-7)))
      })

      
    });

    // function setWeight(w){
    //   weight.value = w
    //   weights.value.push(w)
    //   localStorage.setItem('myweights', weights.value)
    // }

    async function addMyWeight(weight) {
      try {
        // 假设你要更新/写入 Firestore 集合中的文档
        await updateDoc(docRef, { myweights:arrayUnion({date:'2025-02-11',value:87})});
        console.log("Document successfully written!");
      } catch (error) {
        console.error("Error writing document:", error);
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

    // const docRef = doc(db, "jsonfiles", "myWeightJson")

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

    return{
      weight,
      height,
      bmi,
      bmiColor,
      bmitake
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

