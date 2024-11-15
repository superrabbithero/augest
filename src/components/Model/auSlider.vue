<template>
  <div class="au-slider-container">
    <div class="au-slider-track-box" @pointerdown="handleTrackStart">
      <div class="au-slider-track">
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
    data: {
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
    const thumb = ref(null);
    let thumbDrag = false
    const process = ref(null);
    const disx = ref(0);
    const disy = ref(0);
    const data = ref(props.data);
    console.log(`setup:${data.value}`)
    const step_px = ref(0)

    onMounted(() => {
      process.value = document.querySelector('.au-slider-runnable-track');
      step_px.value = document.querySelector('.au-slider-track').clientWidth/props.max*props.step;
      console.log(`setup:step_px.value=${document.querySelector('.au-slider-track').clientWidth}/${props.max}*${props.step}`)
      console.log(`setup:step_px.value=${step_px.value}`)
      const left = Math.floor(data.value/props.step) * step_px.value
      console.log(`left:${left}`)
      process.value.style.width = `${left}px`

      thumb.value = document.querySelector('.au-slider-thumb')
      thumb.value.style.left = `${left}px`;
      console.log(`onMounted:${data.value}`)
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
      console.log(`handleTrackStart-1:${data.value}`)
      if(!thumbDrag){
        thumbDrag = true
      
        console.log(`left_steped = Math.floor(${e.offsetX}/${step_px.value})*${step_px.value}`)
        const left_steped = Math.floor(e.offsetX/step_px.value)*step_px.value
        console.log(`left_steped:${left_steped}`)
        const left = Math.min(Math.max(left_steped, 0), thumb.value.parentElement.clientWidth - 20);

        process.value.style.width = `${left}px`;
        thumb.value.style.left = `${left}px`;
        console.log(`handleTrackStart-2:${data.value}`)
        console.log(`Math.ceil(${props.min} + ${left}/${step_px.value})*${props.step};`)
        data.value = Math.ceil(props.min + left/step_px.value)*props.step;
        console.log(`handleTrackStart-3:${data.value}`)
        emit('change', data.value)

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
          data.value = Math.ceil(props.min + left/step_px.value)*props.step;
          emit('change', data.value)
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
      data,
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
  background-color: var(--button-highlight);
  overflow: hidden;
}
.au-slider-runnable-track {
  position: absolute;
  height: 100%;
  background-color: #ffc848;
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
  background-color: #ffc848;
  touch-action: none;
  cursor: pointer;
}
</style>
