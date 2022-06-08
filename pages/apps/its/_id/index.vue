<template>
    <div class="grey lighten-4 fill-height mb-16">
		<div class="primary pb-16">
			<v-container>
				<Head
					:title="detail.path.nama"
					subtitle="Untuk bisa mengikuti ujian selanjutnya, kamu harus menjawab minimum jumlah benar">
                    <div>
                        <v-btn
                            exact
                            small
                            class="white"
                            to="/apps/beranda">
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
            <template
                v-if="detail.id">
                <v-card
                    v-for="(item, index) in detail.path.latihan"
                    :key="index"
                    hover
                    @click="handelKlikDetail(index, item)"
                    outlined class="mb-3">
                    <v-card-title>
                        {{ item.nama }}
                        <v-spacer/>
                        <v-btn
                            v-if="item.hasil.nilai"
                            text>
                            Nilai: {{ item.hasil.nilai }}
                        </v-btn>
                        <v-btn text>
                            Minimum benar: {{ item.minimun_benar }}
                        </v-btn>
                        <v-btn text>
                            Soal: {{ item.jumlah_soal }}
                        </v-btn>
                        <v-btn text icon large>
                            <v-icon
                                v-if="index==0 && item.hasil.nilai==undefined">
                                mdi-lock-open-variant
                            </v-icon>
                            <v-icon
                                v-else-if="index==0 && item.hasil.nilai!=undefined"
                                color="green">
                                mdi-check-decagram
                            </v-icon>
                            <v-icon
                                v-else-if="detail.path.latihan[index-1].hasil.nilai>=detail.path.latihan[index-1].minimun_benar">
                                mdi-lock-open-variant
                            </v-icon>
                            <v-icon
                                v-else>
                                mdi-lock
                            </v-icon>
                        </v-btn>
                    </v-card-title>
                </v-card>
            </template>
		</v-container>
	</div>
</template>
<script>
export default {
    layout:'apps',
	props: [ 'setConfirmation', 'setSnackbar', 'setFetching', 'access' ],
    asyncData: async function({ route }){
        // const id    = this.aesDecrypt(route.params.id)
        return {
            id: route.params.id
        }
    },
    data: function(){
        return {
            isFetching:true,
			detail: { path:{nama: '-', jumlah_latihan: '-'}, }
        }
    },
    mounted: function(){
        this.handelLoadData()
    },
    methods: {
        handelLoadData: async function(){
            this.isFetching	= true
			this.detail	    = (await this.$api.$get(`/path/saya/${this.id}`)).data
			this.isFetching	= false
        },
        handelKlikDetail: function(index, item){
            if(item.hasil.jumlah_benar!=undefined){
                this.setConfirmation({
                    status: true,
                    title: 'Oops!',
                    message: 'Kamu sudah mengikuti latihan ini, silahkan ikuti latihan selanjutnya',
                    handelOk: ()=> this.setConfirmation({ status: false })
                })
                return
            }else if(index>0){
                const sebelumnya    = this.detail.path.latihan[index-1]
                if(sebelumnya.hasil.jumlah_benar==undefined){
                    this.setConfirmation({
                        status: true,
                        title: 'Oops!',
                        message: 'Kamu belum mengikuti latihan sebelumnya',
                        handelOk: ()=> this.setConfirmation({ status: false })
                    })
                    return
                }
                else if(sebelumnya.hasil.jumlah_benar<sebelumnya.minimun_benar){
                    this.setConfirmation({
                        status: true,
                        title: 'Oops!',
                        message: 'Jumlah benar di latihan sebelumnya tidak memenuhi nilai minimum',
                        handelOk: ()=> this.setConfirmation({ status: false })
                    })
                    return
                }
            }
            this.$router.push(`/apps/its/${this.id}/detail?path_latihan_id=${item.path_latihan_id}`)
        }
    }
}
</script>
