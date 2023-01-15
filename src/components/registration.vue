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
  import { apiConfig } from '@/api/authApi/api.config';
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
				kissApi.setNewConfig(apiConfig);
				let user = {
					username: this.login,
					first_name: this.name,
					second_name: this.lastName,
					password: this.password,
					role: "USER"
				}
				const response = await kissApi.getKissApi().registration(user);
				if(response.error){
					console.log('something going wrong');
					return;
				}
				this.$emit('register', {username: this.login, password: this.password})
			}
		}
	})
  </script>
  