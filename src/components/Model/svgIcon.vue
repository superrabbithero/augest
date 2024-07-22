<template>
  <svg :class="svgClass" aria-hidden="true" :style="svgStyle">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    },
    fill: {
      type: String,
      default: "auto"
    },
    size: {
      type: Number,
      default: 25
    }
  },
  computed: {
    iconName() {
      return `#icon-${this.name}`;
    },
    svgClass() {
      if (this.className) {
        return 'svg-icon ' + this.className;
      } else {
        return 'svg-icon';
      }
    },
    svgStyle() {
      return {
        width: `${this.size}px`,
        height: `${this.size}px`,
        color: `${this.fill}`
      }
    }

  }
};
</script>

<style scoped>
.svg-icon {
  vertical-align: middle;
  fill: currentColor;
}
</style>
