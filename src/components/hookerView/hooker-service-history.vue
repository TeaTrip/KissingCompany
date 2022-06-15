<template>
    <v-row class="pimp-add-defka__content" align="center"
      justify="center">
    <p>Записи за</p>
    <v-row justify="center">
        <v-date-picker v-model="picker"></v-date-picker>
    </v-row>
    <v-card v-if="picker"
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
                        <v-col cols="12" md="12">
                            <p>Клиент: {{item.client}}</p>
                            <p color="red darken-1">{{item.price}}</p>
                        </v-col>
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
    name: 'hooker-service-history',

    data: () => ({
        picker: '',
        items: [
        {
          color: '#1F7087',
          date: 'ПТ, 05 февраля 18:45',
          place: 'Кронверский просп. 49',
          service: 'Объятия',
          client: 'Иван васильевич',
          price: '200₽',
        },
        {
          color: '#1F7087',
          date: 'СБ, 06 февраля 18:45',
          place: 'Кронверский просп. 49',
          service: 'Поцелуй',
          client: 'Иван васильевич',
          price: '200₽',
        },
        {
          color: '#1F7087',
          date: 'ВС, 07 февраля 18:45',
          place: 'Кронверский просп. 49',
          service: 'Поцелуй (с языком)',
          client: 'Иван васильевич',
          price: '200₽',
        },
        {
          color: '#1F7087',
          date: 'ПН, 08 февраля 18:45',
          place: 'Лиговский просп. 22',
          service: 'Поцелуй (в щечку)',
          client: 'Иван васильевич',
          price: '200₽',
        },
        {
          color: '#1F7087',
          date: 'ВТ, 09 февраля 18:45',
          place: 'Невский просп. 47',
          service: 'Объятия',
          client: 'Иван васильевич',
          price: '200₽',
        },
        {
          color: '#1F7087',
          date: 'СР, 09 февраля 18:45',
          place: 'Кожевенная 18',
          service: 'Поцелуй (с языком)',
          client: 'Иван васильевич',
          price: '200₽',
        },
      ],
    }),

    methods: {
        changeDay(){
            this.items.forEach(item => {
                item.date = this.picker;
            })
            console.log(this.picker);
        }
    },

    watch: {
        picker: 'changeDay'
    }
  })
</script>

<style lang="scss">

</style>
