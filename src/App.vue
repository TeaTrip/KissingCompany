<template>
  <v-app>
    <meta name="viewport" content="orientation=portrait, width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover" />
    <v-main>
      <router-view></router-view>
      <!-- <auth v-if="userType == 0" @login="switchView($event)"/>
      <pimp v-if="userType == 1" @logout="logout()"/>
      <hooker v-if="userType == 2" @logout="logout()" />
      <user v-if="userType == 3" @logout="logout()" />
      <hooker-registration v-if="userType == 4"  @login="switchView($event)" /> -->
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
import { kissApi } from './api/authApi/kissApi';
import { apiConfig } from './api/authApi/api.config';


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
    userType: -1,
  }),
  created: function() {
    this.tryAuth();
  },
  methods: {
    switchView(e: any){
      this.userType = e.userType;
    },

    async tryAuth() {
      console.log('IS THIS CALLED?');
      let cred: any = window.localStorage.getItem('auth');
      console.log('there is cred', cred);

      if(cred) {
        cred = JSON.parse(cred);
        const response = await kissApi.getKissApi().login(cred);
          if(response.role){
            const newConfig = {
            ...apiConfig,
              auth: {
                ...cred
              },
            }
        
            kissApi.setNewConfig(newConfig);
            const role = response.role.name
            if(role === "USER"){
              this.switchView({userType: 3});
            }
            if(role === "HOOKER"){
              this.switchView({userType: 2});
            }
            if(role === "ADMIN"){
              this.switchView({userType: 1});
            }

            return;
          }
          else {
            console.log('something went wrog');
          } 
      }
      this.switchView({userType: 0});
    },
    logout() {
      kissApi.logout();
      this.switchView({userType: 0});
    }
  },
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
