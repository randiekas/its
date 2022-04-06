<template>
    <div class="grey lighten-4 fill-height mb-16">
		<div class="primary pb-16">
			<v-container>
				<Head
					title="Kelola"
					:subtitle="`Buat Latihan ${detail.nama}`">
                    <div>
                        <v-btn
                            exact
                            small
                            class="white">
                            <v-icon left>
                                mdi-import
                            </v-icon>
                            Import Latihan Soal
                        </v-btn>
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
            <v-row v-if="isFetching" class="mb-8">
				<v-col sm="3">
					<v-card>
						<v-skeleton-loader
							class="mx-auto"
							type="article, table-heading"/>
					</v-card>
				</v-col>
				<v-col sm="9">
					<v-card>
						<v-skeleton-loader
							class="mx-auto"
							type="article, table-heading"/>
					</v-card>
				</v-col>
            </v-row>
            <v-row v-else>
                <v-col md="3">
                    <v-card>
                        <v-card-text
                            class="mb-3">
                            <v-text-field
                                label="Nama Latihan Path"
                                v-model="detail.nama"
                                persistent-placeholder/>
                            <v-btn
                                class="primary"
                                rounded
                                block
                                @click="handelSimpan">
                                Simpan
                            </v-btn>
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col 
                    v-if="detail.latihan.length>0"
                    md="9">
                    <v-card
                        v-for="(item, index) in detail.latihan"
                        :key="index"
                        outlined
                        hover
                        :to="`/apps/latihan-path/${id}/peserta?id_latihan=${item.id}`"
                        class="mb-3">
                        <v-card-title>
                            {{ item.nama }}
                            <v-spacer/>
                            <v-btn outlined>
                                <v-icon>
                                    mdi-delete
                                </v-icon>
                            </v-btn>
                        </v-card-title>
                        <v-card-subtitle class="d-flex">
                            <v-text-field
                                disabled
                                label="Minimum Benar"
                                persistent-placeholder
                                hide-details=""
                                v-model="item.minimun_benar"
                                type="number"/>
                            <v-text-field
                                disabled
                                label="Jumlah Soal"
                                persistent-placeholder
                                hide-details=""
                                v-model="item.jumlah_soal"
                                type="number"/>
                            <v-text-field
                                disabled
                                label="Jumlah Peserta"
                                persistent-placeholder
                                hide-details=""
                                v-model="item.jumlah_peserta"
                                type="number"/>
                        </v-card-subtitle>
                    </v-card>
                </v-col>
                <v-col 
                    v-else
                    md="9">
                    <v-alert
                        type="info">
                        Latihan belum di set, silahkan import latihan soal terlebih dahulu
                    </v-alert>
                </v-col>
            </v-row>
		</v-container>
	</div>
</template>
<script>
export default {
    layout:'apps',
	props: [ 'setConfirmation', 'setSnackbar', 'setFetching', 'access' ],
    asyncData: async function({ route }){

        return {
            id: route.params.id
        }
    },
    data: function(){
        return {
            isFetching:true,
			detail: { nama:'-' }
        }
    },
    mounted: function(){
        this.handelLoadData()
    },
    methods: {
        handelLoadData: async function(){
            this.isFetching	= true
			this.detail	    = (await this.$api.$get(`/path/${this.id}`)).data
			this.isFetching	= false
        },
        handelSimpan: function( item ){
            this.setFetching(true)
            this.$api.$put(`path/${this.id}`, {
                nama: this.detail.nama
            }).then((resp)=>{
                this.setSnackbar("Nama path berhasil diubah")
                this.setFetching(false)
            })
        },

    }
}
</script>
