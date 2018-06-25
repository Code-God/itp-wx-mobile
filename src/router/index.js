import Vue from 'vue';
import VueRouter from 'vue-router';
import eventHub from '../plugins/eventHub';
// pages
import Register from '../pages/Register.vue';
import RegisterResult from '../pages/RegisterResult.vue';
import UpdateInfo from '../pages/UpdateInfo.vue';
import ITP from '../pages/ITP.vue';
import Pharmacy from '../pages/Pharmacy.vue';
import Hospital from '../pages/Hospital.vue';
import http from '../common/http';

Vue.use(VueRouter);

const router = new VueRouter({
  // mode: 'history',
  routes: [{
    path: '/register',
    name: 'Register',
    component: Register,
    props: true,
    meta: {
      title: '患者注册'
    }
  }, {
    path: '/updateInfo',
    name: 'UpdateInfo',
    component: UpdateInfo,
    props: true,
    meta: {
      title: '修改资料'
    }
  },
  {
    path: '/registerResult',
    name: 'registerResult',
    component: RegisterResult,
    props: true,
    meta: {
      title: '患者注册'
    }
  }, {
    path: '/ITP',
    name: 'ITP',
    component: ITP,
    props: true,
    meta: {
      title: 'ITP出血评分'
    }
  }, {
    path: '/pharmacy',
    name: 'pharmacy',
    component: Pharmacy,
    props: true,
    meta: {
      title: '用药情况'
    }
  }, {
    path: '/hospital',
    name: 'Hospital',
    component: Hospital,
    props: true,
    meta: {
      title: '就诊情况'
    }
  }
  ],
  scrollBehavior(to, from, savedPosition) {
    return {
      x: 0,
      y: 0
    }
  }
});
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title , 处理登录  */
  eventHub.$emit('loading', true);
  http.get('weixin/validate').then(function (data) {
    console.log('内部路由验证: 登录状态');
  }).catch(function (error) {
    if (error.response.status === 403) {
      alert("请注册");
    } else {
      alert(error.response.status);
    }
  });
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});

export default router;
