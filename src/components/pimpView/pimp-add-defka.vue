<template>

    <v-row class="pimp-add-defka__content" align="center"
      justify="center">
            <v-dialog
        v-model="dialog"
        max-width="290"
        >
        <v-card>
            <v-card-title class="text-h5">
            Вы уверены?
            </v-card-title>
            <v-spacer></v-spacer>
            <v-card-text>Текущая ссылка станет не действительна</v-card-text>
            <v-card-actions justify="center">
                <v-spacer></v-spacer>
                <v-btn
                    color="error"
                    text
                    @click="dialog = false"
                >
                    Отмена
                </v-btn>
                <v-btn
                    color="error"
                    text
                    @click="drop()"
                >
                    Подтвердить
                </v-btn>
            </v-card-actions>
        </v-card>
        </v-dialog>
        <v-col>
            <p class="text-center">
            Отправьте эту ссылку дефкам <br> для добавления их в <br> ваш гарем  
            </p>
            <div>
                <v-row align-content="center">
                    <v-text-field v-model="inviteLink" label="Ссылка для приглашения"  readonly>
                        <v-btn
                        slot="append"
                        icon
                        color="red darken-1"
                        @click="copyToClipBoard()"
                        >
                            <v-icon>mdi-clipboard-check</v-icon>
                        </v-btn>
                    </v-text-field>
                </v-row>
            </div>
    
            <div class="pimp-add-defka__buttons">
                <v-btn class="pimp-add-defka__grid" style="grid-column: 2/3" color="error" @click="generate()">Сгенерировать</v-btn>
                <v-btn class="pimp-add-defka__grid" style="grid-column: 2/3" color="error" @click="send()">Отправить</v-btn>
            </div>
        </v-col>
        <v-col>
            <p class="text-center">
                Активные ссылки
            </p>
            <v-row align-content="center" v-for="(token,index) in tokens">
                <div class="pimp-add-defka__links">
                    <h5>
                        {{`${origin}/hooker-registration/${token.invateToken}`}}
                    </h5>
                    <v-btn
                        slot="append"
                        icon
                        color="red darken-1"
                        @click="deleteLink(index)"
                        >
                        <v-icon>mdi-delete</v-icon>
                    </v-btn>
                </div>
            </v-row>
        </v-col>
    </v-row>

</template>

<script lang="ts">
  import { kissApi } from '@/api/authApi/kissApi';
import Vue from 'vue'
  export default Vue.extend({
    name: 'pimpAddDefka',

    data: () => ({
        dialog: false,
        inviteLink: '',
        tokens: [{invateToken: ''}],
        origin: '',
    }),
    methods: {
        send(){
            const shareData = {
                title: 'Регистрация дефки',
                text: 'Зарегестрировалась быстро, дефка!',
                url: this.inviteLink,
            }
            navigator.share(shareData)
        },
        drop(){
            this.dialog = false;
            //call api drop

            //call api get new link
            const res = 'https://vk.com';
            this.inviteLink = res;

        },
        copyToClipBoard(){
            const elem = document. createElement('textarea');
            elem.value = this.inviteLink;
            document.body.appendChild(elem);
            elem.select();
            document.execCommand('copy');
            document.body. removeChild(elem);
        },
        async generate(){
            const token = await kissApi.getKissApi().getInviteLink();
            const result = this.origin + '/hooker-registration/' + token.invateToken
            this.inviteLink = result
        },
        deleteLink(id: number) {
            kissApi.getKissApi().deleteInviteLink(this.tokens[id].invateToken);
            this.tokens.splice(id,1);
        }
    },
    async mounted(){
        //req to api to get link
        this.origin = window.location.origin
        const res = '';
        this.inviteLink = res;
        this.tokens = await kissApi.getKissApi().getInviteLinks()
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
    &__links {
        display: grid;
        grid-template-columns: auto min-content;
    }

}
</style>
