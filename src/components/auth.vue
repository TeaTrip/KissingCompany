<template>
  <v-container>
    <registration v-if="isRegistration" @isLogin="isRegistration=false" />
    
    <v-container v-else>
      <v-text-field
        label="Логин"
        v-model="login"
      ></v-text-field>
      <v-text-field label="Пароль" v-model="password" type="password"></v-text-field>
      <v-col cols="12" md="12">
        <v-btn @click="authorize()">Войти</v-btn>
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
      async authorize(){
        const credential = {
          username: this.login,
          password: this.password,
        }
        
        const newConfig = {
					...apiConfig,
            auth: {
              ...credential
            },
          }
        kissApi.setNewConfig(newConfig);
        const response = await kissApi.getKissApi().login();
        if(response.roleName){
          window.localStorage.setItem('auth', JSON.stringify(credential));

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
