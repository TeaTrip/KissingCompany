<template>
    <v-row class="pimp-add-defka__content" align="center"
      justify="center">
    <v-container fluid>
      <v-row dense>
        <v-col
          v-for="card in cards"
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
  export default Vue.extend({
    name: 'userAllDefki',

    data: () => ({
        cards: [
        { title: 'Барбара «Биби» Стивенс', src: 'https://southpark.cc-fan.tv/characters/10.jpg', flex: 6 },
        { title: 'Шелли Марш', src: 'https://southpark.cc-fan.tv/characters/14.jpg', flex: 6 },
        { title: 'Ребекка Котсвальд', src: 'https://southpark.cc-fan.tv/characters/19.jpg', flex: 6 },
        { title: 'Венди Тестабургер', src: 'https://southpark.cc-fan.tv/characters/7.jpg', flex: 6 },
        { title: 'Николь Дэниелс', src: 'https://e7.pngegg.com/pngimages/501/252/png-clipart-little-einstein-character-illustration-south-park-nichole-daniels-at-the-movies-cartoons.png', flex: 6 },
        { title: 'Хайди тёрнер', src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRH_QpXG6SD8-Xk5NJUevVfs6UC0CY6e7GWmRaLZM4dRo1tbxSdeu8xBVeVWBWtGY4vGmo&usqp=CAU', flex: 6 },
      ],
    }),

    methods: {
        openDefka(card: any){
            this.$emit('openDefka', card);
        }
    }
  })
</script>

<style lang="scss">

</style>
