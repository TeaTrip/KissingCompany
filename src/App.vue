<template>
  <v-app>
    <v-main>
      <auth v-if="userType == 0" @login="switchView($event)"/>
      <pimp v-if="userType == 1" />
      <hooker v-if="userType == 2" />
      <user v-if="userType == 3" />
      <hooker-registration v-if="userType == 5" @login="switchView($event)" />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import auth from './components/auth.vue';
import pimp from '@/components/pimpView/pimp.vue';
import hooker from '@/components/hookerView/hooker.vue';
import user from '@/components/userView/user.vue';
import hookerRegistration from './components/hookerView/hooker-registration.vue';


export enum IUserType{
  auth = 0,
  pimp = 1,
  hooker = 2,
  user = 3
}

export default Vue.extend({
  name: 'App',

  components: {
    auth,
    pimp,
    hooker,
    user,
    hookerRegistration
  },

  data: () => ({
    userType: 0,
  }),
  methods: {
    switchView(e: any){
      this.userType = e.userType;
    }
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  max-width: 479px;
}
</style>
