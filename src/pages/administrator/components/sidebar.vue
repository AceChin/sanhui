<template>
  <div class="sidebar">
      <div style="background-color:#032242"></div>
      <div v-for="(item,index) of leftData" :key="index" 
      :class="activeIndex == index?'active':''" @click="addcartoon(index)">
        {{item}}
      </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
        activeIndex: 0,
        leftData:[
            '添加漫画','删除漫画','评论管理','资讯管理','试用功能','黑科技1号'
        ]
    };
  },
  mounted(){

  },
  methods:{
    async addcartoon(index){
        this.activeIndex = index
        if (index == 0)
            this.$router.push('/administrator/addcartoon')
    },

  }
};
</script>

<style lang="scss">
    body,html{
        margin: 0;
        padding: 0;
    }
    .active{
        background-color: #052C55!important;
        border-left: 2px solid #038FEE;
    }
    .sidebar{
        flex: 1;
        width: 140px;
        max-width: 140px;
        min-width: 140px;
        overflow: hidden;
        background:linear-gradient(180deg,rgba(8,50,103,1) 0%,rgba(10,91,138,1) 100%);
        div{
            width:100%;;
            font-size:15px;
            font-family:PingFang SC;
            font-weight:500;
            line-height:12px;
            color:rgba(122,162,194,1);
            opacity:1;
            height: 40px;
            text-align: center;
            line-height: 40px;
        }
    }
</style>