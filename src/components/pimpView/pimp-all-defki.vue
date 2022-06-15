<template>
    <v-row class="pimp-add-defka__content" align="center"
      justify="center">
        <p>
            Страница находится в разработке
        </p>
    </v-row>

</template>

<script lang="ts">
  import Vue from 'vue'
  export default Vue.extend({
    name: 'pimpAllDefki',

    data: () => ({
    }),
    methods: {
    },
    mounted(){

    }
  })
</script>

<style lang="scss">
.pimp-add-defka{
    &__content{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
    }
    &__buttons {
        display: grid;
        grid-template-columns: 1fr min-content 1fr;
        grid-row-gap: 10px;
    }
    &__grid {
        grid-column: 1/2;
    }
}
</style>
