
const login=()=>import('Front/login/index.vue')
const home=()=>import('Front/home/index.vue')

export const front=[{
  path:'/',
  meta:{
    role:'front',
  },
  // component:login,
  redirect:'/login'
},
{
  path:'/login',
  meta:{
    role:'front',
  },
  component:login,
},
{
  path:'/home',
  meta:{
    role:'front',
  },
  component:home
},]