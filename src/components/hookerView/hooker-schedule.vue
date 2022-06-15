<template>
    <v-row class="pimp-add-defka__content" align="center"
      justify="center">
    <p>Предстоящие записи</p>
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
                    <v-card-subtitle>Услуга:  {{item.service}}</v-card-subtitle>
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
    name: 'hookerSchedule',

    data: () => ({
        items: [
        {
          color: '#1F7087',
          date: 'ПТ, 05 февраля 18:45',
          place: 'Кронверский просп. 49',
          service: 'Объятия',
        },
        {
          color: '#1F7087',
          date: 'СБ, 06 февраля 18:45',
          place: 'Кронверский просп. 49',
          service: 'Поцелуй',
        },
        {
          color: '#1F7087',
          date: 'ВС, 07 февраля 18:45',
          place: 'Кронверский просп. 49',
          service: 'Поцелуй (с языком)',
        },
        {
          color: '#1F7087',
          date: 'ПН, 08 февраля 18:45',
          place: 'Лиговский просп. 22',
          service: 'Поцелуй (в щечку)',
        },
        {
          color: '#1F7087',
          date: 'ВТ, 09 февраля 18:45',
          place: 'Невский просп. 47',
          service: 'Объятия',
        },
        {
          color: '#1F7087',
          date: 'СР, 09 февраля 18:45',
          place: 'Кожевенная 18',
          service: 'Поцелуй (с языком)',
        },
      ],
    }),
  })
</script>

<style lang="scss">

</style>
