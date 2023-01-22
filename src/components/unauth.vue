<template>
    <v-container>
        <h1>Нет доступа!</h1>
        <v-container>
          <v-btn @click="goToMain()">Перейти на главную</v-btn>
        </v-container>
    </v-container>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'unauth',

  data: () => ({
  }),
  methods: {
    goToMain(){
      this.$router.push('/').catch(() => {});
    }
  }
});
</script>