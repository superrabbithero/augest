<template>
  <svg :class="svgClass" aria-hidden="true">
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
    }
  }
};
</script>

<style scoped>
.svg-icon {
  width: 1.5rem;
  height: 1.5rem;
  fill: currentColor;
  vertical-align: middle;
}
</style>
