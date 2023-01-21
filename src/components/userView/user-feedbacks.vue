<template>
  <v-col cols="12" md="12">
      <v-container>
        <v-textarea v-model="feedback" label="Оставьте свой отзыв"></v-textarea>
        <v-container class="rating">
          <v-icon v-for="n in 5" :key="n" @mouseover="hover(n)" @click="select(n)" :color="getColor(n)">
            mdi-heart
          </v-icon>
        </v-container>
        <v-btn @click="sendFeedback()">Отправить</v-btn>
      </v-container>
      <v-divider></v-divider>
      <p>Отзывы о приложении</p>


      <v-col v-for="comment in comments">
        <comment :name="comment.username" :text="comment.comment" :stars="parseInt(comment.stars)" />
      </v-col>
  </v-col>
</template>

<script lang="ts">
  import { kissApi } from '@/api/authApi/kissApi';
  import Vue from 'vue'
  import comment from './comments/comment.vue';

  export default Vue.extend({
      name: 'userFeedbacks',
      components: {
        comment
      },
      props: {
          username: {
            type: String,
            required: true,
          }
        },
      data: () => ({
          selected: 0,
          hovering: 0,
          heartColor: ['#ccc', '#ccc', '#ccc', '#ccc', '#ccc'],
          selectedHearts: 0,
          feedback: '',
          comments: [
            {username: 'Kyle',
            comment: 'Отличная дефка! Обнимается супер!',
            stars: '5',
            },
            {username: 'Erick Cartman',
            comment: 'Всё понравилось! Лучше чем мама кайла',
            stars: '5',
            }
          ]
      }),
      methods: {
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
        sendFeedback() {
          const obj = {
            stars: this.selected.toString(),
            comment: this.feedback,
          }
          this.comments.push({...obj, username: this.username});
          kissApi.getKissApi().postAppFeedback(obj);
          this.selected = 0;
          this.feedback = '';
        },
        async updateFeedbacks(){
          const res = await kissApi.getKissApi().getAppFeedbacks();
          this.comments = res;
        }
      },
      mounted(){
        this.updateFeedbacks()
        
      }
      
              
      })
</script>

<style lang="scss">
.user-comments{
  display: flex;
}
</style>
