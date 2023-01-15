<template>
  <v-container>
    <registration v-if="isRegistration" @register="authorize($event)" @isLogin="isRegistration=false" />
    
    <v-container v-else>
      <v-text-field
        label="Логин"
        v-model="login"
      ></v-text-field>
      <v-text-field label="Пароль" v-model="password" type="password"></v-text-field>
      <v-col cols="12" md="12">
        <v-btn @click="authorize({username: login, password})">Войти</v-btn>
      </v-col>
      <v-col cols="12" md="12">
        <v-btn @click="isRegistration = true">Зарегестрироваться</v-btn>
      </v-col>
    </v-container>
  </v-container>
</template>

<script lang="ts">
  import { apiConfig } from '@/api/authApi/api.config';
  import { kissApi } from '@/api/authApi/kissApi';
  import registration from '@/components/registration.vue'
  import Vue from 'vue'
  import router from '@/router';

  export default Vue.extend({
    name: 'auth',
    components: {
      registration
    },
    data: () => ({
      rules: [
        (value: any) => !!value || 'Необходимое поле.',
        (value: any) => (value && value.length >= 3) || 'Минимум 5 символов',
      ],
      password: '',
      login: '',
      isRegistration: false,
    }),
    methods: {
      async authorize(cred: {username: string, password: string}){
        console.log('cred from authorize', cred);
        const newConfig = {
					...apiConfig,
            auth: {
              ...cred
            },
          }
        kissApi.setNewConfig(newConfig);
        const response = await kissApi.getKissApi().login();
        if(response.roleName){
          window.localStorage.setItem('auth', JSON.stringify(cred));
          const redirectFrom = this.$route.query.redirectFrom;
          if (typeof redirectFrom === 'string' && redirectFrom.startsWith('/hooker-registration')) {
            kissApi.setRole('USER');
            this.$router.push(redirectFrom);
            return;
          }
          const role = response.roleName
          if(role === "USER"){
            kissApi.setRole('USER');
            this.$router.push('/user');
          }
          if(role === "HOOKER"){
            kissApi.setRole('HOOKER');
            this.$router.push('/hooker');
          }
          if(role === "ADMIN"){
            kissApi.setRole('ADMIN');
            this.$router.push('/pimp');
          }

          return;
        }
        else {
          console.log('something went wrog');
        }
      }
    }
  })
</script>
