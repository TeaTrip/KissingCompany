<template>
  <div>
    <v-app-bar
      color="red darken-1"
      dark
    >
    <v-toolbar-title>Регистрация</v-toolbar-title>
    </v-app-bar>
		<v-dialog
        v-model="dialog"
        max-width="350"
        >
        <v-card>
            <v-card-title class="text-h5">
            Завершение регистрации
            </v-card-title>
            <v-spacer></v-spacer>
            <v-card-text>На указанную вами почту будет отправлен логин и пароль для входа в приложение. </v-card-text>
            <v-card-actions justify="center">
                <v-spacer></v-spacer>
                <v-btn
                    color="error"
                    text
                    @click="dialog = false"
                >
                    Отмена
                </v-btn>
                <v-btn
                    color="error"
                    text
                    @click="register()"
                >
                    Зарегистрироваться
                </v-btn>
            </v-card-actions>
        </v-card>
        </v-dialog>
    <v-form v-model="valid">
    <v-container>
    	<p>Общая информация</p>
			<v-divider></v-divider>
      <v-row>
				<v-col
          cols="12"
          md="12"
        >
				<v-file-input
					accept="image/*"
					placeholder="Аватар профиля"
					prepend-icon="mdi-camera"
				></v-file-input>
				</v-col>
        <v-col
          cols="12"
          md="12"
        >
          <v-text-field
            v-model="firstname"
            :rules="nameRules"
            :counter="10"
            label="Имя"
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="12"
        >
          <v-text-field
            v-model="lastname"
            :rules="nameRules"
            :counter="10"
            label="Фамилия"
            required
          ></v-text-field>
        </v-col>

				<v-col
          cols="12"
          md="12"
        >
          <v-text-field
            label="Возраст"
            required
          ></v-text-field>
        </v-col>

				<v-col
          cols="12"
          md="12"
        >
          <v-textarea
            label="Описание"
            required
          ></v-textarea>
        </v-col>

        <v-col
          cols="12"
          md="12"
        >
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>
        </v-col>

				<v-col cols="12" md="12">
					<p>Предоставляемые услуги</p>
					<v-divider></v-divider>
				</v-col>

				<v-col cols="12" md="12">
					<v-checkbox
						v-model="selectAll"
						label="Выбрать все"
						color="primary"
						value="primary"
						hide-details
					></v-checkbox>
				</v-col>

				<v-col cols="12" md="12">
					<v-checkbox
						v-model="kissWithTongue"
						label="Поцелуй (с языком)"
						color="primary"
						value="primary"
						hide-details
					></v-checkbox>
				</v-col>

				<v-col cols="12" md="12">
					<v-checkbox
						v-model="kissLight"
						label="Поцелуй (в щёку)"
						color="primary"
						value="primary"
						hide-details
					></v-checkbox>
				</v-col>

				<v-col cols="12" md="12">
					<v-checkbox
						v-model="hugs"
						label="Объятия"
						color="primary"
						value="primary"
						hide-details
					></v-checkbox>
				</v-col>

				<v-col cols="12" md="12" v-for="service in customService">
						<div class="hooker-registration__new-service">
							<v-checkbox
								v-model="service.enabled"
								color="primary"
								value="primary"
								hide-details
							></v-checkbox>
							<v-text-field
								v-model="service.name"
								:disabled="!service.enabled"
								label="Название услуги"
							></v-text-field>
							<v-text-field
								v-model="service.price"
								:disabled="!service.enabled"
								label="Цена"
							></v-text-field>
						</div>
				</v-col>
				<v-col cols="12" md="12">
					<div class="hooker-registration__buttons">
						<v-btn class="hooker-registration__grid" style="grid-column: 2/3" color="error" @click="addNewService()">Добавить свою услугу</v-btn>
					</div>
				</v-col>

				<v-col cols="12" md="12">
					<p>Фотографии</p>
					<v-divider></v-divider>
				</v-col>

				<v-col cols="12" md="12">
					<v-file-input
						v-model="photos"
						accept="image/*"
						label="Добавьте несколько фотографий"
						multiple
						filled
						prepend-icon="mdi-camera"
					></v-file-input>
				</v-col>

				<v-col v-if="photos.length > 1" cols="4" v-for="url in urlPhotos" class="d-flex child-flex">
					<v-img :src="url.string" aspect-ratio="1" class="grey lighten-2">
						<template v-slot:placeholder>
						<v-row
							class="fill-height ma-0"
							align="center"
							justify="center"
						>
							<v-progress-circular
								indeterminate
								color="grey lighten-5"
							></v-progress-circular>
						</v-row>
					</template>
					</v-img>	
				</v-col>

				<v-col cols="12" md="12">
					<div class="hooker-registration__buttons">
						<v-btn class="hooker-registration__grid" style="grid-column: 2/3" color="error" @click="dialog = true">Завершить регистрацию</v-btn>
					</div>
				</v-col>
      </v-row>
    </v-container>
  </v-form>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import validationMixin from '@/plugins/vuetify'
import { register } from 'register-service-worker';

  export default Vue.extend({
    name: 'hookerRegistration',

    data: () => ({
			dialog: false,
      valid: false,
      firstname: '',
      lastname: '',
      nameRules: [
        (v: any) => !!v || 'Name is required',
        (v: any) => v.length <= 10 || 'Name must be less than 10 characters',
      ],
      email: '',
      emailRules: [
        (v: any) => !!v || 'E-mail is required',
        (v: any) => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
			hugs: false,
			kissLight: false,
			kissWithTongue: false,
			selectAll: false,
			customService: [{
				enabled: false,
				name: '',
				price: '',
				}
			],
			photos: [],
			urlPhotos: [{string: ''}]
    }),

		methods: {
			addNewService(){
				this.customService.push({
				enabled: false,
				name: '',
				price: '',
				});
			},
			logFiles(){
				console.log(this.photos);
				this.urlPhotos = [];
				this.photos.forEach(photo => {
					let urlCreator = window.URL || window.webkitURL;
					const imageUrl = urlCreator.createObjectURL(photo);
					this.urlPhotos.push({string: imageUrl});
				})
			},
			register(){
				// api register call
				this.dialog = false;
				this.$emit('login', {userType: 0, token: 'blablabla'})
			}
		},
		
		watch: {
			photos: 'logFiles',
		}
  })
</script>

<style lang="scss">
.hooker-registration{
	&__new-service{
		display:grid;
		grid-template-columns: min-content 5fr 2fr;
		grid-gap: 5px;
	}
	&__buttons {
			display: grid;
			grid-template-columns: 1fr min-content 1fr;
			grid-row-gap: 10px;
	}
	&__grid {
			grid-column: 1/2;
	}
}
</style>
