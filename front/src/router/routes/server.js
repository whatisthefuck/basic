
const goods=()=>import('Server/goods/index.vue')
const control=()=>import('Server/control/index.vue')
const layout=()=>import('Server/layout/index.vue')

export const server=[{
  path:'/server',
  component:layout,
  meta:{
    role:'server',
    title:'商品管理',
    menuRole:2
  },
  children:[
    {
      path:'goods',
      component:goods
    }
  ]
},
{
  path:'/server',
  component:layout,
  meta:{
    role:'server',
    title:'权限控制',
    menuRole:4
  },
  children:[
    {
      path:'control',
      component:control
    }
  ]
},]