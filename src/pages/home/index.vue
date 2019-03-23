<template>
  <div class="homeContent">
    <el-carousel :interval="4000" type="card" height="300px">
      <el-carousel-item v-for="item in 6" :key="item">
        <!-- <h3>{{ item }}</h3> -->
        <div class="itemContent"  @click="jump(item)">

        </div>
      </el-carousel-item>
    </el-carousel>
    <div class="warpBox">
      <el-row class="headerBox">
        <el-col :span="10" class="leftBox">
          <div class="homeTitle">
            推荐
          </div>
        </el-col>
        <el-col :span="13" :offset="1" class="rightBox">
          <div class="homeTitle">
            推荐
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import{ getHome } from '@/models/userFnc.js'
export default {

  components: {},
  data() {
    return {
      
    };
  },
  mounted(){
   
  },
  created(){
    getHome({}).then(res=>{
      console.log(res)
      if(!res)return;
      
    })
  },
  methods:{
    jump(e){
      console.log(e)
    }
  }
}
</script>

<style lang="scss">
.homeContent{
  .el-carousel{
    width: 1200px;
    margin: 0 auto;
  }
  .itemContent{
    height: 100%;
    width: 100%;
    background-color: rgb(49, 150, 245);
  }
  .warpBox{
    padding-top: 50px;
    width: 1200px;
    margin: 0 auto;
    .headerBox{
      height: 200px;
      
      position: relative;
      div{
        height: 100%;
        border-top: 2px solid rgb(49, 150, 245);
        position: relative;
      }
      .homeTitle{
        position: absolute;
        width: 80px;
        height: 20px;
        color: #ffffff;
        background-color: rgb(49, 150, 245);
        top: -22px;
        // left: 20px;  
        text-align: center;
      }
      .leftBox{
        background-color: #475669
      }
      .rightBox{
        background-color: #d3dce6
      }
    }
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
}
</style>
