<template>
    <div>
    <v-app-bar
      color="red darken-1"
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
        <v-container class="red darken-1 pimp__substrate" >
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
            <v-list-item @click="selectMenuItem(1)">
            <v-list-item-icon>
                <v-icon>mdi-account-plus-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Добавить дефку</v-list-item-title>
            </v-list-item>

            <v-list-item @click="selectMenuItem(2)">
            <v-list-item-icon>
                <v-icon>mdi-account-multiple-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Все дефки</v-list-item-title>
            </v-list-item>

            <v-list-item @click="selectMenuItem(3)">
            <v-list-item-icon>
                <v-icon>mdi-chart-line</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Статистика</v-list-item-title>
            </v-list-item>
        </v-list-item-group>
        </v-list>
    </v-navigation-drawer>
		<div class="pimp__content">
		</div>
		<v-container fill-height fluid class="pimp__content">
			<pimp-add-defka v-if="activePage == 1" />
			<pimp-all-defki v-if="activePage == 2" />
			<pimp-statistics v-if="activePage == 3" />
		</v-container>
    </div>
</template>

<script lang="ts">
  import Vue from 'vue'
	import pimpAddDefka from './pimp-add-defka.vue'
	import pimpAllDefki from './pimp-all-defki.vue';
	import pimpStatistics from './pimp-statistics.vue';

  export default Vue.extend({
    name: 'pimp',

		components: {
    pimpAddDefka,
		pimpAllDefki,
		pimpStatistics
  },

    data: () => ({
        drawer: false,
        group: null,
        name: 'Баттерс сточ',
				activePage: 0,
    }),
    methods: {
			selectMenuItem(index: number){
				this.activePage = index;
				this.drawer = false;
			}
    }
  })
</script>

<style lang="scss">
.pimp{
		&__content{
			padding: 10px 15px;
		}
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
