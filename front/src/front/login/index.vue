<template>
  <div class="main">
    <div class="user">
      <label>
        账号:
        <input name="user" type="text" v-model="username" />
      </label>
    </div>
    <div class="password">
      <label>
        密码:
        <input name="password" type="text" v-model="password" />
      </label>
    </div>
    <div class="opt">
      <button class="login" @click="login">
      登录
    </button>
    <button class="register" @click="register">
      注册
    </button>
    <button class="register" @click="getUsers">
      获取所有账号
    </button>
    <button class="register" @click="getProfile">
      获取个人信息
    </button>
    </div>
  </div>
</template>
<script>
import { storage } from '../../config/storage.js'
export default {
  data(){
    return {
      username:'mzw',
      password:'123456'
    }
  },
  methods: {
    getUsers() {
      this.get('api/users').then(res => {
        console.log(res.data);
      });
    },
    login(){
      this.post('/api/login',{username:this.username,password:this.password}).then(res=>{
        console.log(res);
        let {token}=res.data;
        storage.set('token',token)
        this.$store.commit('login',true)
        this.$store.commit('updateMenuList',res.data.user.role)
        console.log(this.$store)
        this.$router.push(this.$store.state.menuList.menuList[0].path+'/'+this.$store.state.menuList.menuList[0].children[0].path)
        console.log(this.$router,'ppp')
        // console.log(this.$router,'ppp')
        // location.reload()
      })
    },
    register(){
      console.log(this.username,this.password);
      this.post('api/register',{username:this.username,password:this.password}).then(res=>{
        console.log(res);
      })
    },
    getProfile(){
      this.get('api/profile',{}).then(res=>{
        console.log(res);
      })
    }
  }
};
</script>
<style lang="scss" scoped>
.main {
  margin: 150px auto;
  width: 300px;
  height: 400px;
  border: 1px solid black;
  .opt{
    height: 30px;
    display: flex;
    div{
      flex: 1
    }
  }
}
</style>