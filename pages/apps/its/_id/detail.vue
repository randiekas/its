<template>
    <div class="grey lighten-4 fill-height mb-16">
		<div class="primary pb-16">
			<v-container>
				<Head
					:title="detail.nama"
					subtitle="Riwayat Pengerjaan">
                    <div>
                        <v-btn
                            exact
                            small
                            class="white"
                            :to="`/apps/its/${$route.params.id}/mulai?path_latihan_id=${$route.query.path_latihan_id}`">
                            <v-icon left>
                                mdi-play
                            </v-icon>
                            Mulai
                        </v-btn>
                        <v-btn
                            exact
                            small
                            class="white"
                            @click="handelKembali">
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
            <v-row v-if="isFetching" class="mb-8">
				<v-col sm="12">
					<v-card>
						<v-skeleton-loader
							class="mx-auto"
							type="article, table-heading"/>
					</v-card>
				</v-col>
				<v-col sm="12">
					<v-card>
						<v-skeleton-loader
							class="mx-auto"
							type="article, table-heading"/>
					</v-card>
				</v-col>
                <v-col sm="12">
					<v-card>
						<v-skeleton-loader
							class="mx-auto"
							type="article, table-heading"/>
					</v-card>
				</v-col>
			</v-row>
            <v-alert
                v-if="detail.riwayat.length==0">
                Tidak ada riwayat pengerjaan, silahkan mulai
            </v-alert>
            <v-card
                v-for="(item, index) in detail.riwayat"
                :key="index"
                hover
                :to="`/apps/its/${id}/hasil?path_latihan_id=${item.path_latihan_id}&path_latihan_akun_id=${item.id}`"
                :disabled="item.status==0"
                outlined class="mb-3">
                <v-card-title>
                    Percobaan ke {{ index+1 }}
                    <v-spacer/>
                    <v-btn
                        v-if="item.nilai"
                        text>
                        Nilai: {{ item.nilai }}
                    </v-btn>
                    <v-btn text>
                        Minimum benar: {{ detail.minimun_benar }}
                    </v-btn>
                    <v-btn text>
                        Soal: {{ detail.jumlah_soal }}
                    </v-btn>
                    <v-icon>
                        mdi-chevron-right
                    </v-icon>
                </v-card-title>
            </v-card>
		</v-container>
	</div>
</template>
<script>
export default {
    layout:'apps',
	props: [ 'setConfirmation', 'setSnackbar', 'setFetching', 'access', 'tipe' ],
    asyncData: async function({ route }){
        return {
            id: route.params.id,
            path_latihan_id:route.query.path_latihan_id,
        }
    },
    data: function(){
        return {
            isFetching:true,
            detail: {
                riwayat: []
            },
            soal: {},
            sub: 0,
            tab:0,
            ke:0,
            hint: false,
            ikonStatus: {
                0: 'mdi-close-circle',
                1: 'mdi-check-decagram',
                'undefined': '',
            },
            feedback: '',
        }
    },
    mounted: function(){
        this.handelLoadData()
    },
   
    methods: {
        handelLoadData: async function(){

            this.isFetching	= true
			let detail      = (await this.$api.$get(`/path/saya/${this.id}/latihan/${this.path_latihan_id}/all`)).data
            this.detail     = detail
			this.isFetching	= false

        },

            
        handelKembali: function(){
            if(this.tipe=='guru'){
                window.history.back()
            }else{
                this.$router.push(`/apps/its/${this.id}`)
            }
        }
    }
}
</script>
<style>
figure img{
    max-width: 100%;
}
.v-btn__content p{
    margin-bottom: 0px;
}

.v-btn.v-size--small{
    height: auto!important;
    min-height: 28px!important;
}
</style>