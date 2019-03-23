<template>
  <div class="userinfoContent">
    <div class="content">
      <div class="left-box">
        <section>
            <span class="user-name">pirate</span>
            <span class="user-id">ID{{userId}}</span>
        </section>
        <ul>
          <li class="li-style" v-for="(item,index) of liList" :key="index" 
          :class="liAtiveIndex == index ? 'li-active' : ''" @click="cut(index)">{{item}}</li>
        </ul>
      </div>
      <div class="right-box">
        <div class="head">
          {{liList[liAtiveIndex]}}
        </div>
        <div class="right-content" style="padding: 10px 20px;">
          <div v-if="liAtiveIndex == 0" class="">
            <el-row :gutter="20">
              <el-col class="" :span="6">
                <el-card shadow="hover">
                  <img width="width:100%" src="http://mhfm1tel.cdndm5.com/5/4246/20150430154829_180x240_23.jpg" class="image">
                  <div class="card-title">
                    <p class="work-name">某科学的超电磁炮</p>
                    <p class="readTo">读至：<span class="episode">第112话 洞察</span></p>
                  </div>
                </el-card>
              </el-col>
            </el-row> 
          </div>
          <div v-if="liAtiveIndex == 1" class="">
            <el-row :gutter="20">
              <el-col class="" :span="6">
                <el-card shadow="hover">
                  <img width="width:100%" src="http://mhfm1tel.cdndm5.com/5/4246/20150430154829_180x240_23.jpg" class="image">
                  <div class="card-title">
                    <p class="work-name">某科学的超电磁炮</p>
                    <p class="readTo">读至：<span class="episode">第112话 洞察</span></p>
                  </div>
                </el-card>
              </el-col>
            </el-row> 
          </div>
          <div v-if="liAtiveIndex == 2" class="">
            <section class="comment-box" v-for="(item,index) of commentListData" :key="index">
              <p class="comment">在<span class="comment-name">{{item.production}}</span>评论<span class="comment-content">{{item.content}}</span></p>
              <span class="comment-time">{{item.time}}</span>
            </section>
            <el-pagination
              background
              layout="prev, pager, next"
              @current-change="pageChange"
              :total="1000">
            </el-pagination>
          </div>
          <div v-if="liAtiveIndex == 3" class="">
            <div v-if="isEmails" style="padding-top:150px;text-align:center;">
              <el-input style="width:220px;" v-model="email" placeholder="请输入邮箱"></el-input>
              <el-button type="primary">发送</el-button>
            </div>
            <div class="email-style" v-else>
              <i style="color:#409EFF" class="el-icon-success"></i> 账号已绑定邮箱
            </div>
          </div>
          <div v-if="liAtiveIndex == 4" class="">
            <el-upload
              class="avatar-uploader"
              action=""
              :http-request="fnUploadRequest"
              :show-file-list="false"
              :on-success="handleVideoSuccess"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-progress="uploadVideoProcess"
              :before-upload="beforeAvatarUpload">
              <el-progress v-if="videoFlag" type="circle" 
              :percentage="videoUploadPercent" style="background: #ffffff;margin-top:30px;position:absolute;left:28px"></el-progress>
              <img v-if="avatarUrl&&progressOver" :src="avatarUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import{ uploadAvatar } from '@/models/userFnc.js'

import oss  from '@/models/aliOSS.js'
export default {

  components: {},
  data() {
    return {
      fileList2: [],
      liList: ['我的收藏','浏览历史','我的评论','绑定邮箱','更换头像'],
      liAtiveIndex: 0,
      email: '',
      avatarUrl: '',
      userId: JSON.parse(localStorage.userInfo).userId,
      videoFlag: false,
      progressOver: false,
      videoUploadPercent: 0,
      isEmails: '',
      commentListData: [
        {
          production: '某科学的超电磁炮',
          content: '真是太好看了',
          time: '2019-5-25'
        },        {
          production: '某科学的超电磁炮',
          content: '真是太好看了',
          time: '2019-5-25'
        },        {
          production: '某科学的超电磁炮',
          content: '真是太好看了',
          time: '2019-5-25'
        },        {
          production: '某科学的超电磁炮',
          content: '真是太好看了',
          time: '2019-5-25'
        },        {
          production: '某科学的超电磁炮',
          content: '真是太好看了',
          time: '2019-5-25'
        },        {
          production: '某科学的超电磁炮',
          content: '真是太好看了',
          time: '2019-5-25'
        },        {
          production: '某科学的超电磁炮',
          content: '真是太好看了',
          time: '2019-5-25'
        },        {
          production: '某科学的超电磁炮',
          content: '真是太好看了',
          time: '2019-5-25'
        },        {
          production: '某科学的超电磁炮',
          content: '真是太好看了',
          time: '2019-5-25'
        },        {
          production: '某科学的超电磁炮',
          content: '真是太好看了',
          time: '2019-5-25'
        },        {
          production: '某科学的超电磁炮',
          content: '真是太好看了',
          time: '2019-5-25'
        },
      ]
    };
  },
  watch: {

  },
  mounted(){
    
  },
  created(){
    let routerInfo = this.$router.currentRoute
    if(routerInfo.fullPath == "/userinfo/avatar"){
      this.liAtiveIndex = 4
    }else{
      this.liAtiveIndex = 0
    }
  },
  methods:{
    // 切换
    cut(index){
      this.liAtiveIndex = index
      if(index == 4)
        this.$router.push({
          path: '/userinfo/avatar',
          params:{
            user: '123'
          }
        })
    },
    handleRemove(file, fileList) {
        
    },
    handlePreview(file) {
      
    },
    async fnUploadRequest (option) {
      let res = await oss.ossUploadFile(option,'avatar','sanhui-cartoon')
      return res
    },
      // 图片上传成功后
    handleVideoSuccess (res, file, fileList) {
      if(!res.res)return;
      this.videoUploadPercent = 100
      this.avatarUrl = `http://sanhui-cartoon.oss-cn-hongkong.aliyuncs.com/${res.name}`
      uploadAvatar({
        userId: this.userId,
        avatar: this.avatarUrl
      }).then(res => {
        if(res.code != 200){
          this.$message.error(res.message);
          return
        }
        this.$message({
          message: '更换头像成功',
          type: 'success'
        });
        setTimeout(()=>{
          this.progressOver = true;
          this.videoFlag = false;
          
          this.$store.dispatch("initUserInfo",this.avatarUrl);
        },500)
      })
    },
    // 文件校验
    beforeAvatarUpload () {
      this.progressOver = false
    },
    uploadVideoProcess(event, file, fileList){
        this.videoFlag = true;
        this.videoUploadPercent = Number(file.percentage.toFixed(0));
    },
    // 评论页面改变时
    pageChange (e,event) {
      
    }
  }
}
</script>

