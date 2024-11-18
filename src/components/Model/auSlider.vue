<template>
  <div class="au-slider-container">
    <div class="au-slider-track-box"  @pointerdown="handleTrackStart">
      <div class="au-slider-track" ref="track">
        <div class="au-slider-runnable-track" ref="process"></div>
      </div>
    </div>
    <div class="au-slider-thumb" ref="thumb" @pointerdown="handleThumbStart"></div>
  </div>
</template>

<script>
import { ref, reactive, onMounted, onBeforeUnmount, watch ,nextTick } from 'vue';

export default {
  props: {
    modelValue: {
      type: Number,
      required: true
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    step: {
      type: Number,
      default: 1
    },
    vertical: {
      type: Boolean,
      default: false
    }
  },
  setup(props, {emit}) {
    const track = ref(null);
    const thumb = ref(null);
    let thumbDrag = false
    const process = ref(null);
    const disx = ref(0);
    const disy = ref(0);
    const modelValue = ref(props.modelValue);
    console.log(`setup:${modelValue.value}`)
    const step_px = ref(0)

    onMounted(() => {
      track.value = document.querySelector('.au-slider-track');
      console.log(`onMounted`)
      console.log(track.value)
      console.log(thumb.value)
      console.log(process.value)
      step_px.value = track.value.clientWidth/props.max*props.step;
      console.log(`setup:step_px.value=${track.value.clientWidth}/${props.max}*${props.step}`)
      console.log(`setup:step_px.value=${step_px.value}`)
      const left = Math.floor(modelValue.value/props.step) * step_px.value
      console.log(`left:${left}`)
      process.value.style.width = `${left}px`
      thumb.value.style.left = `${left}px`;
      console.log(`onMounted:${modelValue.value}`)
    });

    onBeforeUnmount(() => {
      document.removeEventListener('pointermove', handleThumbMove);
      document.removeEventListener('pointerup', handleThumbUp);
    });

    

    const handleThumbStart = (e) => {
      e.preventDefault();
      if (!thumbDrag) {
        thumbDrag = true
        disx.value = e.pageX - thumb.value.offsetLeft;
        disy.value = e.pageY - thumb.value.offsetTop;
        
        document.addEventListener('pointermove', handleThumbMove);
        document.addEventListener('pointerup', handleThumbUp);
      }
    };

    const handleTrackStart = (e) => {
      console.log(`handleTrackStart-1:${modelValue.value}`)
      if(!thumbDrag){
        thumbDrag = true
      
        console.log(`left_steped = Math.floor(${e.offsetX}/${step_px.value})*${step_px.value}`)
        const left_steped = Math.floor(e.offsetX/step_px.value)*step_px.value
        console.log(`left_steped:${left_steped}`)
        const left = Math.min(Math.max(left_steped, 0), thumb.value.parentElement.clientWidth - 20);

        process.value.style.width = `${left}px`;
        thumb.value.style.left = `${left}px`;
        console.log(`handleTrackStart-2:${modelValue.value}`)
        console.log(`Math.ceil(${props.min} + ${left}/${step_px.value})*${props.step};`)
        modelValue.value = Math.ceil(props.min + left/step_px.value)*props.step;
        console.log(`handleTrackStart-3:${modelValue.value}`)
        emit('update:modelValue', modelValue.value)

        disx.value = e.pageX - thumb.value.offsetLeft;
        disy.value = e.pageY - thumb.value.offsetTop;


        document.addEventListener('pointermove', handleThumbMove);
        document.addEventListener('pointerup', handleThumbUp);
      }
    };

    const handleThumbMove = (e) => {
      e.preventDefault();
      if (thumbDrag) {
        if (props.vertical) {
          const top = Math.min(Math.max(e.pageY - disy.value, 0), thumb.value.parentElement.clientHeight - 20);
          process.value.style.height = `${top}px`;
          thumb.value.style.top = `${top}px`;
        } else {
          const left_steped = Math.floor((e.pageX - disx.value)/step_px.value)*step_px.value
          const left = Math.min(Math.max(left_steped, 0), thumb.value.parentElement.clientWidth - 20);
          
          process.value.style.width = `${left}px`;
          thumb.value.style.left = `${left}px`;
          modelValue.value = Math.ceil(props.min + left/step_px.value)*props.step;
          emit('update:modelValue', modelValue.value)
        }
      }
    };

    const handleThumbUp = () => {
      thumbDrag = false;
      document.removeEventListener('pointermove', handleThumbMove);
      document.removeEventListener('pointerup', handleThumbUp);
    };

    return {
      thumb,
      process,
      modelValue,
      handleTrackStart,
      handleThumbStart
    };
  }
};
</script>

<style scoped>
.log {
  position: absolute;
  width: 50px;
  left: -50px;
}
/*容器*/
.au-slider-container {
  position: relative;
  background-color: transparent;
  width: 100%;
  height: 30px;
}

/*轨道*/
.au-slider-track-box {
  height: 100%;
  
}
.au-slider-track {
  position: absolute;
  height: 6px;
  border-radius: 3px;
  width: calc(100% - 20px);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--layout-bgc);
  box-shadow: var(--inset-boxShadow-gray);
  overflow: hidden;
}
.au-slider-runnable-track {
  position: absolute;
  height: 100%;
  background-color: #ffc848;
  box-shadow: var(--inset-boxShadow-yellow);
  width: 0;
  left: 0;
}
/*滑块*/
.au-slider-thumb {
  width: 20px;
  height: 20px;
  position: absolute;
  left: 0px;
  top: 50%;
  border-radius: 50%;
  transform: translateY(-50%);
  background-color: #fff;
  box-shadow: var(--outset-boxShadow-gray);
  touch-action: none;
  cursor: pointer;
}
</style>
