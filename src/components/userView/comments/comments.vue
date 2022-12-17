<template>
    <v-col cols="12" md="12">
        <v-divider></v-divider>
        <p>Отзывы</p>

        <v-col v-for="comment in comments">
          <comment :name="comment.username" :text="comment.text" />
        </v-col>
    </v-col>
  </template>
  
  <script lang="ts">
    import Vue from 'vue'
    import comment from './comment.vue';
  
    export default Vue.extend({
        name: 'comments',
        components: {
          comment
        },
        
        data: () => ({
            comments: [
              {username: 'Kyle',
              text: 'Отличная дефка! Обнимается супер!'},
              {username: 'Erick Cartman',
              text: 'Всё понравилось! Лучше чем мама кайла'}
            ]
        }),
        methods: {
            mounted(){

            }
        },
                
        })
  </script>
  
  <style lang="scss">
  .user-comments{
    display: flex;
  }
  </style>
  