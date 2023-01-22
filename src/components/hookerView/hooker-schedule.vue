<template>
    <v-row class="pimp-add-defka__content" align="center"
      justify="center">
    <p>Предстоящие записи</p>
    <v-select v-model="selectedPeriod" :items="periods" label="Период"></v-select>
    <v-card
    max-width="400"
    class="mx-auto"
    v-if="filteredOrder.length"
    >
        <v-container>
        <v-row dense>
            <v-col cols="12" v-for="(item, index) in filteredOrder" :key="index">
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
                    <v-card-subtitle>Статус:  {{item.status}}</v-card-subtitle>
                    <v-col cols="12" md="12">
                      <p>Клиент: {{item.client}}</p>
                      <p color="red darken-1">{{item.price}}</p>
                    </v-col>
                </v-card>
            </v-col>
        </v-row>
        </v-container>
    </v-card>
    <v-container v-else >
      <h1>Записей за выбранный период нет</h1>
    </v-container>
    </v-row>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { kissApi } from '@/api/authApi/kissApi';

  export default Vue.extend({
    name: 'hookerSchedule',

    data: () => ({
        picker: '',
        selectedPeriod: 'Сегодня',
        periods: ['Сегодня', 'Текущая неделя', 'Текущий месяц'],
        items: [
        {
          id: '',
          status: '',
          color: '#1F7087',
          timestamp: '',
          date: 'ПТ, 05 февраля 18:45',
          place: 'Кронверский просп. 49',
          service: 'Объятия',
          client: 'Иван васильевич',
          price: '200₽',
        },
      ],
    }),

    methods: {
        changeDay(){
          console.log(this.picker);
        },

    },
    async mounted(){
      this.items = [];
      const defka = await kissApi.getKissApi().getGirlSelf();
      const service = await kissApi.getKissApi().getAllServicesForDefkaById(defka.id);
      for(const info of service){
        if(info.status !== 'APPROVED' && info.status !== 'ENDED'){
          const [price, user] = await Promise.all([
            kissApi.getKissApi().getPriceById(info.serviceId),
            kissApi.getKissApi().getUserByUsername(info.username)
          ]);
          let date = new Date(info.startDt);
          let dateString = date.toISOString().slice(0, 19).replace('T', ' ').substring(0, 16);
          const obj = {
            id: info.id,
            status: info.status,
            color: '#1F7087',
            timestamp: info.startDt,
            date: dateString,
            place: defka.location,
            service: price.serviceName,
            client: `${user.firstName} ${user.secondName}`,
            price: `${info.totalCost}₽`,
          }
          this.items.push(obj);
        }
      }
    },
    computed: {
      filteredOrder(){
        console.log('selectedperiod', this.selectedPeriod, this.items)
        switch (this.selectedPeriod) {
          case 'Сегодня':
            return this.items.filter(item => {
              const itemDate = new Date(item.timestamp);
              const today = new Date();
              return itemDate.getDate() === today.getDate() &&
                    itemDate.getMonth() === today.getMonth() &&
                    itemDate.getFullYear() === today.getFullYear();
            });
          case 'Текущая неделя':
          console.log('CurWeek', this.items);
            return this.items.filter(item => {
              const itemDate = new Date(item.timestamp);
              const today = new Date();
              const startWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());
              const endWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);
              return itemDate >= startWeek && itemDate <= endWeek;
            });
          case 'Текущий месяц':
            return this.items.filter(item => {
              const itemDate = new Date(item.timestamp);
              const today = new Date();
              return itemDate.getMonth() === today.getMonth() &&
                    itemDate.getFullYear() === today.getFullYear();
            });
          default:
            return this.items;
        }
      }
    },
    watch: {
        picker: 'changeDay'
    }
  })
</script>

<style lang="scss">

</style>
