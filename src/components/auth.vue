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
        
        const response = await kissApi.getKissApi().login(credential);
        if(response.role){
          const newConfig = {
					...apiConfig,
            auth: {
              ...credential
            },
          }
			
				  kissApi.setNewConfig(newConfig);

          window.localStorage.setItem('auth', JSON.stringify(credential));

          const role = response.role.name
          if(role === "USER"){
            this.$emit('login', {userType: 3})
          }
          if(role === "HOOKER"){
            this.$emit('login', {userType: 2})
          }
          if(role === "ADMIN"){
            this.$emit('login', {userType: 1})
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
