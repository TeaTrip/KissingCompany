<template>
  <div>
    <h1 v-if="accept">Успешно!</h1>
    <v-container v-else>
      <v-row>
        <v-col cols="12" md="12" >
            <v-img
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="300px"
              width="400px"
              contain
              :src="avatarSrc"
            >
              <v-card-title v-text="nickname"></v-card-title>
            </v-img>
        </v-col>
        <v-col cols="12" md="12">
          <h3>Возраст</h3>
          <v-text-field v-model="age"></v-text-field>
          <h3>Рост</h3>
          <v-text-field v-model="height"></v-text-field>
          <h3>Цвет волос</h3>
          <v-text-field v-model="hairColor"></v-text-field>
          <h3>Национальность</h3>
          <v-text-field v-model="nation"></v-text-field>
          <h3>Телефон</h3>
          <v-text-field v-model="telephone"></v-text-field>
          <h3>Вес</h3>
          <v-text-field v-model="weight"></v-text-field>
          <h3>Адрес</h3>
          <v-text-field v-model="location"></v-text-field>
        </v-col>
        <v-col cols="12" md="12">
          <p>Предоставляемые услуги</p>
          <v-divider></v-divider>
        </v-col>
        <v-list>
          <v-list-item v-for="price, index in prices" :key="price.id">
            <v-text-field v-model="price.label" label="Название"></v-text-field>
            <v-text-field v-model="price.cost" label="Цена"></v-text-field>
            <!-- <v-icon @click="deletePrice(index)">mdi-delete</v-icon> -->
          </v-list-item>
        </v-list>
        <v-col cols="12" md="12">
					<div class="hooker-registration__buttons">
						<v-btn class="hooker-registration__grid" style="grid-column: 2/3" color="error" @click="addNewService()">Добавить новую услугу</v-btn>
					</div>
				</v-col>
        <v-col cols="12" md="12">
          <p>Фотографии</p>
          <v-divider></v-divider>
        </v-col>
        <v-carousel :height="500" :width="400" :hide-delimiters="false" :cycle="true">
          <v-carousel-item v-for="(photo, index) in photos" :key="index">
            <v-img :height="500" :width="400" contain :src="photo.src"></v-img>
          </v-carousel-item>
        </v-carousel>
        <v-col cols="12" md="12" v-if="role === 'HOOKER'">
          <v-file-input
            accept="image/*"
            v-model="avatar"
            label="Аватар профиля"
            placeholder="Аватар профиля"
            prepend-icon="mdi-camera"
          ></v-file-input>
        </v-col>
        <v-col cols="12" md="12" v-if="role === 'HOOKER'">
            <v-file-input
              v-model="photosToUpload"
              accept="image/*"
              label="Добавьте несколько фотографий"
              placeholder="Другие фотографии"
              multiple
              prepend-icon="mdi-camera"
            ></v-file-input>
          </v-col>
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
import { BlobOptions } from 'buffer';

  export default Vue.extend({
    name: 'hookerMyPage',

    data: () => ({
        girlId: 0,
        dialog: false,
        avatar: null,
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
        avatarSrc: '',
        prices: [] as {isNew: boolean, label: string, id: number, cost: number}[],
        photos: [] as {src: string}[],
        photosToUpload: [],
        role: 'HOOKER',
    }),
    methods: {
      deletePrice(index: number) {
        if(!this.prices[index].isNew){
          this.deletedIds.push(this.prices[index].id);
        }
        this.prices.splice(index, 1);
      },
      addNewService(){
        let serviceObj = {
          cost: 0,
          label: '',
          isNew: true,
          id: 0,
        };
        this.prices.push(serviceObj);
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
          if(price.isNew){
            kissApi.getKissApi().createPrice(obj);
          }
          else {
            kissApi.getKissApi().updatePrice(price.id, obj);
          }
        }
        for(const id of this.deletedIds){
          kissApi.getKissApi().deletePrice(id);
        }

        if(this.avatar && this.role === 'HOOKER'){
          let photos = await kissApi.getKissApi().getGirlPhotosById(this.girlId, true);
          if(photos.length){
            await kissApi.getKissApi().deletePhotoById(photos[0].id);
          }
          const formData = new FormData();
          formData.append('image', this.avatar);
          await kissApi.getKissApi().postGirlPhoto(formData, true);
          photos = await kissApi.getKissApi().getGirlPhotosById(this.girlId, true);
          if(photos.length){
            this.avatarSrc = await kissApi.getKissApi().getPhoto(photos[0].id);
          }
          this.$emit('updateAvatar', this.avatarSrc);
        }
        if(this.photosToUpload.length && this.role === 'HOOKER'){
          for(const photo of this.photosToUpload){
            const formData = new FormData();
            formData.append('image', photo)
            await kissApi.getKissApi().postGirlPhoto(formData);
          }
          this.updatePhotos();
        }
      },
      addService(){

      },
      async updatePhotos(){
        const photos = await kissApi.getKissApi().getGirlPhotosById(this.girlId);
        for(const photo of photos){
          const src = await kissApi.getKissApi().getPhoto(photo.id);
          this.photos.push({src: src})
        }
      }
    },
    async mounted(){
      this.role = kissApi.getRole();
      let id = 0;
      if(this.$route.params.id){
        id = parseInt(this.$route.params.id);
        const res = await kissApi.getKissApi().getDefka(id);
      }else{
        const response = await kissApi.getKissApi().getGirlSelf();
        id = parseInt(response.id);
      }

      this.girlId = id;

      const photos = await kissApi.getKissApi().getGirlPhotosById(this.girlId, true);
      if(photos.length){
        this.avatarSrc = await kissApi.getKissApi().getPhoto(photos[0].id);
      }

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
            isNew: false,
						label: price.serviceName,
            cost: price.cost,
						id: price.id,
					}
					this.prices.push(obj);
				}
			});
      this.updatePhotos();
		},
  })
</script>

<style lang="scss">

</style>
