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
			<v-text-field v-model="age"></v-text-field>
			</v-card>
			<v-card
			class="d-flex justify-space-around mb-6"
			flat
			tile
			>
			<h3>Рост:</h3>
			<v-text-field v-model="height"></v-text-field>
			</v-card>
			<v-card class="d-flex justify-space-around mb-6" flat tile>
				<h3>Цвет волос:</h3>
				<v-text-field v-model="hairColor"></v-text-field>
			</v-card>
			<v-card class="d-flex justify-space-around mb-6" flat tile>
				<h3>Национальность:</h3>
				<v-text-field v-model="nation"></v-text-field>
			</v-card>
			<v-card class="d-flex justify-space-around mb-6" flat tile>
				<h3>Телефон:</h3>
				<v-text-field v-model="telephone"></v-text-field>
			</v-card>
      <v-card class="d-flex justify-space-around mb-6" flat tile>
				<h3>Вес:</h3>
				<v-text-field v-model="weight"></v-text-field>
			</v-card>
      <v-card class="d-flex justify-space-around mb-6" flat tile>
				<h3>Адрес:</h3>
				<v-text-field v-model="location"></v-text-field>
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


      <v-list>
        <v-list-item v-for="price in prices" :key="price.id">
          <v-text-field v-model="price.label" label="Название"></v-text-field>
          <v-text-field v-model="price.cost" label="Цена"></v-text-field>
          <v-icon @click="deletePrice(price.id)">mdi-delete</v-icon>
        </v-list-item>
      </v-list>
      <!-- <v-col cols="12" md="12">

        <v-btn class="user-defka__grid"  color="error" @click="addService()">Добавить услугу</v-btn>

      </v-col> -->
			<!-- <v-container
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
			</v-container> -->
    <v-col cols="12" md="12">

      <v-btn class="user-defka__grid"  color="error" @click="save()">Сохранить</v-btn>

    </v-col>
    </v-row>
    </v-container>
    
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { kissApi } from '@/api/authApi/kissApi';
  export default Vue.extend({
    name: 'hookerMyPage',

    data: () => ({
        girlId: 0,
        dialog: false,
        inviteLink: '',
        age: 0,
        height: 0,
        weight: 0,
        hairColor: '',
        nation: '',
        telephone: '',
        location: '',
        accept: false,
        date: '',
        nickname: '',
        valid: false,
        selectedPrice: 0,
        deletedIds: [] as number[],

        prices: [] as { isWanted: boolean, label: string, id: number, cost: number}[],
    }),
    methods: {
      deletePrice(id: number) {
        this.deletedIds.push(id);
        this.prices = this.prices.filter(price => price.id !== id);
      },
      async save() {
        const obj = 
          {
          location: this.location,
          age: this.age,
          height: this.height,
          weight: this.weight,
          nation: this.nation,
          telephone: this.telephone,
          hair_color: this.hairColor,
        }
        
        kissApi.getKissApi().updateGirl(this.girlId, obj)
        for(const price of this.prices){
          let obj = {
            cost: (price as any).cost,
            serviceName: (price as any).label,
            girlId: this.girlId,
            isCostPerHour: false,
            estimatedDurationInMin: 0,
          }
          const res = await kissApi.getKissApi().updatePrice(price.id, obj);
        }
      },
      addService(){

      },

    },
    async mounted(){
      let id = 0;
      if(this.$route.params.id){
        id = parseInt(this.$route.params.id);
        const res = await kissApi.getKissApi().getDefka(id);
      }else{
        const response = await kissApi.getKissApi().getGirlSelf();
        id = parseInt(response.id);
      }

      this.girlId = id;
			const res = await kissApi.getKissApi().getDefka(id);
			if(res){
				this.age = res.age;
				this.height = res.height;
        this.weight = res.weight;
        this.location = res.location;
				this.hairColor = res.hair_color;
				this.nation = res.nation;
				this.telephone = res.telephone;
				this.nickname = res.nikname;
			};
			const result = await kissApi.getKissApi().getPrices();
			result.forEach(price => {
				if(price.girlId == id){
					const obj = {
						isWanted: false,
						label: price.serviceName,
            cost: price.cost,
						id: price.id,
					}
					this.prices.push(obj);
				}
			})
		},
  })
</script>

<style lang="scss">

</style>
