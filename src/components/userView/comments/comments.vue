<template>
    <v-col cols="12" md="12">
        <v-divider></v-divider>
        <p>Отзывы</p>
        <v-col v-for="comment in comments">
          <comment :name="comment.username" :text="comment.comment" :stars="comment.stars" />
        </v-col>
    </v-col>
  </template>
  
  <script lang="ts">
    import { kissApi } from '@/api/authApi/kissApi';
import Vue from 'vue'
    import comment from './comment.vue';
  
    export default Vue.extend({
        name: 'comments',
        components: {
          comment
        },
        props: {
          girlId: {
            type: Number,
            required: true
          }
        },
        data: () => ({
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
            
        },
        computed: {
          async girls() {
            const res = await kissApi.getKissApi().getFeedbackByGirlId(this.girlId);
            console.log(res);
            this.comments = res;
          }
        },
        async mounted(){
          const res = await kissApi.getKissApi().getFeedbackByGirlId(this.girlId);
          console.log(res);
          this.comments = res;
        }
                
        })
  </script>
  
  <style lang="scss">
  .user-comments{
    display: flex;
  }
  </style>
  