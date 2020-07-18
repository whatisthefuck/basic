
import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import {storage} from './../config/storage'
Vue.use(Router)
import { routes } from './routes/index'
const router=new Router({
  mode: 'hash',
  routes,
})
//添加守卫
router.beforeEach((to, from, next) => {
  let menuList=storage.get('menuList')
  console.log(menuList,'menuList');
  //进度条相关
  if(to.matched.some(item=>item.path=='/server')&&from.matched.some(item=>item.path=='/server')){
    NProgress.start()
  }
  //路由权限控制
  console.log(to.path,from.path,'路由',menuList[0].path+'/'+menuList[0].children[0].path==to.path);
  if(to.matched.some(item=>item.path=='/server')){//进后台
    let permission=menuList.some(item=>{
      return item.children.some(item1=>{
        return (item.path+'/'+item1.path)==to.path
      })
    })
    if(!permission){
      console.log('无权限');
      NProgress.done()
      next({path:from.path})
      console.log(11)
    }else{
      next()
    }
  }else{
    next()
  }
})
router.afterEach((to, from) => {
  if(to.matched.some(item=>item.path=='/server')&&from.matched.some(item=>item.path=='/server')){
    NProgress.done()
  }
})
export {router}

