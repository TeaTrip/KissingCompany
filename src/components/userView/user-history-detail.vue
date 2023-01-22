<template>
  <v-row class="pimp-add-defka__content" align="center"
    justify="center">
      <v-container>
      <v-row dense>
          <v-col cols="12">
              <v-card-title class="text-h5">
              {{date}}
              </v-card-title>
              <v-spacer></v-spacer>
              <v-col cols="12" md="12" >
                <div class="user-history-detailed__info">
                  <h3>Место:</h3>
                  <h3>{{place}}</h3>
                  <h3>Дефка:</h3>
                  <h3>{{girlname}}</h3>
                  <h3>Цена:</h3>
                  <h3>{{totalCost}}</h3>
                  <h3>Статус:</h3>
                  <h3>{{status}}</h3>
                  <h3>Телефон:</h3>
                  <h3>{{telephone}}</h3>
                </div>
              </v-col>
              <!-- <v-card-subtitle>Место:  {{place}}</v-card-subtitle>
              <v-card-subtitle>Дефка:  {{girlname}}</v-card-subtitle>
              <v-card-subtitle>Цена:  {{totalCost}}</v-card-subtitle>
              <v-card-subtitle>Статус:  {{status}}</v-card-subtitle> -->
              <v-divider></v-divider>
              <v-container v-if="status == 'ENDED' && !isComment">
                <v-textarea v-model="feedback" label="Оставьте свой отзыв"></v-textarea>
                <v-container class="rating">
                  <v-icon v-for="n in 5" :key="n" @mouseover="hover(n)" @click="select(n)" :color="getColor(n)">
                    mdi-heart
                  </v-icon>
                </v-container>
                <v-btn @click="setFeedbackToOrder(orderId)">Отправить</v-btn>
              </v-container>
              <comment v-if="isComment" :name="username" :text="comment" :stars="stars" />
              <v-container v-if="status == 'CREATED' && !linkToPayment">
                <p>Вам необходимо оплатить заказ!</p>
                <v-container v-if="bonusCount > 0">
                  <p>Минимальная сумма оплаты при использовании бонусов = 1</p>
                  <p>1 slutCoin = 1 рублю</p>  
                  <h4>Количество slutCoin'ов: {{bonusCount}}</h4>
                  <p>Сколько потратить?</p> 
                  <v-slider
                    v-model="bonusToSpend"
                    :min="0"
                    step="0.1"
                    :max="bonusCount > totalCost ? totalCost - 1 : bonusCount"
                    thumb-color="red"
                    thumb-label="always"
                  ></v-slider>
                </v-container>
                <h3>Итого к оплате: {{totalCost - bonusToSpend}}</h3>
                <v-divider></v-divider>
                <v-container>
                  <v-btn @click="getLinkToPay()">Получить ссылку на оплату</v-btn>
                </v-container>
              </v-container>
              <v-container v-if="status == 'CREATED' && linkToPayment">
                <v-container>
                  <p>Вам необходимо перейти по ссылке и произвести оплату, после чего вернуться на эту страницу</p>
                  <div>
                    <a :href="linkToPayment" target="_blank">ссылка на оплату </a>
                  </div>
                </v-container>
                <v-divider></v-divider>
                <v-container>
                  <p>Если вы оплатили и статус заказа не стал APPROVED, пожалуйста нажмите на кнопку</p>
                  <v-btn @click="checkPayment()">Я оплатил</v-btn>
                </v-container>
              </v-container>
              <v-container v-if="status == 'APPROVED'">
                <v-btn @click="startOrder(orderId)">
                  Дефка начала выполнять заказ
                </v-btn>
              </v-container>

              <v-container v-if="status == 'STARTED'">
                <v-btn @click="endOrder(orderId)">
                  Завершить
                </v-btn>
              </v-container>
          </v-col>
      </v-row>
    </v-container>

  </v-row>
</template>

