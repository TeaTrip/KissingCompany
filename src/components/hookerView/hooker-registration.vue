<template>
  <div>
    <v-app-bar
      color="red darken-1"
      dark
    >
    <v-toolbar-title>Регистрация</v-toolbar-title>
    </v-app-bar>
		<!-- <v-dialog
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
        </v-dialog> -->
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
				  v-model="avatar"
					accept="image/*"
					placeholder="Аватар профиля"
					prepend-icon="mdi-camera"
				></v-file-input>
				</v-col>

				<v-col cols="12" md="12">
          <v-text-field
            v-model="profileName"
            label="Отображаемое имя"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="12">
          <v-text-field
            v-model="location"
            label="Адрес"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="12">
          <v-text-field
            v-model="nation"
            label="Национальность"
            required
          ></v-text-field>
        </v-col>

				<v-col cols="12" md="12">
          <v-text-field
		  	    v-model="age"
            label="Возраст"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="12">
          <v-text-field
		  	    v-model="height"
            label="Рост"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="12">
          <v-text-field
		  	    v-model="weight"
            label="Вес"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="12">
          <v-text-field
		  	    v-model="telephone"
            label="Номер телефона"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="12">
          <v-text-field
		  	    v-model="hairColor"
            label="Цвет волос"
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
				<v-col cols="12" md="12">
					<p>Предоставляемые услуги</p>
					<v-divider></v-divider>
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

				<v-col cols="12" md="12" :key="index" v-for="(service, index) in customService">
						<div  class="hooker-registration__new-service">
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
						v-model="photosToUpload"
						accept="image/*"
						label="Добавьте несколько фотографий"
						multiple
						filled
						prepend-icon="mdi-camera"
					></v-file-input>
				</v-col>
				<template v-if="photosToUpload.length > 1">
					<v-col   :key="index" cols="4" v-for="(url, index) in urlPhotos" class="d-flex child-flex">
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
				</template>

				<v-col cols="12" md="12">
					<div class="hooker-registration__buttons">
						<v-btn class="hooker-registration__grid" style="grid-column: 2/3" color="error" @click="register()">Завершить регистрацию</v-btn>
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
  import { kissApi } from '@/api/authApi/kissApi';

  export default Vue.extend({
    props: {
      token: {
        type: String,
        required: true
      }
    },
    name: 'hookerRegistration',
    data: () => ({
		avatar: null,
		password: '',
		age: '',
		nation: '',
		height: '',
		weight: '',
		telephone: '',
		hairColor: '',
		dialog: false,
		valid: false,
		firstname: '',
		location: '',
		nameRules: [
			(v: any) => !!v || 'Имя обязательное поле',
			(v: any) => v.length <= 10 || 'Имя должно быть меньше 10 символов',
		],
		login: '',
		loginRules: [
			(v: any) => !!v || 'Логин обяхательное поле',
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
		photosToUpload: [],
		urlPhotos: [{string: ''}],
		profileName: '',
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
				this.photosToUpload.forEach(photo => {
					let urlCreator = window.URL || window.webkitURL;
					const imageUrl = urlCreator.createObjectURL(photo);
					this.urlPhotos.push({string: imageUrl});
				})
			},
			async register(){
				const objToSendDefka = {
					location: this.location,
					age: this.age,
					height: this.height,
					weight: this.weight,
					nation: this.nation,
					telephone: this.telephone,
					hair_color: this.hairColor,
					nickname: this.profileName,
				}

        const response = await kissApi.getKissApi().registerDefka(this.token, objToSendDefka);
        if(response.id){
          let serviceObj = {
              cost: 25,
              serviceName: 'долгий поцелуй',
              girlId: response.id,
              isCostPerMinute: false,
              estimatedDurationInMin: 5
          };
          if(this.kissLight){
            kissApi.getKissApi().createPrice({...serviceObj, serviceName: 'Поцелуй (с языком)'});
          }
          if(this.kissWithTongue){
            kissApi.getKissApi().createPrice({...serviceObj, serviceName: 'Поцелуй (в щеку)'});
          }
          if(this.hugs){
            kissApi.getKissApi().createPrice({...serviceObj, serviceName: 'Объятия'});
          }
          this.customService.forEach(service => {
            if(service.enabled){
              const obj = {
                ...serviceObj,
                serviceName: service.name,
                cost: service.price
              };
              kissApi.getKissApi().createPrice(obj);
            }
          })
				if(this.avatar){
          const formData = new FormData();
          formData.append('image', this.avatar)
          await kissApi.getKissApi().postGirlPhoto(formData, true);
        }
        if(this.photosToUpload.length){
          for(const photo of this.photosToUpload){
            const formData = new FormData();
            formData.append('image', photo)
            await kissApi.getKissApi().postGirlPhoto(formData);
          }
        }

          kissApi.setRole('HOOKER');
          this.$router.push('/hooker');
        }
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
