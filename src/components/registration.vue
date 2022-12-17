<template>
    <v-container>
      <div>
        <v-text-field
          label="Имя"
          v-model="name"
        ></v-text-field>
        <v-text-field
          label="Фамилия"
          v-model="lastName"
        ></v-text-field>
        <v-text-field
          label="Логин"
          v-model="login"
        ></v-text-field>
        <v-text-field label="Пароль" v-model="password" type="password"></v-text-field>
      </div>
			<v-col cols="12" md="12">
				<v-btn @click="registration()">Зарегестрироваться</v-btn>
			</v-col>
			<v-col cols="12" md="12">
				<v-btn @click="$emit('isLogin')">Назад</v-btn>
			</v-col>
    </v-container>
  </template>
  
  <script lang="ts">
  import { kissApi } from '@/api/authApi/kissApi';
  import Vue from 'vue'
	export default Vue.extend({
		name: 'registration',

		data: () => ({
			rules: [
				(value: any) => !!value || 'Необходимое поле.',
				(value: any) => (value && value.length >= 3) || 'Минимум 5 символов',
			],
			password: '',
			login: '',
			name: '',
			lastName: '',
		}),
		methods: {
			async registration(){
				let user = {
					username: this.login,
					first_name: this.name,
					second_name: this.lastName,
					password: this.password,
					role: "Пользователь"
				}
				const response = kissApi.registration(user);
				console.log(response);
				// console.log('login');
				// const res = await kissApi.login({username:'user', password: this.password})
				// console.log(res);
				//здесь должен быть запрос на авторизацию
				// if(this.login == '1'){
				// 	this.$emit('login', {userType: 1, token: 'blablabla'})
				// }
				// if(this.login == '2'){
				// 	this.$emit('login', {userType: 2, token: 'blablabla'})
				// }
				// if(this.login == '3'){
				// 	this.$emit('login', {userType: 3, token: 'blablabla'})
				// }
				// if(this.login == '4'){
				// 	this.$emit('login', {userType: 4, token: 'blablabla'})
				// }
			}
		}
	})
  </script>
  