<style lang="scss">
html,body{
  height: 100%;
  background-color: #F8F8F8;
}
.userinfoContent{
  padding-top: 20px;
  background-color: #F8F8F8;
  width: 100%;

  .content{
    width: 1200px;
    height: 500px;
    margin: 0 auto;

    >div{
      border-radius: 5px;
      display: inline-block;
      background-color: #ffffff;
    }
    .left-box{
      width: 280px;
      height: 500px;
      border: 1px solid #E8E8E8;

      >section{
        padding: 10px 20px;
        border-bottom: 4px solid #F5F5F5;

        .user-name{
          color: #555;
          font-size: 20px;
        }
        .user-id{
          color: #999;
          font-size: 15px;
        }
      }
      ul{
        padding: 0;
        list-style: none;
        margin: 0;

        .li-style{
          height: 45px;
          border-bottom: 2px solid #F5F5F5;
          padding-left: 20px;
          line-height: 45px;
          cursor: pointer;
        }
        .li-style:hover{
          background-color: #E1E4EA;
        }
        .li-active{
          background-color: #409EFF!important;
          color: #ffffff;
        }
      }
    }
    .right-box{
      width: 900px;
      min-height: 500px;
      float: right;

      .head{
        height: 26px;
        padding: 10px 20px;
        border-bottom: 4px solid #F5F5F5;
        color: #00a1d6;
      }
      .right-content{

        .el-col{
          margin-bottom: 5px;
        }
        .el-card{
          padding: 10px;
        }
        .el-card__body{
          padding: 0;

          img{
            border-radius: 5px;
            width: 100%;
            cursor: pointer;
          }
          .card-title{
            text-align: center;
            .work-name{
              color: #252525;
              font-weight: bold;
              width: 180px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              cursor: pointer;
              font-size: 18px;
            }
            .work-name:hover{
              text-decoration:underline;
            }
            .readTo{
              color: #252525;
              font-size: 12px;
              margin-top: 5px;
              color: #606266;
              // float: left;
              .episode{
                color: #F56C6C;
                cursor: pointer;
              }
            }
          }
        }
        .comment-box{
          border-bottom: 1px dashed #DCDFE6;
          position: relative;
          .comment{
            padding: 8px;
            font-size: 14px;
            width: 770px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            span{
              margin: 0 5px;
              color: #409EFF;
              cursor: pointer;
            }
          }
          .comment-time{
            position: absolute;
            right: 5px;top: 7px;
            font-size: 14px;
            color: #909399;
          }
        }
        .el-pagination{
          text-align: right;
          margin-top: 10px;
        }
        .email-style{
          font-weight: bold;
          font-size: 20px;
          margin-top: 150px;
          text-align: center;
        }
        .avatar-uploader{
          position: relative;
          text-align: center;
          margin-top: 100px;
          left: 27px;
        }
        .avatar-uploader .el-upload {
          border: 1px dashed #d9d9d9;
          border-radius: 6px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }
        .avatar-uploader .el-upload:hover {
          border-color: #409EFF;
        }
        .avatar-uploader-icon {
          font-size: 28px;
          color: #8c939d;
          width: 178px;
          height: 178px;
          line-height: 178px;
          text-align: center;
        }
        .avatar {
          width: 178px;
          height: 178px;
          display: block;
        }
      }
    }
  }
}
</style>
