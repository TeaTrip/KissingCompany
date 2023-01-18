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
                    <v-card-subtitle>Дефка:  {{item.girlname}}</v-card-subtitle>
                    <v-card-subtitle>Цена:  {{item.totalCost}}</v-card-subtitle>
                    <v-card-subtitle>Статус:  {{item.status}}</v-card-subtitle>
                    <v-card-actions v-if="item.status == 'ENDED'">
                      <v-btn
                        outlined
                        rounded
                        text
                        @click="setFeedbackToOrder(item.id)"
                      >
                        Оставить отзыв
                      </v-btn>
                    </v-card-actions>
                    <v-card-actions v-if="item.status == 'APPROVED'">
                      <v-btn
                        outlined
                        rounded
                        text
                        @click="startOrder(item.id)"
                      >
                        Дефка начала выполнять заказ
                      </v-btn>
                    </v-card-actions>
                    <v-card-actions v-if="item.status == 'CREATED'">
                      <v-btn
                        outlined
                        rounded
                        text
                        @click="payOrder(item.id)"
                      >
                        Оплатить
                      </v-btn>
                    </v-card-actions>
                    <v-card-actions v-if="item.status == 'STARTED'">
                      <v-btn
                        outlined
                        rounded
                        text
                        @click="endOrder(item.id)"
                      >
                        Завершить
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
  import { kissApi } from '@/api/authApi/kissApi'

  export default Vue.extend({
    name: 'userHistory',

    data: () => ({
        myLogin: '',
        items: [
        {
          id: '',
          color: '#1F7087',
          date: 'ПТ, 05 февраля 18:45',
          place: 'Кронверский просп. 49',
          girlname: 'Шелли марш',
          totalCost: 0,
          status: '',
        },
      ],
    }),
    methods: {
      async endOrder(id: string){
        console.log('id',id);
        const res = await kissApi.getKissApi().endServiceById(parseInt(id));
        if(res.status === 200){
          this.items = this.items.map(item => {
            if(item.id === id){
              item.status = 'ENDED';
            }
            return {...item}
          });  
        }
      },
      async startOrder(id: string){
        const res = await kissApi.getKissApi().startServiceById(parseInt(id));
        if(res.status === 200){
          this.items = this.items.map(item => {
              if(item.id === id){
                item.status = 'STARTED';
              }
              return {...item}
            }); 
        }
      },
      async payOrder(id: string){
        const res = await kissApi.getKissApi().approveServiceById(parseInt(id));
        if(res.status === 200){
          this.items = this.items.map(item => {
              if(item.id === id){
                item.status = 'APPROVED';
              }
              return {...item}
            }); 
        }
      },
      async setFeedbackToOrder(id: string){

      }
    },
    async mounted() {
      this.items = [];
      const mySelf = await kissApi.getKissApi().login();
      this.myLogin = mySelf.username;
      const history = await kissApi.getKissApi().getAllServicesForClienByLogin(this.myLogin);
      for (const service of history) {
        const info = await kissApi.getKissApi().getServiceById(service.id);
        let date = new Date(info.startDt);
        let dateString = date.toISOString().slice(0, 19).replace('T', ' ').substring(0, 16);
        const obj = {
          id: info.id,
          color: '#1F7087',
          place: info.girlDto.location,
          girlname: info.girlDto.nikname,
          totalCost: info.totalCost,
          status: service.status,
          date: dateString,
        }
        this.items.push(obj);
      }
      console.log(history);
    }
  })
</script>

<style lang="scss">

</style>
