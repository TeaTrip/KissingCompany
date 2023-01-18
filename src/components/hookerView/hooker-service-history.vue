<template>
    <v-row class="pimp-add-defka__content" align="center"
      justify="center">
    <p>Записи за</p>
    <v-row justify="center">
        <v-date-picker v-model="picker"></v-date-picker>
    </v-row>
    <v-card v-if="picker && filteredOrder.length"
    max-width="400"
    class="mx-auto"
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
  import { kissApi } from '@/api/authApi/kissApi';
import Vue from 'vue'
  export default Vue.extend({
    name: 'hooker-service-history',

    data: () => ({
        picker: '',
        items: [
        {
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
        }
    },
    async mounted(){
      this.items = [];
      const defka = await kissApi.getKissApi().getGirlSelf();
      const service = await kissApi.getKissApi().getAllServicesForDefkaById(defka.id);
      for(const info of service){
        const [price, user] = await Promise.all([
          kissApi.getKissApi().getPriceById(info.serviceId),
          kissApi.getKissApi().getUserByUsername(info.username)
        ]);
        let date = new Date(info.startDt);
        let dateString = date.toISOString().slice(0, 19).replace('T', ' ').substring(0, 16);
        const obj = {
          color: '#1F7087',
          timestamp: info.startDt,
          date: dateString,
          place: defka.location,
          service: price.serviceName,
          client: `${user.firstName} ${user.secondName}`,
          price: `${info.totalCost}$`,
        }
        this.items.push(obj);
      }
    },
    computed: {
      filteredOrder(){
        return this.items.filter(item => {
        const orderDate = new Date(item.timestamp);
        const pickerDate = new Date(this.picker);
        return (
          orderDate.getDate() === pickerDate.getDate() &&
          orderDate.getMonth() === pickerDate.getMonth() &&
          orderDate.getFullYear() === pickerDate.getFullYear()
        );
      })}
    },
    watch: {
        picker: 'changeDay'
    }
  })
</script>

<style lang="scss">

</style>
