import Vue from 'vue';
import VueRouter from 'vue-router';
import App from '@/App.vue'
import hookerRegistration from '@/components/hookerView/hooker-registration.vue'
import auth from '@/components/auth.vue'
import user from '@/components/userView/user.vue'
import pimp from '@/components/pimpView/pimp.vue'
import hooker from '@/components/hookerView/hooker.vue'
import unauth from  '@/components/unauth.vue'
import { kissApi } from '@/api/authApi/kissApi';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    meta: { roles: ['UNAUTH'] },
    component: auth,
  },
  {
    path: '/unauth',
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
    component: user,
  },
  {
    path: '/pimp',
    meta: { roles: ['ADMIN'] },
    component: pimp,
  },
  {
    path: '/hooker',
    meta: { roles: ['HOOKER'] },
    component: hooker,
  },
];

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  if(to.meta && to.meta.roles){
    const allowedRoles = to.meta.roles;
    const userRole = kissApi.getRole(); 
    if(to.path.startsWith('/hooker-registration') && !allowedRoles.includes(userRole)){
      next({path: '/', query: { redirectFrom: to.path }});
      return;
    }

    if (allowedRoles && !allowedRoles.includes(userRole)) {
        next({path: '/unauth', replace: true}); 
    } else {
        next();
    }
}else{
    next();
}
});

export default router;