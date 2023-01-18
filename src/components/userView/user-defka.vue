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


		<template>
			<v-container
				class="px-0"
				fluid
			>
				<v-radio-group v-model="selectedPrice">
					<v-radio
						v-for="price in prices"
						:key="price.id"
						:label="price.label"
						:value="price.id"
					></v-radio>
				</v-radio-group>
			</v-container>
		</template>

		<!-- <template v-for="price in prices">
			<v-col cols="12" md="12">
				<v-checkbox
					v-model="price.isWanted"
					:label="price.label"
					color="primary"
					value="primary"
					hide-details
				></v-checkbox>
			</v-col>
		</template> -->


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
				:items="availableTimes"
				v-model="time"
				label="Свободное время"
				></v-select>
			</v-col>
		</v-col>
		<v-col v-if="date" cols="12" md="12">
			<div class="user-defka__buttons">
				<v-btn class="user-defka__grid" style="grid-column: 2/3" color="error" @click="book()">Подтвердить</v-btn>
			</div>
		</v-col>
		<comments :girlId="girlId" />
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
			girlId: 0,
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
			selectedPrice: 0,
			time: '',
			prices: [] as { isWanted: boolean, label: string, id: number}[],
			services: [] as { startDt: string }[],
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
			formattedDate() {
				// Create a new Date object from the timestamp
				let date = new Date(this.date);
				// Use the getFullYear(), getMonth(), and getDate() methods to get the year, month, and day
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
				// Use the split() method to separate the selected time string into hours and minutes
				let [hours, minutes] = this.time.split(':');
				// Use the padStart() method to add a leading 0 to the month and day if necessary
				let monthS = month.toString().padStart(2, '0');
				let dayS = day.toString().padStart(2, '0');
				// Use template literals to combine the year, month, day, hours, and minutes into the desired format
				return `${year}-${monthS}-${dayS}T${hours}:${minutes}:00.000`
			},
			async book() {
				const obj = {
						girlId: this.$route.params.id,
						service_id: this.selectedPrice,
						startDt: this.formattedDate()
				}
				const res = await kissApi.getKissApi().postServiceHistory(obj);
				if(res) {
					this.accept = true;
				}
				console.log('time is', this.time)
			}
		},
		async mounted(){
			const id = this.$route.params.id;
			this.girlId = parseInt(id);
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
			result.forEach(price => {
				if(price.girlId == id){
					const obj = {
						isWanted: false,
						label: `${price.serviceName} - ${price.cost}$`,
						id: price.id,
					}
					this.prices.push(obj);
				}
			})

			const services = await kissApi.getKissApi().getAllServicesForDefkaById(parseInt(id));
			this.services = services;
		},
		computed: {
			availableTimes() {
				const selectedDate = new Date(this.date);
				const startHour = 8;
				const endHour = 21;
				const slots = [];
				for (let i = startHour; i < endHour; i++) {
					let hour = i;
					let minutes = "00";
					let time = `${hour}:${minutes}`;
					let isAvailable = true;
					for (let service of this.services) {
						let serviceDate = new Date(service.startDt);
						if (selectedDate.getDate() === serviceDate.getDate() && selectedDate.getMonth() === serviceDate.getMonth() && selectedDate.getFullYear() === serviceDate.getFullYear() && serviceDate.getHours() === hour) {
							isAvailable = false;
							break;
						}
					}
					if (isAvailable) {
						slots.push(time);
					}
				}
				return slots;
			}
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
