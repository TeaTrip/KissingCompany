import Vue from 'vue';
import VueRouter from 'vue-router';
import App from '@/App.vue'
import hookerRegistration from '@/components/hookerView/hooker-registration.vue'
import auth from '@/components/auth.vue'
import user from '@/components/userView/user.vue'
import pimp from '@/components/pimpView/pimp.vue'
import hooker from '@/components/hookerView/hooker.vue'
import unauth from  '@/components/unauth.vue'
import userAllDefki from '@/components/userView/user-all-defki.vue'
import userDefka from '@/components/userView/user-all-defki.vue'
import userHistory from '@/components/userView/user-history.vue'
import userHistoryDetail from '@/components/userView/user-history-detail.vue'
import pimpAllDefki from '@/components/pimpView/pimp-all-defki.vue'
import pimpAddDefka from '@/components/pimpView/pimp-add-defka.vue'
import hookerMyPage from '@/components/hookerView/hooker-my-page.vue'
import userFeedbacks from '@/components/userView/user-feedbacks.vue'
import hookerSchedule from '@/components/hookerView/hooker-schedule.vue'
import hookerServiceHistory from '@/components/hookerView/hooker-service-history.vue'
import { kissApi } from '@/api/authApi/kissApi';


Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    meta: { roles: ['UNAUTH', 'USER', 'ADMIN', 'HOOKER'] },
    component: auth,
  },
  {
    path: '/unauth',
    meta: { roles: ['UNAUTH', 'USER', 'ADMIN', 'HOOKER'] },
    component: unauth,
  },
  {
    path: '/hooker-registration/:token',
    component: hookerRegistration,
    props: true,
    meta: {
        roles: ['USER']
    }
  },
  {
    path: '/user',
    meta: { roles: ['USER'] },
    children: [
      {
        path: 'girls',
        meta: { roles: ['USER'] },
        component: userAllDefki
      },
      {
        path: 'girls/:id',
        meta: { roles: ['USER'] },
        component: userDefka
      },
      {
        path: 'history',
        meta: { roles: ['USER'] },
        component: userHistory
      },
      {
        path: 'history/:id',
        meta: { roles: ['USER'] },
        component: userHistoryDetail
      },
      {
        path: 'appfeedback',
        meta: { roles: ['USER'] },
        component: userFeedbacks,
      },
    ],
    component: user,
  },
  {
    path: '/pimp',
    meta: { roles: ['ADMIN'] },
    children: [
      {
        path: 'invite',
        meta: { roles: ['ADMIN'] },
        component: pimpAddDefka
      },
      {
        path: 'girls',
        meta: { roles: ['ADMIN'] },
        component: pimpAllDefki
      },
      {
        path: 'girls/:id',
        meta: { roles: ['ADMIN'] },
        component: hookerMyPage
      },
    ],
    component: pimp,
  },
  {
    path: '/hooker',
    meta: { roles: ['HOOKER'] },
    component: hooker,
    children: [
      {
        path: 'profile',
        meta: { roles: ['HOOKER'] },
        component: hookerMyPage
      },
      {
        path: 'schedule',
        meta: { roles: ['HOOKER'] },
        component: hookerSchedule
      },
      {
        path: 'history',
        meta: { roles: ['HOOKER'] },
        component: hookerServiceHistory
      },
    ],
  },
];

const router = new VueRouter({
  routes,
  mode: 'history'
});

router.beforeEach((to, from, next) => {
  console.log('to.path', to.path)
  console.log('to.meta', to.meta, 'to.meta.roles', to.meta?.roles)
  const allowedRoles = to.meta?.roles;
  const userRole = kissApi.getRole(); 

  if(to.path === '/' && userRole === 'USER'){
    next({path: '/user/girls'});
    return;
  }
  if(to.path === '/' && userRole === 'PIMP'){
    next({path: '/pimp/girls'});
    return;
  }
  if(to.path === '/' && userRole === 'HOOKER'){
    next({path: '/hooker/schedule'});
    return;
  }

  if(to.path.startsWith('/hooker-registration') && !allowedRoles.includes(userRole)){
    next({path: '/', query: { redirectFrom: to.path }});
    return;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
      next({path: '/unauth', replace: true}); 
  } else {
    next();
  }
});

export default router;