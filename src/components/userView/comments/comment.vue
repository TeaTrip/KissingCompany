<template>
    <div class="user-comment">
      <v-card
        elevation="2"
        outlined
      >
        <v-card-title>{{name}}</v-card-title>
        <v-card-text>{{text}}</v-card-text>
        <v-card-text>Оценка: {{stars}}/5</v-card-text>
      </v-card>
    </div>
  </template>
  
  <script lang="ts">
    import Vue from 'vue'
  
    export default Vue.extend({
        name: 'comment',
        props: {
          name: String,
          text: String,
          stars: Number,
        },
        data: () => ({
            
        }),
        methods: {
            
        },
                
        })
  </script>
  
  <style lang="scss">
  .user-comment{

  }
  </style>
  