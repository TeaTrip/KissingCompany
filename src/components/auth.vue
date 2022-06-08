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
        this.$emit('login', {userType: 1, token: 'blablabla'})
      }
    }
  })
</script>
