
<template>
  <div>
    <my-head />
    <div class="main">
        <side-menu />
        <router-view></router-view>
    </div>
  </div>
</template>

<script>
import sideMenu from "./sideMenu.vue";
import myHead from "./head.vue";
export default {
  data() {
    return {
      isCollapse: false
    };
  },
  components: {
    sideMenu,
    myHead
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
      console.log(11);
    },
    handleClose(key, keyPath) {
      console.log(11);
      console.log(key, keyPath);
    }
  }
};
</script>
<style lang='scss' scoped>
.main {
  display: flex;
}
</style>
