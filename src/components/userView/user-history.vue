<template>
    <v-row class="pimp-add-defka__content" align="center"
      justify="center">
    <v-dialog v-model="feedbackDialog" max-width="400">
      <v-card>
        <v-container>
          <v-textarea v-model="feedback" label="Оставьте свой отзыв"></v-textarea>
          <v-container class="rating">
            <v-icon v-for="n in 5" :key="n" @mouseover="hover(n)" @click="select(n)" :color="getColor(n)">
              mdi-heart
            </v-icon>
          </v-container>
          <v-btn @click="setFeedbackToOrder(serviceId)">OK</v-btn>
          <v-btn @click="feedbackDialog = false">Отмена</v-btn>
        </v-container>
      </v-card>
    </v-dialog>
    <p>История заказов</p>
    <v-card max-width="400" class="mx-auto" v-if="items.length" >
        <v-container>
        <v-row dense>
            <v-col cols="12" v-for="(item, index) in items" :key="index">
                <v-card :color="item.color" dark>
                    <v-card-title class="text-h5">
                    {{item.date}}
                    </v-card-title>
                    <v-spacer></v-spacer>
                    <v-card-subtitle>Место:  {{item.place}}</v-card-subtitle>
                    <v-card-subtitle>Дефка:  {{item.girlname}}</v-card-subtitle>
                    <v-card-subtitle>Цена:  {{item.totalCost}}</v-card-subtitle>
                    <v-card-subtitle>Статус:  {{item.status}}</v-card-subtitle>
                    <v-card-actions>
                      <v-btn
                        outlined
                        rounded
                        text
                        @click="openOrder(item.id)"
                      >
                        Подробнее
                      </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
        </v-container>
    </v-card>
    <h2 v-else>Пока нет заказов, можно выбрать дефку на странице 'Все дефки'</h2>
    </v-row>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { kissApi } from '@/api/authApi/kissApi'

  export default Vue.extend({
    name: 'userHistory',

    data: () => ({
        selected: 0,
        hovering: 0,
        heartColor: ['#ccc', '#ccc', '#ccc', '#ccc', '#ccc'],
        selectedHearts: 0,
        feedbackDialog: false,
        myLogin: '',
        serviceId: '',
        feedback: '',
        girlid: '',
        items: [
        {
          id: '',
          girlid: '',
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
        const obj = {
          girl_id: this.girlid,
          stars: this.selected,
          comment: this.feedback
        }
        kissApi.getKissApi().postGirlFeedback(obj);
        this.feedbackDialog = false;
      },
      openDialog(id: string){
        this.hovering = 0;
        this.selected = 0;
        this.girlid = id;
        this.feedback = '';
        this.feedbackDialog = true;
      },
      hover(n: number) {
        if (n > this.selected) {
          this.hovering = n
        }
      },
      select(n: number) {
        this.selected = n
        this.hovering = 0
      },
      getColor(n: number) {
        if (n <= this.selected) {
          return 'red'
        } else if (n <= this.hovering) {
          return 'red'
        } else {
          return 'grey'
        }
      },
      openOrder(id: string) {
        console.log('this try emit');
        this.$emit('openOrder', id);
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
          girlid: info.girlDto.id,
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
