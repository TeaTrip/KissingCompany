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
          <!-- <v-col cols="12" md="12">
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
            <p>Цена</p>
            <v-divider></v-divider>
          </v-col>

          <v-col cols="12" md="12">
            <v-row justify="space-between">
              <v-text-field
                v-model="from"
                type="number"
                label="От"
            ></v-text-field>
            <v-text-field
                v-model="to"
                type="number"
                label="До"
            ></v-text-field>
          </v-row>

          <v-col cols="12" md="12">
            <p>Внешние черты</p>
            <v-divider></v-divider>
          </v-col>

          <v-col cols="12" md="12">
            <v-checkbox
              v-model="blonde"
              label="Блондинки"
              color="primary"
              value="primary"
              hide-details
            ></v-checkbox>
          </v-col>

          <v-col cols="12" md="12">
            <v-checkbox
              v-model="brunet"
              label="Брюнетки"
              color="primary"
              value="primary"
              hide-details
            ></v-checkbox>
          </v-col>

          <v-col cols="12" md="12">
            <v-checkbox
              v-model="shaten"
              label="Шатенки"
              color="primary"
              value="primary"
              hide-details
            ></v-checkbox>
          </v-col> -->
          <!-- <template v-for="filter in filters">
            <v-col cols="12" md="12">
              <v-col class="d-flex" cols="12">
                <v-select
                :items="availableTimes"
                v-model="time"
                label="Свободное время"
                ></v-select>
              </v-col>
            </v-col>
          </template> -->

          <v-select v-model="selectedLocation" :items="locations" label="Адрес"></v-select>
          <v-select v-model="selectedAge" :items="ages" label="Возраст"></v-select>
          <v-select v-model="selectedHeight" :items="heights" label="Рост"></v-select>
          <v-select v-model="selectedWeight" :items="weights" label="Вес"></v-select>
          <v-select v-model="selectedNation" :items="nations" label="Национальность"></v-select>
          <v-select v-model="selectedHairColor" :items="hairColors" label="Цвет волос"></v-select>


          <!-- <v-btn
            :color="'error'"
            text
            @click="applyFilter()"
          >
            {{"Применить"}}
          </v-btn> -->

          
        </v-container>
        <v-col
          v-for="card in filteredGirls"
          :key="card.title"
          :cols="card.flex"
        >
          <v-card>
            <v-img
              :src="card.src"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
              @click="openDefka(card)"
            >
              <v-card-title v-text="card.title"></v-card-title>
            </v-img>

            <v-card-actions>
                <p align="center">4.5/5</p>
              <v-spacer></v-spacer>

              <v-btn icon>
                <v-icon>mdi-heart</v-icon>
              </v-btn>

              <v-btn icon>
                <v-icon>mdi-bookmark</v-icon>
              </v-btn>

              <v-btn icon>
                <v-icon>mdi-share-variant</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    </v-row>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { kissApi } from '@/api/authApi/kissApi'
  
  export default Vue.extend({
    name: 'pimpAllDefki',

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
      cards: [
        { title: '', src: '', flex: 6 },
        // { title: 'Шелли Марш', src: 'https://southpark.cc-fan.tv/characters/14.jpg', flex: 6 },
        // { title: 'Ребекка Котсвальд', src: 'https://southpark.cc-fan.tv/characters/19.jpg', flex: 6 },
        // { title: 'Венди Тестабургер', src: 'https://southpark.cc-fan.tv/characters/7.jpg', flex: 6 },
        // { title: 'Николь Дэниелс', src: 'https://e7.pngegg.com/pngimages/501/252/png-clipart-little-einstein-character-illustration-south-park-nichole-daniels-at-the-movies-cartoons.png', flex: 6 },
        // { title: 'Хайди тёрнер', src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRH_QpXG6SD8-Xk5NJUevVfs6UC0CY6e7GWmRaLZM4dRo1tbxSdeu8xBVeVWBWtGY4vGmo&usqp=CAU', flex: 6 },
      ],
      cardsReserve: [{title: 's', src: 's', flex: 6}],
    }),

    methods: {
      openDefka(card: any){
          this.$emit('openDefka', card);
      },
      applyFilter(){
        this.filter = false;
        this.cardsReserve = this.cards;
        this.cards = this.cards.slice(1,3);
      }
    },
    async mounted() {
      const res = await kissApi.getKissApi().getAllDefki();
      
      const obj = res.map(defka => {
        defka.weight && this.weights.push(defka.weight);
        defka.nation && this.nations.push(defka.nation);
        defka.hair_color && this.hairColors.push(defka.hair_color);
        defka.location && this.locations.push(defka.location);
        defka.age && this.ages.push(defka.age);
        defka.height && this.heights.push(defka.height);
        return {...defka, title: defka.nikname, src: defka.telephone, flex:6, id: defka.id}
      });
      this.cards = obj;
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
.pimp-add-defka{
    &__content{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
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