<script lang="ts">
import Vue from 'vue'
import { kissApi } from '@/api/authApi/kissApi'
import comment from '@/components/userView/comments/comment.vue'
import { link } from 'fs';

export default Vue.extend({
  name: 'userHistoryDetail',
  components: {
    comment
  },
  props: {
    bonusCount: {
      type: Number,
      required: true
    }
  },
  data: () => ({
      orderId: 0,
      selected: 0,
      hovering: 0,
      heartColor: ['#ccc', '#ccc', '#ccc', '#ccc', '#ccc'],
      selectedHearts: 0,
      feedbackDialog: false,
      myLogin: '',
      serviceId: '',
      feedback: '',
      id: '',
      girlid: '',
      color: '',
      date: '',
      place: '',
      girlname: '',
      totalCost: 0,
      bonusToSpend: 0,
      status: '',
      telephone: '',
      billId: '',
      payedChecked: false,
      linkToPayment: 'https://ru.stackoverflow.com/questions/208624/',
      comment: '',
      username: '',
      stars: '',
      isComment: false,
  }),
  methods: {
    async getLinkToPay() {
      try{
        const res = await kissApi.getKissApi().getPaymentLink(this.orderId, this.bonusToSpend)
        this.billId = res.billId
        this.linkToPayment = res.paymentUrl
      }
      catch(e: any){
        console.log('error in getLinkToPay()', e)
      }
      
    },
    async endOrder(id: number){
      const res = await kissApi.getKissApi().endServiceById(id);
      if(res.status === 200){
        this.status = 'ENDED';
      }
    },
    async startOrder(id: number){
      const res = await kissApi.getKissApi().startServiceById(id);
      if(res.status === 200){
        this.status = 'STARTED';
      }
    },
    async setFeedbackToOrder(id: number){
      const obj = {
        service_history_id: this.orderId,
        stars: this.selected,
        comment: this.feedback
      }
      const res = await kissApi.getKissApi().postGirlFeedback(obj);
      this.isComment = true;
      this.comment = res.comment;
      this.stars = res.stars;
      this.username = res.username;
      this.feedbackDialog = false;
      this.hovering = 0;
      this.selected = 0;
      this.feedback = '';
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
    async main() {
      const id = this.$route.params.id;
      this.orderId = parseInt(id);
      const info = await kissApi.getKissApi().getServiceById(this.orderId);
      let date = new Date(info.startDt);
      let dateString = date.toISOString().slice(0, 19).replace('T', ' ').substring(0, 16);
      this.id = info.id;
      this.color = '#1F7087';
      this.girlid = info.girlDto.id;
      this.place = info.girlDto.location;
      this.girlname = info.girlDto.nikname;
      this.totalCost = info.totalCost;
      this.status = info.status;
      this.date = dateString;
      this.telephone = info.girlDto.telephone
      this.billId = info?.paymentTokensDto?.billId
      this.linkToPayment = info?.paymentTokensDto?.paymentUrl
      this.comment = info?.feedbackDto?.comment;
      this.stars = info?.feedbackDto?.stars;
      this.username = info.clientDto.username;
      this.isComment = info.feedbackDto;
    },
    async checkPayment() {
      if(this.billId && this.status == 'CREATED'){
        this.payedChecked = true;
        try{
          const res = await kissApi.getKissApi().checkPayment(this.billId);
          if(res) {
            this.status = res.status;
            this.$emit('updateCoins');
          }
        }
        catch(e: any){
          console.log('payment error', e);
        }
      }
    }
  },
  async mounted() {
    await this.main()
    if(this.status == 'CREATED'){
      window.addEventListener('focus', this.checkPayment)
    }
  },
  watch: {
  '$route.params.id': function (newVal, oldVal) {
    console.log(`The id has changed from ${oldVal} to ${newVal}`)
    this.main()
  }
}
})
</script>

<style lang="scss">
.user-history-detailed{
	&__info {
		display: grid;
		grid-template-columns: min-content auto;
		justify-items: start;
    grid-gap: 5px;
	}
}
</style>
