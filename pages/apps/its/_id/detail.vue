<template>
    <div class="grey lighten-4 fill-height mb-16">
		<div class="primary pb-16">
			<v-container>
				<Head
					title="Mulai"
					:subtitle="detail.nama">
                    <div>
                        <v-btn
                            exact
                            small
                            class="white"
                            to="/apps/latihan">
                            <v-icon left>
                                mdi-chevron-left
                            </v-icon>
                            Kembali
                        </v-btn>
                    </div>
				</Head>
				<v-row class="mt-2">

				</v-row>
			</v-container>
		</div>
		<v-container class="mt-n16">
            <v-row
                v-if="detail.id">
                <v-col md="8">
                    <v-card outlined>
                        <v-card-title>
                            Soal
                            <v-spacer/>
                            {{ke+1}}/{{ detail.soal.length }}
                        </v-card-title>
                        <v-divider/>
                        <v-card-text>
                            <div
                                class="mb-4" 
                                v-html="soal.soal"/>
                            <div
                                v-for="(item, index) in soal.opsi"
                                :key="index">
                                <v-text-field
                                    persistent-placeholder
                                    outlined
                                    dense
                                    :prefix="`${item.label} = `"
                                    success
                                    append-icon="mdi-close-circle"/>
                            </div>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer/>
                            <v-btn class="primary">Check Jawaban</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
                <v-col md="4">
                    <v-card outlined>
                        <v-card-subtitle>Feedback</v-card-subtitle>
                        <v-divider/>
                        <v-card-text>
                            <p>Ini feedback</p>
                        </v-card-text>
                        <v-divider/>
                        <v-tabs
                            v-model="tab">
                            <v-tab>Hints</v-tab>
                            <!-- <v-tab>Chat Bot</v-tab> -->
                        </v-tabs>
                        <v-card-text>
                            <v-tabs-items v-model="tab">
                                <v-tab-item>
                                    <v-btn 
                                        v-if="hint===false"
                                        @click="hint=true"
                                        block>Lihat Hints</v-btn>
                                    <div
                                        v-if="hint">
                                        {{ soal.hint }}
                                    </div>
                                </v-tab-item>
                                <v-tab-item>
                                    Belum Tersedia
                                </v-tab-item>
                            </v-tabs-items>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>

            <v-card 
                v-else>
                <v-skeleton-loader
                    class="mx-auto"
                    type="article, table-heading"/>
            </v-card>
		</v-container>
	</div>
</template>
<script>
export default {
    layout:'apps',
	props: [ 'setConfirmation', 'setSnackbar', 'setFetching', 'access' ],
    asyncData: async function({ route }){

        return {
            tab:0,
            id: route.params.id,
            latihan_id: 1,
            ke:0,
            hint: false
        }
    },
    data: function(){
        return {
            isFetching:true,
            detail: {
                nama: '-'
            },
            soal: {}
        }
    },
    mounted: function(){
        this.handelLoadData()
    },
    methods: {
        handelLoadData: async function(){

            this.isFetching	= true
			let detail      = (await this.$api.$get(`/path/saya/${this.id}/latihan/${this.latihan_id}`)).data
            detail.soal     = detail.soal.map((item)=>{
                                    item.opsi   = JSON.parse(item.opsi)
                                    return item
                                })
            // detail.opsi     = JSON.parse(detail.opsi)
            if(detail.soal.length>0){
                this.soal   = detail.soal[this.ke]
            }
            this.detail     = detail
			this.isFetching	= false

        },
    }
}
</script>
