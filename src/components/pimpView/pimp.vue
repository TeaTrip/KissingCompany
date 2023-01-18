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

            <!-- <v-list-item @click="selectMenuItem(3)">
            <v-list-item-icon>
                <v-icon>mdi-chart-line</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Статистика</v-list-item-title>
            </v-list-item> -->

            <v-list-item @click="logout()">
            <v-list-item-icon>
                <v-icon>mdi-exit-run</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Выйти</v-list-item-title>
            </v-list-item>
        </v-list-item-group>
        </v-list>
    </v-navigation-drawer>
		<div class="pimp__content">
		</div>
		<v-container fill-height fluid class="pimp__content">
			<pimp-add-defka v-if="activePage == 1" />
			<pimp-all-defki v-if="activePage == 2" @openDefka="open($event)"/>
      <hooker-my-page v-if="activePage == 3"/>
			<pimp-statistics v-if="activePage == 4" />
		</v-container>
    </div>
</template>

<script lang="ts">
  import Vue from 'vue'
	import pimpAddDefka from './pimp-add-defka.vue'
	import pimpAllDefki from './pimp-all-defki.vue';
	import pimpStatistics from './pimp-statistics.vue';
  import hookerMyPage from '@/components/hookerView/hooker-my-page.vue'

  export default Vue.extend({
    name: 'pimp',

		components: {
    pimpAddDefka,
		pimpAllDefki,
		pimpStatistics,
    hookerMyPage,
  },

    data: () => ({
        drawer: false,
        group: null,
        name: 'Баттерс сточ',
				activePage: 0,
        defkaProps: {},
    }),
    methods: {
      logout(){
        this.$eventBus.$emit('logout');
      },
      selectMenuItem(val: number){
        if (val === 1) {
          this.activePage = 1;
          this.$router.push('/pimp/invite');
        } else if (val === 2) {
          this.activePage = 2;
          this.$router.push('/pimp/girls');
        }
				this.drawer = false;
			},
      open(e: any){
        this.defkaProps = {src: e.src, title: e.title};
        this.$router.push(`/pimp/girls/${e.id}`);
        this.activePage = 3;
        console.log(e, e.src, e.title);
      },
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
