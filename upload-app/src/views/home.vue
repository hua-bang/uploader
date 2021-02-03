<template>
  <div>
    <input type="file" @change="handleFileChange" />
    <el-button @click="handleUpload">上传</el-button>
  </div>
</template>

<script>
// import { ref } from "vue";
export default {
  setup() {
    const handleFileChange = () => {
      console.log("handleFileChange");
    };
    const handleUpload = () => {
      console.log("handleUpload");
    };
    return {
      handleFileChange,
      handleUpload,
    };
  },
};
</script>

<style>
</style>