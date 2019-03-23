<template>
  <div class="page">
    <sidebar />
    <div class="right">
        <router-view/>
    </div>
  </div>
</template>

<script>
import sidebar from './components/sidebar'
export default {
  components: { sidebar },
  data() {
    return {
  
    };
  },
  mounted(){
   
  },
  methods:{

  }
};
</script>

<style>
#app{
    height: 100%;
}
    body,html{
        margin: 0;
        padding: 0;
        height: 100%;
    }
    .page{
        display: flex;
        height: 100%;
    }
</style>