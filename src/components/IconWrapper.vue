<!-- IconWrapper.vue -->
<template>
  <component
    :is="iconComponent"
    :size="size"
    :theme="theme"
    :fill="defaultColor"
    :strokeWidth="strokeWidth"
    @mouseenter="changecolor"
    @mouseleave="unchangecolor"
  />
</template>

<script>
import { ref } from 'vue';
import * as icons from '@icon-park/vue-next';  // 导入所有的 icons

export default {
  name: 'IconWrapper',
  props: {
    iconName: {
      type: String,
      required: true
    },
    size: {
      type: [Number, String],
      default: 22
    },
    theme: {
      type: String,
      required: true
    },
    defaultColor: {
      type: String,
    },
    isHover:{
      type: Boolean,
      default: false
    },
    strokeWidth:{
      type: [Number, String],
      default: 2
    },
    hoverColor: {
      type: String,
      default: '#000'
    }
  },
  setup(props) {
    const changed = ref(false);
    const iconComponent = icons[props.iconName];  // 根据 iconName 获取相应的图标组件

    // console.log(props.iconName)

    const changecolor = () => {
      changed.value = true;
    }

    const unchangecolor = () => {
      // console.log(props.isHover && changed.value)
      changed.value = false
    }

    const fillcolor = () => {
      return props.isHover && changed.value ? props.hoverColor : props.defaultColor
    }

    return {
      changed,
      iconComponent,
      changecolor,
      unchangecolor,
      fillcolor,
    };
  },

}
</script>