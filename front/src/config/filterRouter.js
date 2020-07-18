export const filterRouter=function(routes,role){
  if(role==3){
    return routes
  }else{
    return routes.filter(item=>{
      return item.meta.menuRole&role
    })
  }
}