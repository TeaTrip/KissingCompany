import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import vuetify from './plugins/vuetify'
import VueRouter from 'vue-router'
import router from './router';

Vue.config.productionTip = false
Vue.use(VueRouter);

const eventBus = new Vue();
Vue.prototype.$eventBus = eventBus;

new Vue({
  vuetify,
  router,
  render: h => h(App),
}).$mount('#app')
