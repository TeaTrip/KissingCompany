<template>
    <v-row class="pimp-add-defka__content" align="center"
      justify="center">
    <p>История заказов</p>
    <v-card
    max-width="400"
    class="mx-auto"
    >
        <v-container>
        <v-row dense>
            <v-col cols="12" v-for="(item, index) in items" :key="index">
                <v-card
                    :color="item.color"
                    dark
                >
                    <v-card-title class="text-h5">
                    {{item.date}}
                    </v-card-title>
                    <v-spacer></v-spacer>
                    <v-card-subtitle>Место:  {{item.place}}</v-card-subtitle>
                    <v-card-subtitle>Дефка:  {{item.service}}</v-card-subtitle>
                    <v-card-actions>
                      <v-btn
                        outlined
                        rounded
                        text
                      >
                        Оставить отзыв
                      </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
        </v-container>
    </v-card>
    </v-row>
</template>

<script lang="ts">
  import Vue from 'vue'
  export default Vue.extend({
    name: 'userHistory',

    data: () => ({
        items: [
        {
          color: '#1F7087',
          date: 'ПТ, 05 февраля 18:45',
          place: 'Кронверский просп. 49',
          service: 'Шелли марш',
        },
      ],
    }),
  })
</script>

<style lang="scss">

</style>
