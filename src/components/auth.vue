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
      password: '20ed94cf-5ba6-46b2-b249-28d6c809c4d7',
      login: '',
      isRegistration: false,
    }),
    methods: {
      async authorize(){
        // console.log('login');
        // const res = await kissApi.login({username:'user', password: this.password})
        // console.log(res);
        //здесь должен быть запрос на авторизацию
        if(this.login == '1'){
          this.$emit('login', {userType: 1, token: 'blablabla'})
        }
        if(this.login == '2'){
          this.$emit('login', {userType: 2, token: 'blablabla'})
        }
        if(this.login == '3'){
          this.$emit('login', {userType: 3, token: 'blablabla'})
        }
        if(this.login == '4'){
          this.$emit('login', {userType: 4, token: 'blablabla'})
        }
      }
    }
  })
</script>
