<template>
  <div class="detailBox">
    <div class="detailsContent">
      <div class="leftDetails">
        <img :src="comicInfo.comicAvatar" alt="">
      </div>
      <div class="rightDetails">
        <div class="title">{{comicInfo.comicName}}</div>
        <div class="author">作者：{{comicInfo.comicAuthor}}</div>
        <div class="type">
          状态：<span style="margin-right:20px;">{{comicState}}</span>
          题材：<span>{{comicInfo.comicType}}</span>
          </div>
        <div class="Introduction">{{comicInfo.Introduction}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import{ getComicInfo } from '@/models/cartoon.js'
export default {
  components: {},
  data() {
    return {
      comicInfo:{}
    };
  },
  computed:{
    comicState(){
      return this.comicInfo.comicState == 1? '连载中' : '已完结'
    }
  },
  created(){
    // this.comicInfo = getComicInfo()
    getComicInfo({comicId: 1001}).then(res=>{
      console.log(res)
      if(!res)return;
      this.comicInfo = res
    })
  },
  mounted(){
   
  },
  methods:{
    
  }
}
</script>

<style lang="scss">
  .detailBox{
    background-color: #EEF0F3;
    height: 100%;
    padding-top: 100px;
    .detailsContent{
      width: 1200px;
      height:300px;
      border-radius: 15px;
      background-color: white;
      margin: 0 auto;
      >div{
        display: inline-block;
      }
      .leftDetails{
        img{
          height: 314px;
          width: 240px;
          margin-top: -45px;
          margin-left: 40px;
          border-radius: 6px;
          box-shadow: 0 0 5px #494C52;
        }
      }
      .rightDetails{
        min-height:240px; 
        width: 890px;
        float: right;
        padding-top: 35px;
        .title{
          font-size: 30px;
          color: #252525;
          
        }
        .author{
          margin-top: 10px;
          font-size: 13px;
          color: #666;
        }
        .type{
          margin-top: 20px;
          font-size: 13px;
          color: #999;
          span{
            color: #252525;
          }
        }
        .Introduction{
          position: relative;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          font-size: 13px;
          color: #666;
          margin-top: 10px;
          line-height: 20px;
          width: 710px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          overflow: hidden;
        }
      }
    }
  }
</style>
