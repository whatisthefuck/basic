import {server} from './../../router/routes/server'
import {router} from './../../router/index'
import {storage} from './../../config/storage'
import {filterRouter} from 'Config/filterRouter'
const menuList={
  state:{
    menuList:[]
  },
  mutations:{
    updateMenuList(state,role){
      state.menuList=filterRouter(server,role)
      storage.set('menuList',state.menuList)
      console.log(server,'111');
    }
  }
}
export default menuList