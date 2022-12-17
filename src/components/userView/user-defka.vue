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
              <v-card-title v-text="'Шелли марш'"></v-card-title>
            </v-img>
			<h1>
				4.5/5
			</h1>
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
			<h1>Возраст:</h1>
			<h1>7</h1>
			</v-card>
			<v-card
			class="d-flex justify-space-around mb-6"
			flat
			tile
			>
			<h1>Рост:</h1>
			<h1>120</h1>
			</v-card>
			<v-card
			class="d-flex justify-space-around mb-6"
			flat
			tile
			>
			<h1>Цвет волос:</h1>
			<h1>Шатенка</h1>
			</v-card>
		</v-col>

		<v-col
          cols="12"
          md="12"
        >
          <v-textarea
		  	v-model="description"
            label="Описание"
			readonly
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

		<v-col cols="12" md="12">
			<div class="hooker-registration__buttons">
				<v-btn class="hooker-registration__grid" style="grid-column: 2/3" color="error" @click="addNewService()">Выбрать время</v-btn>
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
			<div class="hooker-registration__buttons">
				<v-btn class="hooker-registration__grid" style="grid-column: 2/3" color="error" @click="accept = true">Подтвердить</v-btn>
			</div>
		</v-col>
		<comments />
    </v-container>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import comments from  '@/components/userView/comments/comments.vue';

  export default Vue.extend({
    name: 'userDefka',

	components: {
		comments
	},

    data: () => ({
		accept: false,
		date: '',
		dialog: false,
      valid: false,
      firstname: '',
      lastname: '7',
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
            mounted(){
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
