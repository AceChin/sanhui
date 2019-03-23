<template>
  <div >
    <navHeader />
    <router-view/>
  </div>
</template>

<script>
import navHeader from './components/header'
export default {
  components: { navHeader },
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
    body,html{
        margin: 0;
        padding: 0;
    }
</style>
