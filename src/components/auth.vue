<template>
  <v-container>
    <div>
      <v-text-field
        label="Логин"
        v-model="login"
      ></v-text-field>
      <v-text-field label="Пароль" v-model="password" type="password"></v-text-field>
    </div>
    <v-btn @click="authorize()">Войти</v-btn>
  </v-container>
</template>

<script lang="ts">
  import Vue from 'vue'

  export default Vue.extend({
    name: 'auth',

    data: () => ({
      rules: [
        (value: any) => !!value || 'Необходимое поле.',
        (value: any) => (value && value.length >= 3) || 'Минимум 5 символов',
      ],
      password: '',
      login: '',
    }),
    methods: {
      authorize(){
        console.log('login');
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
        if(this.login == '5'){
          this.$emit('login', {userType: 5, token: 'blablabla'})
        }
      }
    }
  })
</script>
