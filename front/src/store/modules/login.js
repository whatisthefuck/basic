const login={
  state:{
    login:false
  },
  mutations:{
    login(state,flag){
      state.login=flag
    }
  },
  getters:{
    isLogin:state=>state.login
  }
}
export default login