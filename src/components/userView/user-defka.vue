<template>
  <div>
	<h1 v-if="accept">Успешно!</h1>
    <v-container v-else>
      <v-row>
        <v-col
          cols="12"
          md="12"
        >
            <v-img
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
              src="https://southpark.cc-fan.tv/characters/14.jpg"
            >
              <v-card-title v-text="nickname"></v-card-title>
            </v-img>
			<!-- <h3>
				4.5/5
			</h3> -->
        </v-col>
		<v-col
          cols="12"
          md="12"
        >
			<v-card
			class="d-flex justify-space-around mb-6"
			flat
			tile
			>
			<h3>Возраст:</h3>
			<h3>{{age}}</h3>
			</v-card>
			<v-card
			class="d-flex justify-space-around mb-6"
			flat
			tile
			>
			<h3>Рост:</h3>
			<h3>{{height}}</h3>
			</v-card>
			<v-card class="d-flex justify-space-around mb-6" flat tile>
				<h3>Цвет волос:</h3>
				<h3>{{hairColor}}</h3>
			</v-card>
			<v-card class="d-flex justify-space-around mb-6" flat tile>
				<h3>Национальность:</h3>
				<h3>{{nation}}</h3>
			</v-card>
			<v-card class="d-flex justify-space-around mb-6" flat tile>
				<h3>Телефон:</h3>
				<h3>{{telephone}}</h3>
			</v-card>
		</v-col>



		<!-- <v-col
          cols="12"
          md="12"
        >
          <v-textarea
		  	v-model="description"
            label="Описание"
			readonly
          ></v-textarea>
        </v-col> -->

		<v-col cols="12" md="12">
			<p>Предоставляемые услуги</p>
			<v-divider></v-divider>
		</v-col>

		<template v-for="service in services">
			<v-col cols="12" md="12">
				<v-checkbox
					v-model="service.isWanted"
					:label="service.label"
					color="primary"
					value="primary"
					hide-details
				></v-checkbox>
			</v-col>
		</template>


		<v-col cols="12" md="12">
			<div class="user-defka__buttons">
				<v-btn class="user-defka__grid" style="grid-column: 2/3" color="error" @click="addNewService()">Выбрать время</v-btn>
			</div>
		</v-col>
      </v-row>
	  <v-dialog
        v-model="dialog"
        max-width="290"
        >
		
        <v-card>
            <v-card-title class="text-h5">
            Выберите дату
            </v-card-title>
            <v-spacer></v-spacer>
			<v-date-picker
				v-model="date"
				class="mt-4"
				min="2022-06-22"
			></v-date-picker>
            <v-card-actions justify="center">
                <v-btn
                    color="error"
                    text
                    @click="dialog = false"
                >
                    ОК
                </v-btn>
            </v-card-actions>
        </v-card>
		</v-dialog>
		<v-col v-if="date" cols="12" md="12">
			<v-col
				class="d-flex"
				cols="12"
			>
				<v-select
				:items="items"
				label="Свободное время"
				></v-select>
			</v-col>
		</v-col>
		<v-col v-if="date" cols="12" md="12">
			<div class="user-defka__buttons">
				<v-btn class="user-defka__grid" style="grid-column: 2/3" color="error" @click="accept = true">Подтвердить</v-btn>
			</div>
		</v-col>
		<comments />
    </v-container>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import comments from  '@/components/userView/comments/comments.vue';
	import { kissApi } from '@/api/authApi/kissApi';

  export default Vue.extend({
    name: 'userDefka',

	components: {
		comments
	},

    data: () => ({
			age: 0,
			height: 0,
			hairColor: '',
			nation: '',
			telephone: '',
			accept: false,
			date: '',
			nickname: '',
			dialog: false,
			valid: false,
			services: [] as { isWanted: boolean, label: string }[],
			description: 'Люблю крепко обниматься и долго целоваться!!!!',
			items: ['15:00', '17:00', '19:00', '20:00'],
      nameRules: [
        (v: any) => !!v || 'Name is required',
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
				this.dialog = true;
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
			},
		},
		async mounted(){
			const id = this.$route.params.id;
			const res = await kissApi.getKissApi().getDefka(parseInt(id));
			if(res){
				this.age = res.age;
				this.height = res.height;
				this.hairColor = res.hair_color;
				this.nation = res.nation;
				this.telephone = res.telephone;
				this.nickname = res.nikname
			};
			const result = await kissApi.getKissApi().getPrices();
			result.forEach(service => {
				if(service.girlId == id){
					const obj = {
						isWanted: false,
						label: `${service.serviceName} - ${service.cost}$`
					}
					this.services.push(obj);
				}
			})
			console.log(result);
		},
		watch: {
			photos: 'logFiles',
		}       
  })
</script>

<style lang="scss">
.user-defka{
	&__service{
		display:grid;
		grid-template-columns: 1fr 1fr;
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
