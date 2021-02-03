<template>
  <div>
    <input type="file" @change="handleFileChange" />
    <el-button @click="handleUpload">上传</el-button>
  </div>
</template>

<script>
const LENGTH = 10; //切片数量

import { reactive } from "vue";
import { request } from "../utils/request";
export default {
  setup() {
    const container = reactive({
      file: null,
      data: [],
    });
    let chunkList = [];
    const handleFileChange = (event) => {
      const [file] = event.target.files;
      if (!file) return;
      container.file = file;
    };
    const handleUpload = async () => {
      if (!container.file) return;
      const fileChunkList = createFileChunk(container.file, 200);
      container.data = fileChunkList.map(({ file }, index) => ({
        chunk: file,
        hash: `${container.file.name}-${index}`,
      }));
      await uploadChunks();
      await mergeRequest();
    };

    // 得到文件切片列表
    const createFileChunk = (file, length = LENGTH) => {
      const fileChunkList = []; //文件切片
      const chunkSize = Math.ceil(file.size / length); //每个切片的大小
      let cur = 0;
      while (cur < file.size) {
        fileChunkList.push({ file: file.slice(cur, cur + chunkSize) });
        cur += chunkSize;
      }
      return fileChunkList;
    };

    //上传切片
    const uploadChunks = async () => {
      const requestList = container.data
        .map(({ chunk, hash }) => {
          const formData = new FormData();
          formData.append("chunk", chunk);
          formData.append("hash", hash);
          formData.append("filename", container.file.name);
          return { formData };
        })
        .map(async ({ formData }) =>
          request({
            url: "http://localhost:3000",
            data: formData,
          })
        );
      await Promise.all(requestList);
    };

    const mergeRequest = async () => {
      await request({
        url: "http://localhost:3000/merge",
        headers: {
          "content-type": "application/json",
        },
        data: JSON.stringify({
          filename: container.file.name,
        }),
      });
    };

    return {
      handleFileChange,
      handleUpload,
      container,
      createFileChunk,
      chunkList,
      uploadChunks,
      mergeRequest,
    };
  },
};
</script>

<style>
</style>