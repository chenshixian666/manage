import Cookie from "js-cookie";
export default {
  state:{
    isCollapse:false,
    //面包屑数据
    tabsList:[
      {
        path: "/",
        name: "home",
        label: "首页",
        icon: "s-home",
        url: "Home/Home",
      }
    ],
    menu:[]

  },
  mutations:{
    collapseMenu(state){
      state.isCollapse = !state.isCollapse
    },
    // 更新面包屑数据
    seletMenu(state, val){
      console.log(val,'val');
      // 判断添加的数据是否为首页
      if ( val.name !== 'home' ) {
        const index = state.tabsList.findIndex(item => item.name === val.name)
        if( index === -1) {
          state.tabsList.push(val)
        }
      }
    },
    // 删除指定的tag数据
    closeTag(state,item){
      console.log(item,'item')
      const index = state.tabsList.findIndex(val => val.name === item.name) //如果为ture则返回其索引值
      state.tabsList.splice(index,1)  // 第一个是要开始删除的位置，第二个是要删除的个数
    }, // 动态注册路由
    addMenu(state, router){

      // 判断缓存中是否有数据
      if (!Cookie.get('menu')) return   // 没有数据时
      const menu = JSON.parse(Cookie.get('menu')) // 获取cookie中的数据
      state.menu = menu
      // 组装动态路由的数据
      const menuArray = []
      menu.forEach(item => {
        if (item.children) {  //看是否有子菜单
          item.children = item.children.map(item => {   // map会返回一个新的方法
              item.component = () => import(`../views/${item.url}`)
              return item
          })
          menuArray.push(...item.children)
        } else {
          item.component = () => import(`../views/${item.url}`)
          menuArray.push(item)
        }
      })
      console.log(menuArray,'menuArray');
      // 组装完路径后 进行路由的动态添加
      menuArray.forEach(item => {   //addRoute动态添加路由
        router.addRoute('Main', item)
      })
    } 
    ,
    //  设置menu的数据
    setMenu(state, val) {
      state.menu = val
      Cookie.set('menu',JSON.stringify(val))
    }
  }
}