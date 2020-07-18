
<template>
  <div>
    <el-menu
      :default-active="activeMenu"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      :router='true'
    >
      <el-menu-item v-for="item in getServerRoutes()" :index="item.path+'/'+item.children[0].path" :key="item.meta.title">
        <i class="el-icon-setting"></i>
        <span slot="title">{{item.meta.title}}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
// import {routes} from './../../router/index'
import {storage} from './../../config/storage'
export default {
  data() {
    return {
      isCollapse: false,
      // activeMenu:'',
    };
  },
  created() {
    console.log(this.$route)
    console.log(this.$store.state.menuList,'ppp')
  },
  computed: {
    activeMenu(){
      return this.$route.path
    },
    // routes(){
    //   return this.$router
    // }
  },
  methods: {
    getServerRoutes(){
      return storage.get('menuList').filter(item=>{
        return item?.meta?.role=='server'
      })
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
      console.log(11)
    },
    handleClose(key, keyPath) {
      console.log(11)
      console.log(key, keyPath);
    }
  }
};
</script>