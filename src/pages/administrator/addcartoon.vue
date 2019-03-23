<template>
  <div class="add-page">
    
    <p class="presentation">请输入漫画英文名或者编号</p>
    <el-input v-model="code"></el-input>
    <p class="presentation">请输入是第多少话</p>
    <el-input v-model="season"></el-input>
    <p class="presentation">可以拖拽拖拽上传</p>
    <el-upload
      class="avatar-uploader"
      action
      drag
      multiple
      :http-request="fnUploadRequest"
      :show-file-list="true"
      :on-success="handleVideoSuccess"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-progress="uploadVideoProcess"
      :before-upload="beforeAvatarUpload"
      list-type="picture-card"
      :file-list="fileList2"
      :on-change="handleChange"
    >
      <i v-if="!videoFlag" class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>
<script>
import { getComicInfo, UploadComic } from "@/models/cartoon.js";
import oss from "@/models/aliOSS.js";
export default {
  components: {},
  data() {
    return {
      comicInfo: {},
      videoFlag: false,
      progressOver: false,
      videoUploadPercent: 0,
      fileList2: [],
      code: "",
      season: ""
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    handleRemove(file, fileList) {},
    handlePreview(file) {},
    async fnUploadRequest(option) {
      let res = await oss.ossUploadFile(
        option,
        this.code,
        "sanhui-cartoon",
        this.season
      );
      return res;
    },
    // 图片上传成功后
    async handleVideoSuccess(res, file, fileList) {
      if (!res.res) return;
      this.videoUploadPercent = 100;
      let url = "";
      if (res.res.requestUrls[0].indexOf("?") < 0) url = res.res.requestUrls[0];
      else
        url = res.res.requestUrls[0].substr(
          0,
          res.res.requestUrls[0].indexOf("?")
        );
      await this.saveUrl(url);
      setTimeout(() => {
        this.videoFlag = false;
        this.videoUploadPercent = 0;
      }, 1000);
    },
    handleChange(file, fileList) {
      this.fileList2 = fileList;
    },
    // 文件校验
    beforeAvatarUpload(file) {
      this.progressOver = false;
    },
    uploadVideoProcess(event, file, fileList) {
      this.videoFlag = true;
      this.videoUploadPercent = Number(file.percentage.toFixed(0));
    },
    // 保存图片url
    saveUrl(url) {
      UploadComic({
        url: url,
        code: this.code,
        season: this.season
      })
        .then(res => {
          if (!res) return;
          if (res.code != 200) {
            this.$message.error(res.mesage);
          }
        })
        .catch();
    }
  }
};
</script>

<style lang="scss">
.add-page {
  padding: 50px;
}
.presentation {
  color: #303133;
  font-size: 16px;
  margin: 30px 0;
}
.el-upload-dragger {
  height: 146px;
  width: 146px;
}
</style>
