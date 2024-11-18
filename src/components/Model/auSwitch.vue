<template>
  <div
    :class="[
      `switch ${size}`, 
      { 'switch-on': modelValue }
    ]"
    @click="toggle"
  >
  <div class="switch-handle"></div>
    </div>
  </template>
  
  <script>
  export default {
    name: "Switch",
    props: {
      modelValue: {
        type: Boolean,
        default: false,
      },
      size:{
        tpye: String,
        default: 'normal'
      }
    },
    emits: ["update:modelValue"],
    methods: {
      toggle() {
        this.$emit("update:modelValue", !this.modelValue);
      },
    },
  };
  </script>
  
  <style scoped>
  .switch{
    width: 50px;
    height: 24px;
    border-radius: 25px;
    background-color: var(--layout-bgc);
    box-shadow: var(--inset-boxShadow-gray);
    position: relative;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .switch-on {
    background-color: #ffc848;
    box-shadow: var(--inset-boxShadow-yellow);
  }
  .switch-handle {
    width: 20px;
    height: 20px;
    background-color: var(--handle-color);
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 3px;
    transform: translateY(-50%);
    transition: left 0.3s ease;
    box-shadow: var(--outset-boxShadow-gray);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .switch-handle:after {
    content: "";
    display: block;
    box-sizing: border-box;
    
    background-color: #ffc848;
    transition: width 0.3s ease;
  }

  .switch-on .switch-handle {
    background-color: #fff;
    box-shadow: var(--outset-boxShadow-yellow);
  }

  .switch-on .switch-handle:after {
    content: "";
    display: block;
    box-sizing: border-box;
    border-radius: unset;
    background-color: #ffc848;
  }

  .switch.normal {
    width: 50px;
    height: 24px;
  }

  .switch.normal .switch-handle{
    width: 20px;
    height: 20px;
    left: 2px;
  }

  .switch.normal .switch-handle:after{
    width: 10px;
    height: 10px;
    border-radius: 5px;
  }

  .switch.normal.switch-on .switch-handle {
    left: 28px;
  }

  .switch.normal.switch-on .switch-handle:after{
    width: 4px;
    border-radius: 2px;
    height: 10px;
  }

  .switch.big {
    width: 60px;
    height: 28px;
  }

  .switch.big .switch-handle{
    width: 24px;
    height: 24px;
    left: 2px;
  }

  .switch.big .switch-handle:after{
    width: 10px;
    height: 10px;
    border-radius: 5px;
  }

  .switch.big.switch-on .switch-handle {
    left: 34px;
  }

  .switch.big.switch-on .switch-handle:after{
    width: 4px;
    border-radius: 2px;
    height: 10px;
  }

  .switch.small {
    width: 40px;
    height: 20px;
  }

  .switch.small .switch-handle{
    width: 16px;
    height: 16px;
    left: 2px;
  }

  .switch.small .switch-handle:after{
    width: 10px;
    height: 10px;
    border-radius: 5px;
  }

  .switch.small.switch-on .switch-handle {
    left: 22px;
  }

  .switch.small.switch-on .switch-handle:after{
    width: 4px;
    border-radius: 2px;
    height: 10px;
  }


  </style>
  