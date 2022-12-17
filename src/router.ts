import Vue from 'vue';
import VueRouter from 'vue-router';
import App from '@/App.vue'
import hookerRegistration from '@/components/hookerView/hooker-registration.vue'
import auth from '@/components/auth.vue'
import user from '@/components/userView/user.vue'
import pimp from '@/components/pimpView/pimp.vue'
import hooker from '@/components/hookerView/hooker.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: auth,
  },
  {
    path: '/hooker-registration',
    component: hookerRegistration,
    meta: {
        allowAnonymous: false
    }
  },
  {
    path: '/user',
    component: user,
  },
  {
    path: '/pimp',
    component: pimp,
  },
  {
    path: '/hooker',
    component: hooker,
  },
];

const router = new VueRouter({
  routes
});

export default router;