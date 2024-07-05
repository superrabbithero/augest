<template>
  <div class="tool-setting-bar">
    <div class="right">
      <div class="tool-option">
        <div class="label" style="width: 91px">画笔大小({{penSize}}):</div>
        <input type="range" v-model="penSize" min="1" max="20">
      </div>

    </div>
    <div class="left">
      <div class="tool-option">
        {{log}}
      </div>
      <div class="icon-item" @click="undo">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 330 330"><rect x="90" y="30" width="30" height="30" fill="currentcolor" /><rect x="60" y="60" width="30" height="30" fill="currentcolor" /><rect x="30" y="90" width="30" height="30" fill="currentcolor" /><rect x="60" y="90" width="30" height="30" fill="currentcolor" /><rect x="90" y="90" width="30" height="30" fill="currentcolor" /><rect x="120" y="90" width="30" height="30" fill="currentcolor" /><rect x="150" y="90" width="30" height="30" fill="currentcolor" /><rect x="180" y="90" width="30" height="30" fill="currentcolor" /><rect x="210" y="90" width="30" height="30" fill="currentcolor" /><rect x="60" y="120" width="30" height="30" fill="currentcolor" /><rect x="240" y="120" width="30" height="30" fill="currentcolor" /><rect x="90" y="150" width="30" height="30" fill="currentcolor" /><rect x="270" y="150" width="30" height="30" fill="currentcolor" /><rect x="270" y="180" width="30" height="30" fill="currentcolor" /><rect x="270" y="210" width="30" height="30" fill="currentcolor" /><rect x="240" y="240" width="30" height="30" fill="currentcolor" /><rect x="60" y="270" width="30" height="30" fill="currentcolor" /><rect x="90" y="270" width="30" height="30" fill="currentcolor" /><rect x="120" y="270" width="30" height="30" fill="currentcolor" /><rect x="150" y="270" width="30" height="30" fill="currentcolor" /><rect x="180" y="270" width="30" height="30" fill="currentcolor" /><rect x="210" y="270" width="30" height="30" fill="currentcolor" /></svg>
      </div>
      <div class="icon-item-box">
        <div class="icon-item" @click="dropDown('sizeSettingShow')">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 330 330"><rect x="30" y="30" width="30" height="30" fill="currentcolor" /><rect x="60" y="30" width="30" height="30" fill="currentcolor" /><rect x="90" y="30" width="30" height="30" fill="currentcolor" /><rect x="120" y="30" width="30" height="30" fill="currentcolor" /><rect x="150" y="30" width="30" height="30" fill="currentcolor" /><rect x="180" y="30" width="30" height="30" fill="currentcolor" /><rect x="210" y="30" width="30" height="30" fill="currentcolor" /><rect x="240" y="30" width="30" height="30" fill="currentcolor" /><rect x="270" y="30" width="30" height="30" fill="currentcolor" /><rect x="30" y="60" width="30" height="30" fill="currentcolor" /><rect x="90" y="60" width="30" height="30" fill="currentcolor" /><rect x="150" y="60" width="30" height="30" fill="currentcolor" /><rect x="210" y="60" width="30" height="30" fill="currentcolor" /><rect x="270" y="60" width="30" height="30" fill="currentcolor" /><rect x="30" y="90" width="30" height="30" fill="currentcolor" /><rect x="60" y="90" width="30" height="30" fill="currentcolor" /><rect x="120" y="90" width="30" height="30" fill="currentcolor" /><rect x="180" y="90" width="30" height="30" fill="currentcolor" /><rect x="240" y="90" width="30" height="30" fill="currentcolor" /><rect x="270" y="90" width="30" height="30" fill="currentcolor" /><rect x="30" y="120" width="30" height="30" fill="currentcolor" /><rect x="90" y="120" width="30" height="30" fill="currentcolor" /><rect x="150" y="120" width="30" height="30" fill="currentcolor" /><rect x="210" y="120" width="30" height="30" fill="currentcolor" /><rect x="270" y="120" width="30" height="30" fill="currentcolor" /><rect x="30" y="150" width="30" height="30" fill="currentcolor" /><rect x="60" y="150" width="30" height="30" fill="currentcolor" /><rect x="120" y="150" width="30" height="30" fill="currentcolor" /><rect x="180" y="150" width="30" height="30" fill="currentcolor" /><rect x="240" y="150" width="30" height="30" fill="currentcolor" /><rect x="270" y="150" width="30" height="30" fill="currentcolor" /><rect x="30" y="180" width="30" height="30" fill="currentcolor" /><rect x="90" y="180" width="30" height="30" fill="currentcolor" /><rect x="150" y="180" width="30" height="30" fill="currentcolor" /><rect x="210" y="180" width="30" height="30" fill="currentcolor" /><rect x="270" y="180" width="30" height="30" fill="currentcolor" /><rect x="30" y="210" width="30" height="30" fill="currentcolor" /><rect x="60" y="210" width="30" height="30" fill="currentcolor" /><rect x="120" y="210" width="30" height="30" fill="currentcolor" /><rect x="180" y="210" width="30" height="30" fill="currentcolor" /><rect x="240" y="210" width="30" height="30" fill="currentcolor" /><rect x="270" y="210" width="30" height="30" fill="currentcolor" /><rect x="30" y="240" width="30" height="30" fill="currentcolor" /><rect x="90" y="240" width="30" height="30" fill="currentcolor" /><rect x="150" y="240" width="30" height="30" fill="currentcolor" /><rect x="210" y="240" width="30" height="30" fill="currentcolor" /><rect x="270" y="240" width="30" height="30" fill="currentcolor" /><rect x="30" y="270" width="30" height="30" fill="currentcolor" /><rect x="60" y="270" width="30" height="30" fill="currentcolor" /><rect x="90" y="270" width="30" height="30" fill="currentcolor" /><rect x="120" y="270" width="30" height="30" fill="currentcolor" /><rect x="150" y="270" width="30" height="30" fill="currentcolor" /><rect x="180" y="270" width="30" height="30" fill="currentcolor" /><rect x="210" y="270" width="30" height="30" fill="currentcolor" /><rect x="240" y="270" width="30" height="30" fill="currentcolor" /><rect x="270" y="270" width="30" height="30" fill="currentcolor" /></svg>
        </div>
        <div :class="{'size-setting':true,'show':dropDownBoxShow.sizeSettingShow} " >
          画布大小：
          <div class="size">
            <input type="number" v-model="rows"  @input="drawGrid">
            <span>x</span>
            <input type="number" v-model="cols"   @input="drawGrid">
          </div>
          像素大小：
            <input type="number" v-model="gridSize"  @input="drawGrid">
        </div>
      </div>

      <div class="icon-item-box">
        <div class="icon-item" @click="dropDown('downloadShow')">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 330 330"><rect x="150" y="30" width="30" height="30" fill="currentcolor" /><rect x="150" y="60" width="30" height="30" fill="currentcolor" /><rect x="150" y="90" width="30" height="30" fill="currentcolor" /><rect x="150" y="120" width="30" height="30" fill="currentcolor" /><rect x="30" y="150" width="30" height="30" fill="currentcolor" /><rect x="90" y="150" width="30" height="30" fill="currentcolor" /><rect x="150" y="150" width="30" height="30" fill="currentcolor" /><rect x="210" y="150" width="30" height="30" fill="currentcolor" /><rect x="270" y="150" width="30" height="30" fill="currentcolor" /><rect x="30" y="180" width="30" height="30" fill="currentcolor" /><rect x="120" y="180" width="30" height="30" fill="currentcolor" /><rect x="150" y="180" width="30" height="30" fill="currentcolor" /><rect x="180" y="180" width="30" height="30" fill="currentcolor" /><rect x="270" y="180" width="30" height="30" fill="currentcolor" /><rect x="30" y="210" width="30" height="30" fill="currentcolor" /><rect x="150" y="210" width="30" height="30" fill="currentcolor" /><rect x="270" y="210" width="30" height="30" fill="currentcolor" /><rect x="30" y="240" width="30" height="30" fill="currentcolor" /><rect x="270" y="240" width="30" height="30" fill="currentcolor" /><rect x="30" y="270" width="30" height="30" fill="currentcolor" /><rect x="60" y="270" width="30" height="30" fill="currentcolor" /><rect x="90" y="270" width="30" height="30" fill="currentcolor" /><rect x="120" y="270" width="30" height="30" fill="currentcolor" /><rect x="150" y="270" width="30" height="30" fill="currentcolor" /><rect x="180" y="270" width="30" height="30" fill="currentcolor" /><rect x="210" y="270" width="30" height="30" fill="currentcolor" /><rect x="240" y="270" width="30" height="30" fill="currentcolor" /><rect x="270" y="270" width="30" height="30" fill="currentcolor" /></svg>
        </div>
        <div :class="{'size-setting':true,'show':dropDownBoxShow.downloadShow} " >
          <div class="drop-down-option" @click="saveAsSvg">保存成 svg</div>
          <div class="drop-down-option" @click="copySvgCode">复制 svg 代码</div>
          <div class="drop-down-option">保存成 png</div>
        </div>
      </div>
        
    </div>
  </div>
  <div class="work-area">
    <div class="left">
      <div class="tools-bar">
      <div class="tool-item" @click="tool = 1">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 450 450"><rect x="300" y="30" width="30" height="30" fill="currentcolor" /><rect x="270" y="60" width="30" height="30" fill="currentcolor" /><rect x="300" y="60" width="30" height="30" fill="currentcolor" /><rect x="330" y="60" width="30" height="30" fill="currentcolor" /><rect x="240" y="90" width="30" height="30" fill="currentcolor" /><rect x="300" y="90" width="30" height="30" fill="currentcolor" /><rect x="330" y="90" width="30" height="30" fill="currentcolor" /><rect x="360" y="90" width="30" height="30" fill="currentcolor" /><rect x="210" y="120" width="30" height="30" fill="currentcolor" /><rect x="270" y="120" width="30" height="30" fill="currentcolor" /><rect x="330" y="120" width="30" height="30" fill="currentcolor" /><rect x="360" y="120" width="30" height="30" fill="currentcolor" /><rect x="390" y="120" width="30" height="30" fill="currentcolor" /><rect x="180" y="150" width="30" height="30" fill="currentcolor" /><rect x="300" y="150" width="30" height="30" fill="currentcolor" /><rect x="360" y="150" width="30" height="30" fill="currentcolor" /><rect x="150" y="180" width="30" height="30" fill="currentcolor" /><rect x="330" y="180" width="30" height="30" fill="currentcolor" /><rect x="120" y="210" width="30" height="30" fill="currentcolor" /><rect x="300" y="210" width="30" height="30" fill="currentcolor" /><rect x="90" y="240" width="30" height="30" fill="currentcolor" /><rect x="270" y="240" width="30" height="30" fill="currentcolor" /><rect x="60" y="270" width="30" height="30" fill="currentcolor" /><rect x="240" y="270" width="30" height="30" fill="currentcolor" /><rect x="30" y="300" width="30" height="30" fill="currentcolor" /><rect x="90" y="300" width="30" height="30" fill="currentcolor" /><rect x="210" y="300" width="30" height="30" fill="currentcolor" /><rect x="30" y="330" width="30" height="30" fill="currentcolor" /><rect x="120" y="330" width="30" height="30" fill="currentcolor" /><rect x="180" y="330" width="30" height="30" fill="currentcolor" /><rect x="30" y="360" width="30" height="30" fill="currentcolor" /><rect x="60" y="360" width="30" height="30" fill="currentcolor" /><rect x="150" y="360" width="30" height="30" fill="currentcolor" /><rect x="30" y="390" width="30" height="30" fill="currentcolor" /><rect x="60" y="390" width="30" height="30" fill="currentcolor" /><rect x="90" y="390" width="30" height="30" fill="currentcolor" /><rect x="120" y="390" width="30" height="30" fill="currentcolor" /></svg>
      </div>
      <div class="tool-item" @click="tool = 2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 450 450"><rect x="240" y="30" width="30" height="30" fill="currentcolor" /><rect x="210" y="60" width="30" height="30" fill="currentcolor" /><rect x="240" y="60" width="30" height="30" fill="currentcolor" /><rect x="270" y="60" width="30" height="30" fill="currentcolor" /><rect x="180" y="90" width="30" height="30" fill="currentcolor" /><rect x="270" y="90" width="30" height="30" fill="currentcolor" /><rect x="300" y="90" width="30" height="30" fill="currentcolor" /><rect x="150" y="120" width="30" height="30" fill="currentcolor" /><rect x="300" y="120" width="30" height="30" fill="currentcolor" /><rect x="330" y="120" width="30" height="30" fill="currentcolor" /><rect x="120" y="150" width="30" height="30" fill="currentcolor" /><rect x="330" y="150" width="30" height="30" fill="currentcolor" /><rect x="360" y="150" width="30" height="30" fill="currentcolor" /><rect x="90" y="180" width="30" height="30" fill="currentcolor" /><rect x="360" y="180" width="30" height="30" fill="currentcolor" /><rect x="390" y="180" width="30" height="30" fill="currentcolor" /><rect x="60" y="210" width="30" height="30" fill="currentcolor" /><rect x="120" y="210" width="30" height="30" fill="currentcolor" /><rect x="360" y="210" width="30" height="30" fill="currentcolor" /><rect x="390" y="210" width="30" height="30" fill="currentcolor" /><rect x="30" y="240" width="30" height="30" fill="currentcolor" /><rect x="150" y="240" width="30" height="30" fill="currentcolor" /><rect x="330" y="240" width="30" height="30" fill="currentcolor" /><rect x="360" y="240" width="30" height="30" fill="currentcolor" /><rect x="60" y="270" width="30" height="30" fill="currentcolor" /><rect x="180" y="270" width="30" height="30" fill="currentcolor" /><rect x="300" y="270" width="30" height="30" fill="currentcolor" /><rect x="330" y="270" width="30" height="30" fill="currentcolor" /><rect x="90" y="300" width="30" height="30" fill="currentcolor" /><rect x="210" y="300" width="30" height="30" fill="currentcolor" /><rect x="270" y="300" width="30" height="30" fill="currentcolor" /><rect x="300" y="300" width="30" height="30" fill="currentcolor" /><rect x="120" y="330" width="30" height="30" fill="currentcolor" /><rect x="240" y="330" width="30" height="30" fill="currentcolor" /><rect x="270" y="330" width="30" height="30" fill="currentcolor" /><rect x="150" y="360" width="30" height="30" fill="currentcolor" /><rect x="180" y="360" width="30" height="30" fill="currentcolor" /><rect x="210" y="360" width="30" height="30" fill="currentcolor" /><rect x="240" y="360" width="30" height="30" fill="currentcolor" /><rect x="90" y="390" width="30" height="30" fill="currentcolor" /><rect x="120" y="390" width="30" height="30" fill="currentcolor" /><rect x="150" y="390" width="30" height="30" fill="currentcolor" /><rect x="180" y="390" width="30" height="30" fill="currentcolor" /><rect x="210" y="390" width="30" height="30" fill="currentcolor" /><rect x="240" y="390" width="30" height="30" fill="currentcolor" /><rect x="270" y="390" width="30" height="30" fill="currentcolor" /><rect x="300" y="390" width="30" height="30" fill="currentcolor" /><rect x="330" y="390" width="30" height="30" fill="currentcolor" /></svg>
      </div>
      <div class="tool-item" @click="tool = 3">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 450 450"><rect x="360" y="30" width="30" height="30" fill="currentcolor" /><rect x="390" y="30" width="30" height="30" fill="currentcolor" /><rect x="360" y="60" width="30" height="30" fill="currentcolor" /><rect x="390" y="60" width="30" height="30" fill="currentcolor" /><rect x="330" y="90" width="30" height="30" fill="currentcolor" /><rect x="300" y="120" width="30" height="30" fill="currentcolor" /><rect x="270" y="150" width="30" height="30" fill="currentcolor" /><rect x="240" y="180" width="30" height="30" fill="currentcolor" /><rect x="210" y="210" width="30" height="30" fill="currentcolor" /><rect x="180" y="240" width="30" height="30" fill="currentcolor" /><rect x="150" y="270" width="30" height="30" fill="currentcolor" /><rect x="120" y="300" width="30" height="30" fill="currentcolor" /><rect x="90" y="330" width="30" height="30" fill="currentcolor" /><rect x="30" y="360" width="30" height="30" fill="currentcolor" /><rect x="60" y="360" width="30" height="30" fill="currentcolor" /><rect x="30" y="390" width="30" height="30" fill="currentcolor" /><rect x="60" y="390" width="30" height="30" fill="currentcolor" /></svg>
      </div>
      <div class="tool-item" @click="tool = 4">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 450 450"><rect x="30" y="30" width="30" height="30" fill="currentcolor" /><rect x="60" y="30" width="30" height="30" fill="currentcolor" /><rect x="90" y="30" width="30" height="30" fill="currentcolor" /><rect x="120" y="30" width="30" height="30" fill="currentcolor" /><rect x="150" y="30" width="30" height="30" fill="currentcolor" /><rect x="180" y="30" width="30" height="30" fill="currentcolor" /><rect x="210" y="30" width="30" height="30" fill="currentcolor" /><rect x="240" y="30" width="30" height="30" fill="currentcolor" /><rect x="270" y="30" width="30" height="30" fill="currentcolor" /><rect x="300" y="30" width="30" height="30" fill="currentcolor" /><rect x="330" y="30" width="30" height="30" fill="currentcolor" /><rect x="360" y="30" width="30" height="30" fill="currentcolor" /><rect x="390" y="30" width="30" height="30" fill="currentcolor" /><rect x="30" y="60" width="30" height="30" fill="currentcolor" /><rect x="390" y="60" width="30" height="30" fill="currentcolor" /><rect x="30" y="90" width="30" height="30" fill="currentcolor" /><rect x="390" y="90" width="30" height="30" fill="currentcolor" /><rect x="30" y="120" width="30" height="30" fill="currentcolor" /><rect x="390" y="120" width="30" height="30" fill="currentcolor" /><rect x="30" y="150" width="30" height="30" fill="currentcolor" /><rect x="390" y="150" width="30" height="30" fill="currentcolor" /><rect x="30" y="180" width="30" height="30" fill="currentcolor" /><rect x="390" y="180" width="30" height="30" fill="currentcolor" /><rect x="30" y="210" width="30" height="30" fill="currentcolor" /><rect x="390" y="210" width="30" height="30" fill="currentcolor" /><rect x="30" y="240" width="30" height="30" fill="currentcolor" /><rect x="390" y="240" width="30" height="30" fill="currentcolor" /><rect x="30" y="270" width="30" height="30" fill="currentcolor" /><rect x="390" y="270" width="30" height="30" fill="currentcolor" /><rect x="30" y="300" width="30" height="30" fill="currentcolor" /><rect x="390" y="300" width="30" height="30" fill="currentcolor" /><rect x="30" y="330" width="30" height="30" fill="currentcolor" /><rect x="390" y="330" width="30" height="30" fill="currentcolor" /><rect x="30" y="360" width="30" height="30" fill="currentcolor" /><rect x="390" y="360" width="30" height="30" fill="currentcolor" /><rect x="30" y="390" width="30" height="30" fill="currentcolor" /><rect x="60" y="390" width="30" height="30" fill="currentcolor" /><rect x="90" y="390" width="30" height="30" fill="currentcolor" /><rect x="120" y="390" width="30" height="30" fill="currentcolor" /><rect x="150" y="390" width="30" height="30" fill="currentcolor" /><rect x="180" y="390" width="30" height="30" fill="currentcolor" /><rect x="210" y="390" width="30" height="30" fill="currentcolor" /><rect x="240" y="390" width="30" height="30" fill="currentcolor" /><rect x="270" y="390" width="30" height="30" fill="currentcolor" /><rect x="300" y="390" width="30" height="30" fill="currentcolor" /><rect x="330" y="390" width="30" height="30" fill="currentcolor" /><rect x="360" y="390" width="30" height="30" fill="currentcolor" /><rect x="390" y="390" width="30" height="30" fill="currentcolor" /></svg>
      </div>
      <div class="tool-item" @click="tool = 5">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 450 450"><rect x="150" y="30" width="30" height="30" fill="currentcolor" /><rect x="180" y="30" width="30" height="30" fill="currentcolor" /><rect x="210" y="30" width="30" height="30" fill="currentcolor" /><rect x="240" y="30" width="30" height="30" fill="currentcolor" /><rect x="270" y="30" width="30" height="30" fill="currentcolor" /><rect x="90" y="60" width="30" height="30" fill="currentcolor" /><rect x="120" y="60" width="30" height="30" fill="currentcolor" /><rect x="300" y="60" width="30" height="30" fill="currentcolor" /><rect x="330" y="60" width="30" height="30" fill="currentcolor" /><rect x="60" y="90" width="30" height="30" fill="currentcolor" /><rect x="360" y="90" width="30" height="30" fill="currentcolor" /><rect x="60" y="120" width="30" height="30" fill="currentcolor" /><rect x="360" y="120" width="30" height="30" fill="currentcolor" /><rect x="30" y="150" width="30" height="30" fill="currentcolor" /><rect x="390" y="150" width="30" height="30" fill="currentcolor" /><rect x="30" y="180" width="30" height="30" fill="currentcolor" /><rect x="390" y="180" width="30" height="30" fill="currentcolor" /><rect x="30" y="210" width="30" height="30" fill="currentcolor" /><rect x="390" y="210" width="30" height="30" fill="currentcolor" /><rect x="30" y="240" width="30" height="30" fill="currentcolor" /><rect x="390" y="240" width="30" height="30" fill="currentcolor" /><rect x="30" y="270" width="30" height="30" fill="currentcolor" /><rect x="390" y="270" width="30" height="30" fill="currentcolor" /><rect x="60" y="300" width="30" height="30" fill="currentcolor" /><rect x="360" y="300" width="30" height="30" fill="currentcolor" /><rect x="60" y="330" width="30" height="30" fill="currentcolor" /><rect x="360" y="330" width="30" height="30" fill="currentcolor" /><rect x="90" y="360" width="30" height="30" fill="currentcolor" /><rect x="120" y="360" width="30" height="30" fill="currentcolor" /><rect x="300" y="360" width="30" height="30" fill="currentcolor" /><rect x="330" y="360" width="30" height="30" fill="currentcolor" /><rect x="150" y="390" width="30" height="30" fill="currentcolor" /><rect x="180" y="390" width="30" height="30" fill="currentcolor" /><rect x="210" y="390" width="30" height="30" fill="currentcolor" /><rect x="240" y="390" width="30" height="30" fill="currentcolor" /><rect x="270" y="390" width="30" height="30" fill="currentcolor" /></svg>
      </div>
      <div class="tool-item" @click="tool = 6">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 450 450"><rect x="240" y="30" width="30" height="30" fill="currentcolor" /><rect x="270" y="30" width="30" height="30" fill="currentcolor" /><rect x="300" y="30" width="30" height="30" fill="currentcolor" /><rect x="210" y="60" width="30" height="30" fill="currentcolor" /><rect x="330" y="60" width="30" height="30" fill="currentcolor" /><rect x="360" y="60" width="30" height="30" fill="currentcolor" /><rect x="390" y="60" width="30" height="30" fill="currentcolor" /><rect x="210" y="90" width="30" height="30" fill="currentcolor" /><rect x="240" y="90" width="30" height="30" fill="currentcolor" /><rect x="270" y="90" width="30" height="30" fill="currentcolor" /><rect x="300" y="90" width="30" height="30" fill="currentcolor" /><rect x="330" y="90" width="30" height="30" fill="currentcolor" /><rect x="360" y="90" width="30" height="30" fill="currentcolor" /><rect x="390" y="90" width="30" height="30" fill="currentcolor" /><rect x="120" y="120" width="30" height="30" fill="currentcolor" /><rect x="150" y="120" width="30" height="30" fill="currentcolor" /><rect x="180" y="120" width="30" height="30" fill="currentcolor" /><rect x="210" y="120" width="30" height="30" fill="currentcolor" /><rect x="360" y="120" width="30" height="30" fill="currentcolor" /><rect x="390" y="120" width="30" height="30" fill="currentcolor" /><rect x="90" y="150" width="30" height="30" fill="currentcolor" /><rect x="150" y="150" width="30" height="30" fill="currentcolor" /><rect x="360" y="150" width="30" height="30" fill="currentcolor" /><rect x="390" y="150" width="30" height="30" fill="currentcolor" /><rect x="90" y="180" width="30" height="30" fill="currentcolor" /><rect x="150" y="180" width="30" height="30" fill="currentcolor" /><rect x="360" y="180" width="30" height="30" fill="currentcolor" /><rect x="390" y="180" width="30" height="30" fill="currentcolor" /><rect x="60" y="210" width="30" height="30" fill="currentcolor" /><rect x="120" y="210" width="30" height="30" fill="currentcolor" /><rect x="180" y="210" width="30" height="30" fill="currentcolor" /><rect x="360" y="210" width="30" height="30" fill="currentcolor" /><rect x="390" y="210" width="30" height="30" fill="currentcolor" /><rect x="60" y="240" width="30" height="30" fill="currentcolor" /><rect x="120" y="240" width="30" height="30" fill="currentcolor" /><rect x="180" y="240" width="30" height="30" fill="currentcolor" /><rect x="360" y="240" width="30" height="30" fill="currentcolor" /><rect x="390" y="240" width="30" height="30" fill="currentcolor" /><rect x="30" y="270" width="30" height="30" fill="currentcolor" /><rect x="150" y="270" width="30" height="30" fill="currentcolor" /><rect x="210" y="270" width="30" height="30" fill="currentcolor" /><rect x="360" y="270" width="30" height="30" fill="currentcolor" /><rect x="390" y="270" width="30" height="30" fill="currentcolor" /><rect x="30" y="300" width="30" height="30" fill="currentcolor" /><rect x="150" y="300" width="30" height="30" fill="currentcolor" /><rect x="240" y="300" width="30" height="30" fill="currentcolor" /><rect x="360" y="300" width="30" height="30" fill="currentcolor" /><rect x="390" y="300" width="30" height="30" fill="currentcolor" /><rect x="30" y="330" width="30" height="30" fill="currentcolor" /><rect x="150" y="330" width="30" height="30" fill="currentcolor" /><rect x="240" y="330" width="30" height="30" fill="currentcolor" /><rect x="360" y="330" width="30" height="30" fill="currentcolor" /><rect x="390" y="330" width="30" height="30" fill="currentcolor" /><rect x="60" y="360" width="30" height="30" fill="currentcolor" /><rect x="90" y="360" width="30" height="30" fill="currentcolor" /><rect x="120" y="360" width="30" height="30" fill="currentcolor" /><rect x="270" y="360" width="30" height="30" fill="currentcolor" /><rect x="330" y="360" width="30" height="30" fill="currentcolor" /><rect x="360" y="360" width="30" height="30" fill="currentcolor" /><rect x="390" y="360" width="30" height="30" fill="currentcolor" /><rect x="270" y="390" width="30" height="30" fill="currentcolor" /><rect x="300" y="390" width="30" height="30" fill="currentcolor" /><rect x="330" y="390" width="30" height="30" fill="currentcolor" /></svg>
      </div>
      <div class="tool-item" @click="clearAll">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 450 450"><rect x="210" y="30" width="30" height="30" fill="currentcolor" /><rect x="180" y="60" width="30" height="30" fill="currentcolor" /><rect x="240" y="60" width="30" height="30" fill="currentcolor" /><rect x="30" y="90" width="30" height="30" fill="currentcolor" /><rect x="60" y="90" width="30" height="30" fill="currentcolor" /><rect x="90" y="90" width="30" height="30" fill="currentcolor" /><rect x="120" y="90" width="30" height="30" fill="currentcolor" /><rect x="150" y="90" width="30" height="30" fill="currentcolor" /><rect x="180" y="90" width="30" height="30" fill="currentcolor" /><rect x="210" y="90" width="30" height="30" fill="currentcolor" /><rect x="240" y="90" width="30" height="30" fill="currentcolor" /><rect x="270" y="90" width="30" height="30" fill="currentcolor" /><rect x="300" y="90" width="30" height="30" fill="currentcolor" /><rect x="330" y="90" width="30" height="30" fill="currentcolor" /><rect x="360" y="90" width="30" height="30" fill="currentcolor" /><rect x="390" y="90" width="30" height="30" fill="currentcolor" /><rect x="30" y="120" width="30" height="30" fill="currentcolor" /><rect x="390" y="120" width="30" height="30" fill="currentcolor" /><rect x="30" y="150" width="30" height="30" fill="currentcolor" /><rect x="60" y="150" width="30" height="30" fill="currentcolor" /><rect x="90" y="150" width="30" height="30" fill="currentcolor" /><rect x="120" y="150" width="30" height="30" fill="currentcolor" /><rect x="150" y="150" width="30" height="30" fill="currentcolor" /><rect x="180" y="150" width="30" height="30" fill="currentcolor" /><rect x="210" y="150" width="30" height="30" fill="currentcolor" /><rect x="240" y="150" width="30" height="30" fill="currentcolor" /><rect x="270" y="150" width="30" height="30" fill="currentcolor" /><rect x="300" y="150" width="30" height="30" fill="currentcolor" /><rect x="330" y="150" width="30" height="30" fill="currentcolor" /><rect x="360" y="150" width="30" height="30" fill="currentcolor" /><rect x="390" y="150" width="30" height="30" fill="currentcolor" /><rect x="60" y="180" width="30" height="30" fill="currentcolor" /><rect x="120" y="180" width="30" height="30" fill="currentcolor" /><rect x="180" y="180" width="30" height="30" fill="currentcolor" /><rect x="240" y="180" width="30" height="30" fill="currentcolor" /><rect x="300" y="180" width="30" height="30" fill="currentcolor" /><rect x="360" y="180" width="30" height="30" fill="currentcolor" /><rect x="60" y="210" width="30" height="30" fill="currentcolor" /><rect x="90" y="210" width="30" height="30" fill="currentcolor" /><rect x="150" y="210" width="30" height="30" fill="currentcolor" /><rect x="210" y="210" width="30" height="30" fill="currentcolor" /><rect x="270" y="210" width="30" height="30" fill="currentcolor" /><rect x="330" y="210" width="30" height="30" fill="currentcolor" /><rect x="360" y="210" width="30" height="30" fill="currentcolor" /><rect x="60" y="240" width="30" height="30" fill="currentcolor" /><rect x="120" y="240" width="30" height="30" fill="currentcolor" /><rect x="180" y="240" width="30" height="30" fill="currentcolor" /><rect x="240" y="240" width="30" height="30" fill="currentcolor" /><rect x="300" y="240" width="30" height="30" fill="currentcolor" /><rect x="360" y="240" width="30" height="30" fill="currentcolor" /><rect x="60" y="270" width="30" height="30" fill="currentcolor" /><rect x="120" y="270" width="30" height="30" fill="currentcolor" /><rect x="180" y="270" width="30" height="30" fill="currentcolor" /><rect x="240" y="270" width="30" height="30" fill="currentcolor" /><rect x="300" y="270" width="30" height="30" fill="currentcolor" /><rect x="360" y="270" width="30" height="30" fill="currentcolor" /><rect x="90" y="300" width="30" height="30" fill="currentcolor" /><rect x="120" y="300" width="30" height="30" fill="currentcolor" /><rect x="180" y="300" width="30" height="30" fill="currentcolor" /><rect x="240" y="300" width="30" height="30" fill="currentcolor" /><rect x="300" y="300" width="30" height="30" fill="currentcolor" /><rect x="330" y="300" width="30" height="30" fill="currentcolor" /><rect x="90" y="330" width="30" height="30" fill="currentcolor" /><rect x="150" y="330" width="30" height="30" fill="currentcolor" /><rect x="210" y="330" width="30" height="30" fill="currentcolor" /><rect x="270" y="330" width="30" height="30" fill="currentcolor" /><rect x="330" y="330" width="30" height="30" fill="currentcolor" /><rect x="90" y="360" width="30" height="30" fill="currentcolor" /><rect x="150" y="360" width="30" height="30" fill="currentcolor" /><rect x="210" y="360" width="30" height="30" fill="currentcolor" /><rect x="270" y="360" width="30" height="30" fill="currentcolor" /><rect x="330" y="360" width="30" height="30" fill="currentcolor" /><rect x="90" y="390" width="30" height="30" fill="currentcolor" /><rect x="120" y="390" width="30" height="30" fill="currentcolor" /><rect x="150" y="390" width="30" height="30" fill="currentcolor" /><rect x="180" y="390" width="30" height="30" fill="currentcolor" /><rect x="210" y="390" width="30" height="30" fill="currentcolor" /><rect x="240" y="390" width="30" height="30" fill="currentcolor" /><rect x="270" y="390" width="30" height="30" fill="currentcolor" /><rect x="300" y="390" width="30" height="30" fill="currentcolor" /><rect x="330" y="390" width="30" height="30" fill="currentcolor" /></svg>  
      </div>
      <!-- <div class="tool-item" @click="tool = 7">吸管</div> -->
      <div class="tool-item">
        <input type="color" v-model="currentColor">
      </div>
    </div>
    </div>
    <div class="right">
      <div class="drawing-area">
        <canvas class="canvas-grid" ref="canvas_grid" :width="width" :height="height"></canvas>
        <canvas :width="width" :height="height" ref="canvas"
                  @pointerdown="handlePointerDown"
                  @pointermove="handlePointerMove"
                  @pointerup="handlePointerUp"
                  @pointerleave="handlePointerLeave"
                  ></canvas>
      </div>
    </div>
    
  </div>
