<template>
    <div
      class="switch"
      :class="{ 'switch-on': modelValue }"
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
  .switch {
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
    background-color: #fff;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 3px;
    transform: translateY(-50%);
    transition: left 0.3s ease;
    box-shadow: var(--outset-boxShadow-gray);
  }
  .switch-on .switch-handle {
    left: 27px;
    box-shadow: var(--outset-boxShadow-yellow);
  }
  </style>
  