import Layout from '@/layout'

// import first from '@/views/dashboard/index'
import role from '@/views/system/role'
import user from '@/views/system/user'
import config from '@/views/system/config'
import group from '@/views/system/group'
import manager from '@/views/project/manager'
import task from '@/views/project/task'
import yj from '@/views/project/yj'
import gantt from '@/views/project/gantt'
import reportform from '@/views/reportform/reportform'
import statistics from '@/src/views/reportform/mystatistics.vue'

import people from '@/views/org/people'
import depart from '@/views/org/depart'

export function menu(value) {
  var rout = []
  // let b = value;
  for (const v in value) {
    if (value[v].url.length !== 0) {
      var childs = []
      // var cmcm = {};
      // var str = b[v].url;
      // if (b[v].children !== null && b[v].children.length > 0) {
      //   childs = getChild(b[v].children);
      //   // if(b[v].id==3){
      //   //     childs.push({
      //   //       path: "/taskDetail",
      //   //       component: () => import('@/views/project/taskDetail'),
      //   //       hidden: true
      //   //     })
      //   // }
      //   cmcm = () => import('@/views/' + str);
      // } else {
      //   cmcm = Layout;
      // }
      var ob = {
        path: value[v].url,
        component: Layout,
        meta: {
          title: value[v].name,
          icon: value[v].icon,
          roles: [value[v].roleId]
        },
        children: childs
      }
      if (value[v].id === 1) {
        ob = {
          path: value[v].url,
          component: Layout,
          meta: {
            title: '',
            icon: value[v].icon,
            roles: [value[v].roleId]
          },
          children: [{
            path: '/',
            component: () => import('@/views/dashboard/index'),
            name: '首页',
            meta: {
              title: '首页',
              icon: 'dashboard',
              affix: true
            }
          }]
        }
      }
      rout.push(ob)
    }
  }
  return rout
}
export function getChild(childrens) {
  var childs = []
  for (var child of childrens) {
    var currChild = []
    if (child.children !== null && child.children.length > 0) {
      currChild = getChild(child.children)
    }
    // var str = '@/views/system/role'; //'@/views/'+child.url;
    // var comp = "";
    // switch (child.id) {
    //   case 7:
    //     comp = user
    //     break;
    //   case 15:
    //     comp = role
    //     break;
    //   case 4:
    //     comp = config
    //     break;
    //   case 8:
    //     comp = group
    //     break;
    // }

    // child.url,//'/permission/role',//child.url,
    var ob = {
      path: '/' + child.url,
      name: 'SystemConfig',
      component: child.id === 7 ? user : child.id === 15 ? role : child.id === 14 ? people : child.id === 16 ? depart : child.id === 4 ? config : child.id === 8 ? group : child.id === 17 ? manager : child.id === 18 ? task : child.id === 19 ? yj : child.id === 21 ? reportform : child.id === 23 ? statistics : gantt, // child.id==7?user:child.id==15?role:child.id==4?config:child.id==8?group:child.id==17?manager:child.id==18?task:child.id==19?yj:"", //() => import('@/views/system/role'),  由于import 是编译时加载 所以无法动态异步载入
      // hidden:true,
      meta: {
        title: child.name,
        icon: child.icon,
        roles: [child.roleId]
      },
      children: currChild
    }
    childs.push(ob)
  }
  return childs
}