</template>

<script>

export default {
  computed: {
    width() {
      return this.cols*this.gridSize;
    },
    height() {
      return this.rows*this.gridSize;;
    },
  },
  data() {
    return {
      tool:1,
      rows:15,
      cols:15,
      gridSize:30,
      currentColor:'#000',
      colorIndex:0,
      isDrawing: false,
      pixels: [],
      endPoints:{x:0,y:0},
      ctx:null,
      historys:[],
      log:"",
      shiftdown:false,
      dropDownBoxShow:{
        sizeSettingShow:false,
        downloadShow:false
      },
      penSize:1,
    };
  },
  mounted() {
    this.init()
    this.drawGrid()
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('keyup', this.handleKeyUp);
  },
  methods: {
    dropDown(keyname){
      const keys = Object.keys(this.dropDownBoxShow)
      if(this.dropDownBoxShow[keyname]){
        keys.forEach(key => {
          this.dropDownBoxShow[key] = false
        })
      }else{
        keys.forEach(key => {
          this.dropDownBoxShow[key] = false
        })
        this.dropDownBoxShow[keyname] = true
      }
      console.log(this.dropDownBoxShow)
    },
    drawGrid() {
      const that = this
      this.$nextTick(()=>{
        const canvas = that.$refs.canvas_grid
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, that.width, that.height);
        if(true){
          for (let i = 0; i < that.rows; i++){
            for (let j = 0; j < that.cols; j++){
              ctx.fillStyle = (i+j)%2 ? "#fff" : '#d9d9d9'
              ctx.fillRect(j * that.gridSize, i * that.gridSize,that.gridSize,that.gridSize)
            }
          }
        }else{
          ctx.strokeStyle = '#d9d9d9';
          for (let i = 0; i <= that.rows; i++) {
            ctx.beginPath();
            ctx.moveTo(0, i * that.gridSize);
            ctx.lineTo(that.width, i * that.gridSize);
            ctx.stroke();
          }
          for (let i = 0; i <= that.cols; i++) {
            ctx.beginPath();
            ctx.moveTo(i * that.gridSize, 0);
            ctx.lineTo(i * that.gridSize, that.height);
            ctx.stroke();
          }
        }
      })
      
    },
    switchColor(point){
      const color = this.getColorAtPixel(point)
      const currentColor = 'rgba('+color.r+','+color.g+','+color.b+','+color.a+')'
      if(currentColor != 'rgba(0,0,0,0)'){
        this.currentColor = currentColor
      }
      console.log(this.currentColor)
    },
    handleKeyDown(event) {
      if (event.key === 'Shift') {
        this.shiftdown = true;
      }
    },
    handleKeyUp(event) {
      if (event.key === 'Shift') {
        this.shiftdown = false;
      }
    },
    init(){
      if (window.PointerEvent) { 
        // Pointer events are supported. 
        this.log="Pointer events are supported."
      }
      const canvas = this.$refs.canvas;
      this.ctx = canvas.getContext('2d');
      this.addHistoy()
    },
    handlePointerDown(event){
      this.isDrawing = true
      this.endPoints = this.getPoint({x:event.clientX,y:event.clientY})
      if(this.tool == 1) this.drawPixel(this.endPoints)
      else if(this.tool == 2) this.clearPixel(this.endPoints)
      else if(this.tool == 6){
        this.ctx.fillStyle = this.currentColor
        this.fillArea(this.endPoints);
        this.addHistoy()
      }else if(this.tool == 7){
        this.switchColor(this.endPoints)
      }
      
    },
    handlePointerMove(event){
      this.ctx.fillStyle = this.currentColor
      this.ctx.strokeStyle = this.currentColor
      const currPoint = this.getPoint({x:event.clientX,y:event.clientY})
      if(this.isDrawing){
        if(this.tool == 1){
          this.drawLine(this.endPoints, currPoint)
          this.endPoints = currPoint
        }else if(this.tool == 2){
          this.clearPixel(currPoint)
        }else if(this.tool == 3){
          this.showLastHistory()
          this.drawLine(this.endPoints, currPoint)
        }else if(this.tool == 4){
          this.showLastHistory()
          this.drawRect(this.endPoints, currPoint)
        }else if(this.tool == 5){
          this.showLastHistory()
          this.drawPixelEllipse(this.endPoints, currPoint)
        }
      }else{
        if(this.tool != 6 && this.tool != 7){
          this.showLastHistory()
          this.ctx.fillStyle = 'rgba(0,0,0,0.3)'
          this.drawPixel(currPoint)
        }
      }
    },
    handlePointerUp(){
      if(this.isDrawing){
        this.isDrawing = false
        this.addHistoy()
      }
      
    },
    handlePointerLeave(){
      if(this.isDrawing == false)
        this.showLastHistory()
    },
    drawPixel(point){
      const size = this.penSize
      const x = point.x/this.gridSize - Math.floor(size/2)
      const y = point.y/this.gridSize - Math.floor(size/2)

      this.ctx.fillRect(this.gridSize*x,this.gridSize*y,this.gridSize*size,this.gridSize*size)
    },
    clearPixel(point){
      this.ctx.clearRect(point.x,point.y,this.gridSize,this.gridSize)
    },
    // 直线BH算法https://blog.csdn.net/myf_666/article/details/128164135
    drawLine(start,end){
      let x = start.x
      let y = start.y
      let dx = Math.abs(end.x - start.x)
      let dy = Math.abs(end.y - start.y)
      let sx = (start.x < end.x)? this.gridSize : -this.gridSize
      let sy = (start.y < end.y)? this.gridSize : -this.gridSize
      let err = dx - dy
      while(true){
        this.drawPixel({x,y})
        if(x === end.x && y === end.y) break
        let e2 = 2 * err;
        if(e2 > -dy){
          err -= dy;
          x += sx;
        }
        if(e2 < dx){
          err += dx;
          y += sy
        }
      }
    },
    drawRect(start,end){
      let rightUp, leftDown;

      if (this.shiftdown) {
        // 计算水平和垂直距离
        const deltaX = end.x - start.x;
        const deltaY = end.y - start.y;

        // 选择较小的距离作为正方形的边长
        const sideLength = Math.min(Math.abs(deltaX), Math.abs(deltaY));

        // 根据方向调整 end 点的位置
        if (deltaX > 0 && deltaY > 0) {
          end = { x: start.x + sideLength, y: start.y + sideLength };
        } else if (deltaX > 0 && deltaY < 0) {
          end = { x: start.x + sideLength, y: start.y - sideLength };
        } else if (deltaX < 0 && deltaY > 0) {
          end = { x: start.x - sideLength, y: start.y + sideLength };
        } else {
          end = { x: start.x - sideLength, y: start.y - sideLength };
        }
      }

      rightUp = { x: end.x, y: start.y };
      leftDown = { x: start.x, y: end.y };

      this.drawLine(start, rightUp);
      this.drawLine(leftDown, end);
      this.drawLine(start, leftDown);
      this.drawLine(rightUp, end);
      
    },
    //椭圆BH算法https://www.cnblogs.com/fortunely/p/17681502.html
     drawPixelEllipse(start, end) {
      const xc = (start.x + end.x) / 2 / this.gridSize + 0.5
      const rx = Math.abs((end.x - start.x) / this.gridSize / 2);
      const drx = end.y>start.y ? rx : -rx
      const yc = this.shiftdown ? start.y/this.gridSize + drx + 0.5 : (start.y + end.y) / 2 / this.gridSize + 0.5
      const ry = this.shiftdown ? rx : Math.abs((end.y - start.y) / this.gridSize / 2);

      // this.drawPixel({x:(xc-0.5)*this.gridSize,y:(yc-0.5)*this.gridSize}) 显示圆心

      this.log = "xc:"+xc+",yc:"+yc+",rx:"+rx +",ry:"+ry

      let x = rx%1 ? 0.5 : 0;
      let y = ry;
      let d1 = Math.ceil(ry * ry - rx * rx * ry + 0.25 * rx * rx);
      let dx = 2 * ry * ry * x;
      let dy = 2 * rx * rx * y;
      this.drawEllipsePoints(xc, yc, x, y)

      while (dx < dy) {
        x++
        dx += 2 * ry * ry;
        if (d1 <= 0) {
          d1 += dx + ry * ry;
        } else {
          y--;
          dy -= 2 * rx * rx;
          d1 += dx - dy + ry * ry;
        }
        
        this.drawEllipsePoints(xc, yc, x, y)
      }

      let d2 = Math.ceil(ry * ry * (x + 0.5) * (x + 0.5) + rx * rx * (y - 1) * (y - 1) - rx * rx * ry * ry);
      while (y > 0) {
        y--
        dy -= 2 * rx * rx
        if (d2 <= 0) {
          x++
          dx += 2 *ry*ry
          d2 += ry*ry - dy + dx
          
        } else {
          d2 += rx * rx - dy
        }
        this.drawEllipsePoints(xc, yc, x, y)
      }
    },
    drawEllipsePoints(xc, yc, x, y) {
      xc -= 0.5
      yc -= 0.5
      this.drawPixel({ x: (xc + x) * this.gridSize, y: (yc - y) * this.gridSize });
      this.drawPixel({ x: (xc - x) * this.gridSize, y: (yc - y) * this.gridSize });
      this.drawPixel({ x: (xc - x) * this.gridSize, y: (yc + y) * this.gridSize });
      this.drawPixel({ x: (xc + x) * this.gridSize, y: (yc + y) * this.gridSize });
    },
    // 在你的像素画板中实现一个填充功能（类似于“油漆桶”工具），你需要用到一种称为“洪水填充”（Flood Fill）算法。这个算法将会递归地或使用队列填充相同颜色的相邻像素。为了避免递归深度过深导致栈溢出，我们可以使用队列来实现非递归的广度优先搜索（BFS）填充算法。
    fillArea(startPoint) {
      const targetColor = this.getColorAtPixel(startPoint);
      const fillColor = this.hexToArgb(this.ctx.fillStyle);

      if (this.colorsMatch(targetColor, fillColor)) {
        return; // 避免填充相同颜色的区域
      }

      const stack = [startPoint];
      const { width, height } = this.$refs.canvas;
      const visited = new Set();

      const key = (x, y) => `${x},${y}`;
      
      while (stack.length) {
        const { x, y } = stack.pop();
        const currentColor = this.getColorAtPixel({ x, y });

        if (!visited.has(key(x, y)) && this.colorsMatch(currentColor, targetColor)) {
          this.drawPixel({ x, y });
          visited.add(key(x, y));

          if (x > 0) stack.push({ x: x - this.gridSize, y });
          if (x < width - this.gridSize) stack.push({ x: x + this.gridSize, y });
          if (y > 0) stack.push({ x, y: y - this.gridSize });
          if (y < height - this.gridSize) stack.push({ x, y: y + this.gridSize });

        }
      }
    },
    getColorAtPixel(point) {
      const { data } = this.ctx.getImageData(point.x, point.y, 1, 1);
      return data.slice(0, 4);
    },
    hexToArgb(hex) {
      if (hex[0] === '#') hex = hex.slice(1);
      const bigint = parseInt(hex, 16);
      if (hex.length === 8) {
        return [(bigint >> 24) & 255, (bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
      } else if (hex.length === 6) {
        return [255, (bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
      } else if (hex.length === 4) {
        return [(bigint >> 12) & 15 * 17, (bigint >> 8) & 15 * 17, (bigint >> 4) & 15 * 17, bigint & 15 * 17];
      } else if (hex.length === 3) {
        return [255, (bigint >> 8) & 15 * 17, (bigint >> 4) & 15 * 17, bigint & 15 * 17];
      }
      return [0, 0, 0, 0]; // 默认返回透明黑色
    },
    colorsMatch(color1, color2) {
      return color1[0] === color2[0] && color1[1] === color2[1] && color1[2] === color2[2] && color1[3] === color2[3];
    },



    clearAll(){
      this.ctx.clearRect(0,0,this.width,this.height)
      this.addHistoy()
    },
    getPoint(point){
      const rect = this.$refs.canvas.getBoundingClientRect();
      const x = Math.floor((point.x - rect.left) / this.gridSize)*this.gridSize
      const y = Math.floor((point.y - rect.top) / this.gridSize)*this.gridSize
      return {x,y}
    },
    showLastHistory() {
      const history = this.historys
      this.ctx.putImageData(history[history.length - 1]['data'], 0, 0)
    },
    addHistoy() {
      this.historys.push({
        data: this.ctx.getImageData(0, 0, this.width, this.height)
      })
    },
    undo(){
      var history = this.historys;
      
      if(history && history.length > 1){
        history.pop();
        this.showLastHistory();
      }
    },
    mergeAdjacentRects(rects) {

    },
    getSvgContent(filled=false){
      const width = this.width;
      const height = this.height;
      const imageData = this.ctx.getImageData(0, 0, width, height)

      //解析像素数据，gpt生成代码
      const pixels = imageData.data;

      let pixelData = [];
      for (let y = 0; y < height; y+=this.gridSize) {
        for (let x = 0; x < width; x+=this.gridSize) {
          const index = (y * width + x) * 4;
          const r = pixels[index];
          const g = pixels[index + 1];
          const b = pixels[index + 2];
          const a = pixels[index + 3];

          // 只保存非透明像素
          if (a > 0) {
            pixelData.push({ x, y, r, g, b, a });
          }
        } 
      }
      if(filled == true){
        //生成svg文件,gpt生成代码
        let svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}">`;
        
        pixelData.forEach(pixel => {
          svgContent += `<rect x="${pixel.x}" y="${pixel.y}" width="${this.gridSize}" height="${this.gridSize}" fill="rgba(${pixel.r},${pixel.g},${pixel.b},${pixel.a})" />`;
        });

        svgContent += '</svg>';
        return svgContent
      }else{
        let pathSet = new Set()
        const key = (x1, y1, x2, y2) => `${x1},${y1},${x2},${y2}`;
        pixelData.forEach(pixel => {
          let rectPaths = [
            //上右下左
            key(pixel.x , pixel.y , pixel.x + this.gridSize , pixel.y),
            key(pixel.x + this.gridSize , pixel.y,pixel.x + this.gridSize , pixel.y + this.gridSize),
            key(pixel.x , pixel.y + this.gridSize,pixel.x + this.gridSize , pixel.y + this.gridSize),
            key(pixel.x , pixel.y,pixel.x , pixel.y + this.gridSize)
          ]
          rectPaths.forEach(path => {
            if(pathSet.has(path)){
              pathSet.delete(path)
            }else{
              pathSet.add(path)
            }
          })
        });
        console.log(pathSet)
      }
      
    },
    copySvgCode(){
      this.copyToClipboard(this.getSvgContent())
    },
    saveAsSvg(){
      const svgContent = this.getSvgContent()
      //保存svg文件
      const blob = new Blob([svgContent], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      this.saveImage(url)
    },
    saveImage(url){
      const link = document.createElement('a');
      link.href = url;
      link.download = 'drawing.svg';
      link.click();

      URL.revokeObjectURL(url);
    },
    async copyToClipboard(content) {
      try {
        await navigator.clipboard.writeText(content);
        this.$toast.show('复制成功','success')
      } catch (err) {
        this.$toast.show(err,'error')
      }
    }
  },
};
</script>

<style>
.drawing-area {
  border: 0.5px solid #d9d9d9;
  position: absolute;
  width: fit-content;
  font-size: 0;
/*  margin: 0 auto;*/
  height: fit-content;
    left: 50%;
  transform: translateX(-50%);

}
canvas {
  position: relative;
  z-index: 1;
  touch-action: none;
}
.canvas-grid {
  position: absolute;
  top: 0;
  left: 0;
}
.tools-bar {
  display: flex;
  flex-wrap: wrap;
  width: 80px;
  height: fit-content;
  
}
.tool-item{
  width: 30px;
  height: 30px;
  display: flex;
  padding: 5px
}
.tool-item:hover{
  background-color: var(--box-hightlight);
}
.tool-item img{
  width: 30px;
  height: 30px;
}

.tool-setting-bar {
  height: 30px;
  border-bottom: var(--box-border);
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  align-items: center;
}
.tool-setting-bar > div{
  display: flex;
  height: 100%
}
.work-area{
  display: flex;
  width: 100%;
  overflow: hidden;
  height: calc(100vh - 91px);
}

.work-area .right{
  flex: 1;
  position: relative;
  overflow: auto;
  border-left: var(--box-border)
}

.work-area > div{
  padding: 5px;
}

.icon-item-box{
  position: relative;
}


.icon-item {
  padding:2px;
  width:26px;
  height: 26px;
}

.icon-item:hover {
  background-color: var(--box-hightlight);
}

.size-setting {
  position: absolute;
  background-color: var(--box-bgc);
  border: var(--box-border);
  right: 0;
  top: 30px;
  border-radius: 8px;
  padding: 8px;
  z-index: 999;
  opacity: 0;
  transform: translateY(15%);
  transition: opacity 0.5s ease,transform 0.5s ease;
  pointer-events: none;

}

.size-setting.show{
  pointer-events: all;
  opacity: 1;
  transform: translateY(0)
}

.size-setting .size{
  display: flex;
  width: 140px;
  align-items: center;
}

.size-setting .size > input {
  width: 40px;
}

.tool-option {
  height: 100%;
  display: flex;
  align-items: center;
}

.tool-option .label{
  font-size: 15px;
  line-height: 15px;
}

.tool-option input[type='range']{
  width: 90px;
  height: 15px;
}

.drop-down-option{
  width: 120px;
  padding: 5px;
  cursor: pointer;
}

.drop-down-option:hover{
  background-color: var(--card-hightlight)
}


</style>
