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
                <v-img ratio="1"
                    src="https://upload.wikimedia.org/wikipedia/ru/4/4b/Kyle2.jpg"
                    alt="Венди>"
                />
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
                <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Все дефки</v-list-item-title>
            </v-list-item>

            <v-list-item @click="selectMenuItem(3)">
            <v-list-item-icon>
                <v-icon>mdi-clipboard-text-clock</v-icon>
            </v-list-item-icon>
            <v-list-item-title>История заказов</v-list-item-title>
            </v-list-item>

        </v-list-item-group>
        </v-list>
    </v-navigation-drawer>
		<div class="pimp__content">
		</div>
		<v-container fill-height fluid class="pimp__content">
			<user-all-defki v-if="activePage == 1" @openDefka="open($event)"/>
      <user-defka v-if="activePage == 10" />
			<hooker-schedule v-if="activePage == 2" />
      <hooker-service-history v-if="activePage == 3"/>
		</v-container>
    </div>
</template>

<script lang="ts">
  import Vue from 'vue'
	import hookerMyPage from '../hookerView/hooker-my-page.vue';
  import hookerSchedule from '../hookerView/hooker-schedule.vue';
  import hookerServiceHistory from '../hookerView/hooker-service-history.vue';
  import userAllDefki from './user-all-defki.vue';
  import userDefka from './user-defka.vue'

  export default Vue.extend({
    name: 'user',

		components: {
    hookerMyPage,
    hookerSchedule,
    hookerServiceHistory,
    userAllDefki,
    userDefka,
  },

    data: () => ({
        drawer: false,
        group: null,
        name: 'Кайл Брофловски',
				activePage: 0,
        defkaProps: {},
    }),
    methods: {
			selectMenuItem(index: number){
				this.activePage = index;
				this.drawer = false;
			},
      open(e: any){
        this.defkaProps = {src: e.src, title: e.title};
        this.activePage = 10;
        console.log(e, e.src, e.title);
        console.log('something')}
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
