<template>
    <v-row class="pimp-add-defka__content" align="center"
      justify="center">
    <v-btn
        :color="filter ? 'grey' : 'error'"
        text
        @click="filter = !filter"
    >
        {{ filter ? "Скрыть фильтр" : "Показать фильтр"}}
    </v-btn>
    
    <v-container fluid>
      <v-row dense>
        <v-container v-if="filter">
          <v-select v-model="selectedLocation" :items="locations" label="Адрес"></v-select>
          <v-select v-model="selectedAge" :items="ages" label="Возраст"></v-select>
          <v-select v-model="selectedHeight" :items="heights" label="Рост"></v-select>
          <v-select v-model="selectedWeight" :items="weights" label="Вес"></v-select>
          <v-select v-model="selectedNation" :items="nations" label="Национальность"></v-select>
          <v-select v-model="selectedHairColor" :items="hairColors" label="Цвет волос"></v-select>  
        </v-container>
        <v-col
          v-for="card in filteredGirls"
          :key="card.title"
          :cols="card.flex"
        >
          <v-card>
            <v-img
              contain
              :src="card.src"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
              @click="openDefka(card)"
            >
              <v-card-title v-text="card.title"></v-card-title>
            </v-img>

            <v-card-actions>
                <p align="center">{{card.stars}}/5 звёзд</p>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    </v-row>
</template>

<script lang="ts">
  import { kissApi } from '@/api/authApi/kissApi';
import Vue from 'vue'
  export default Vue.extend({
    name: 'userAllDefki',

    data: () => ({
      blonde: false,
      brunet: false,
      shaten: false,
      from: '',
      to: '',
      selectedLocation: '',
      selectedAge: '',
      selectedHeight: '',
      selectedWeight: '',
      selectedNation: '',
      selectedHairColor: '',
      weights: ['Не выбрано'],
      nations: ['Не выбрано'],
      hairColors: ['Не выбрано'],
      locations: ['Не выбрано'],
      ages: ['Не выбрано'],
      heights: ['Не выбрано'],
      hugs: false,
      kissLight: false,
      kissWithTongue: false,
      filter: false,
      filters: [],
      cards: [] as any[],
      cardsReserve: [{title: 's', src: 's', flex: 6}],
    }),

    methods: {
      openDefka(card: any){
          this.$emit('openDefka', card);
      },
    },
    async mounted() {
      const res = await kissApi.getKissApi().getAllDefki();
      for(const defka of res){
        defka.weight && this.weights.push(defka.weight);
        defka.nation && this.nations.push(defka.nation);
        defka.hair_color && this.hairColors.push(defka.hair_color);
        defka.location && this.locations.push(defka.location);
        defka.age && this.ages.push(defka.age);
        defka.height && this.heights.push(defka.height);
        const rating = await kissApi.getKissApi().getAvgRatingById(defka.id);
        const avatar = await kissApi.getKissApi().getGirlPhotosById(defka.id, true)
        let avatarSrc = ''
        if(avatar.length){
          avatarSrc = await kissApi.getKissApi().getPhoto(avatar[0].id);
        }
        this.cards.push({...defka, title: defka.nikname, src: avatarSrc, stars: rating, flex:6, id: defka.id})
      }
    },
    computed: {
      filteredGirls() {
        return this.cards.filter(girl => {
          if (this.selectedLocation && this.selectedLocation !== 'Не выбрано' && (girl as any).location !== this.selectedLocation) {
            return false;
          }
          if (this.selectedAge && this.selectedAge !== 'Не выбрано' && (girl as any).age !== this.selectedAge) {
            return false;
          }
          if (this.selectedHeight && this.selectedHeight !== 'Не выбрано' && (girl as any).height !== this.selectedHeight) {
            return false;
          }
          if (this.selectedWeight && this.selectedWeight !== 'Не выбрано' && (girl as any).weight !== this.selectedWeight) {
            return false;
          }
          if (this.selectedNation && this.selectedNation !== 'Не выбрано' && (girl as any).nation !== this.selectedNation) {
            return false;
          }
          if (this.selectedHairColor && this.selectedHairColor !== 'Не выбрано' && (girl as any).hair_color !== this.selectedHairColor) {
            return false;
          }
          return true;
        });
      }
    }
  })
</script>

<style lang="scss">

</style>
