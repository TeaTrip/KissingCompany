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
        <v-container class="red darken-1 user__substrate" >
            <div class="user__avatar">
              <v-avatar size="64">
                  <v-img ratio="1"
                      src="https://upload.wikimedia.org/wikipedia/ru/4/4b/Kyle2.jpg"
                      alt="Венди>"
                  />
              </v-avatar>
              <div>
                <v-icon color="yellow">mdi-hand-coin</v-icon>
                <p>
                  slutCoins: {{slutCoins}} 
                </p>
              </div>
            </div>
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

            <v-list-item @click="selectMenuItem(2)">
            <v-list-item-icon>
                <v-icon>mdi-clipboard-text-clock</v-icon>
            </v-list-item-icon>
            <v-list-item-title>История заказов</v-list-item-title>
            </v-list-item>

            <v-list-item @click="selectMenuItem(4)">
            <v-list-item-icon>
                <v-icon>mdi-comment-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Отзывы о приложении</v-list-item-title>
            </v-list-item>

            <v-list-item @click="logout()">
            <v-list-item-icon>
                <v-icon>mdi-exit-run</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Выйти</v-list-item-title>
            </v-list-item>

        </v-list-item-group>
        </v-list>
    </v-navigation-drawer>
		<div class="user__content">
		</div>
		<v-container fill-height fluid class="user__content">
			<user-all-defki v-if="activePage == 1" @openDefka="open($event)"/>
      <user-defka v-if="activePage == 3" />
			<user-history v-if="activePage == 2" @openOrder="openOrder($event)" />
      <user-feedbacks v-if="activePage == 4" :username="nickname" />
      <user-history-detail v-if="activePage == 5" :bonusCount="slutCoins" @updateCoins="updateCoins()"/>
		</v-container>
    </div>
</template>

<script lang="ts">
  import { kissApi } from '@/api/authApi/kissApi';
import Vue from 'vue'
	import hookerMyPage from '../hookerView/hooker-my-page.vue';
  import hookerSchedule from '../hookerView/hooker-schedule.vue';
  import hookerServiceHistory from '../hookerView/hooker-service-history.vue';
  import userHistoryDetail from '@/components/userView/user-history-detail.vue'
  import userAllDefki from './user-all-defki.vue';
  import userDefka from './user-defka.vue';
  import userHistory from './user-history.vue';
  import userFeedbacks from './user-feedbacks.vue'

  export default Vue.extend({
    name: 'user',

		components: {
    hookerMyPage,
    hookerSchedule,
    userHistory,
    userAllDefki,
    userDefka,
    userFeedbacks,
    userHistoryDetail,
},

    data: () => ({
        drawer: false,
        group: null,
        name: 'Кайл Брофловски',
        nickname: '',
        defkaProps: {},
        slutCoins: 0,
    }),
    methods: {
			selectMenuItem(val: number){
        if (val === 1) {
          this.$router.push('/user/girls');
        } else if (val === 2) {
          this.$router.push('/user/history');
        }
        else if (val === 4) {
          this.$router.push('/user/appfeedback');
        }
				this.drawer = false;
			},
      open(e: any){
        this.defkaProps = {src: e.src, title: e.title};
        this.$router.push(`/user/girls/${e.id}`);
        console.log(e, e.src, e.title);
      },
      openOrder(e: any){
        console.log('is this work?')
        this.$router.push(`/user/history/${e}`);
      },
      logout(){
        this.$eventBus.$emit('logout');
      },
      async updateCoins(){
        const coins =  await kissApi.getKissApi().getSlutCoins();
        this.slutCoins = coins.slutCoins;
      }
    },
    computed: {
      activePage() {
        switch(true) {
            case this.$route.path === '/user/girls': return 1;
            case /\/user\/girls\/\d+/.test(this.$route.path): return 3;
            case this.$route.path === '/user/history': return 2;
            case this.$route.path === '/user/appfeedback': return 4;
            case /\/user\/history\/\d+/.test(this.$route.path): return 5;
            default: return 0;
        }
      }
    },
    async mounted() {
      const res = await kissApi.getKissApi().login();
      this.name = `${res.firstName} ${res.secondName}`;
      this.nickname = res.username;
      this.updateCoins();
    }
  })
</script>

<style lang="scss">
.user{
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
  &__avatar {
    display: grid;
    grid-template-columns: 5fr 3fr;
  }
}
</style>
