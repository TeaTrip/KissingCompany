<template>
    <div>
    <v-app-bar
      color="pink lighten-2"
      dark
    >
    <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title>Kissing company</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
        <v-container class="pink lighten-2 pimp__substrate" >
            <v-avatar size="64">
                <img
                    src="https://www.seekpng.com/png/detail/332-3321169_file-pimp-butters-angry-butters-south-park.png"
                    alt="Баттерс>"
                >
            </v-avatar>
            <p>
                {{name}}
            </p>
        </v-container>
        <v-list
        nav
        dense
        >
        <v-list-item-group
            v-model="group"
            active-class="deep-purple--text text--accent-4"
        >
            <v-list-item>
            <v-list-item-icon>
                <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Добавить дефку</v-list-item-title>
            </v-list-item>

            <v-list-item>
            <v-list-item-icon>
                <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Все дефки</v-list-item-title>
            </v-list-item>

            <v-list-item>
            <v-list-item-icon>
                <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Статистика</v-list-item-title>
            </v-list-item>
        </v-list-item-group>
        </v-list>
    </v-navigation-drawer>
    </div>
</template>

<script lang="ts">
  import Vue from 'vue'

  export default Vue.extend({
    name: 'pimp',

    data: () => ({
        drawer: false,
        group: null,
        name: 'Баттерс сточ'
    }),
    methods: {

    }
  })
</script>

<style lang="scss">
.pimp{
    &__substrate{
        height: 150px;
        display: block;
        padding: 7px !important;
        display: flex;
        flex-direction: column;
        align-content: stretch;
        justify-content: space-evenly;
        align-items: flex-start;
        padding-left: 20px;
        >p{
            margin:0 !important;
        }
    }
}
</style>
