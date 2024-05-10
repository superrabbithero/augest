<template>
  <div class="sheetview">
    <div>
      <div @click="clickuploadgif">点击上传gif动图</div>
      <input type="file" ref="fileInput" @change="handleFileChange" accept="image/gif" style="display: none;"/>
    </div>
    <div v-show="uploadedFile">
      <img :src="imageUrl" alt="Uploaded GIF" />
    </div>
  </div>
</template>

<script>

import { ref } from 'vue';

export default {
  setup(){
    const uploadedFile = ref(null)
    const fileInput = ref(null)
    const imageUrl = ref(null)


    // 处理文件选择
    function handleFileChange(event) {
      uploadedFile.value = event.target.files[0];
      imageUrl.value = URL.createObjectURL(uploadedFile.value)
    }

    function clickuploadgif(){
      fileInput.value.click();
    }

    return  {
      fileInput,
      uploadedFile,
      clickuploadgif,
      handleFileChange,
      imageUrl
    }
  }


}
</script>
