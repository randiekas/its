<template>
    <div class="grey lighten-4 fill-height mb-16">
		<div class="primary pb-16">
			<v-container>
				<Head
					title="Kelola"
					:subtitle="`Buat Latihan ${detail.nama}`">
                    <div>
                        <v-btn 
                            @click="handelSalin"
                            small 
                            class="white">
                            <v-icon left>
                                mdi-content-copy
                            </v-icon>
                            Salin Kode ITS
                        </v-btn>
                        <v-btn
                            @click="popup = true"
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
                            to="/apps/latihan-path">
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
                    <form @submit.prevent="handelSimpan">
                    <v-card>
                        <v-card-text
                            class="mb-3">
                            <v-text-field
                                required
                                label="Nama Latihan Path"
                                v-model="detail.nama"
                                persistent-placeholder/>
                            <v-radio-group v-model="detail.status">
                                <v-radio
                                    label="Aktif"
                                    :value="1"
                                ></v-radio>
                                <v-radio
                                    label="Tidak Aktif"
                                    :value="0"
                                ></v-radio>
                            </v-radio-group>
                            <v-btn
                                type="submit"
                                class="primary"
                                rounded
                                block>
                                Simpan
                            </v-btn>
                            <v-btn
                                class="mt-2"
                                outlined
                                rounded
                                block
                                @click="handelHapus">
                                Hapus
                            </v-btn>
                        </v-card-text>
                    </v-card>
                    </form>
                </v-col>
                <v-col 
                    v-if="detail.latihan.length>0"
                    md="9">
                    <v-card
                        v-for="(item, index) in detail.latihan"
                        :key="index"
                        outlined
                        class="mb-3">
                        <v-card-title>
                            {{ item.nama }}
                            <v-spacer/>
                            <v-btn 
                                small
                                outlined
                                @click="handelHapusLatihan(item.id)"
                                icon>
                                <v-icon>
                                    mdi-delete
                                </v-icon>
                            </v-btn>
                            <v-btn 
                                small
                                class="ml-2"
                                outlined
                                :to="`/apps/its/12/detail?path_latihan_id=${item.path_latihan_id}`">
                                <v-icon left>
                                    mdi-account-group-outline
                                </v-icon>
                                Review Soal
                            </v-btn>
                            <v-btn 
                                small
                                class="ml-2"
                                outlined
                                :to="`/apps/latihan-path/${id}/peserta?path_latihan_id=${item.path_latihan_id}`">
                                <v-icon left>
                                    mdi-account-group-outline
                                </v-icon>
                                Peserta
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
                                v-model="detail.jumlah_peserta"
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

        <v-dialog
			v-model="popup"
			persistent
			max-width="600px">
			<v-card>
				<v-card-title>
				</v-card-title>
				<v-card-text>
					<v-container>
                        <v-list dense>
                            <v-list-item-group
                                v-model="latihanDipilih"
                                multiple>
                                <template v-for="(item, index) in latihan">
                                <v-divider
                                    v-if="index"
                                    :key="`divider-${index}`"/>
                                <v-list-item
                                    :key="`item-${index}`"
                                    :value="item.id"
                                    active-class="deep-purple--text text--accent-4">
                                    <template v-slot:default="{ active }">
                                    <v-list-item-content>
                                        <v-list-item-title v-text="item.nama"></v-list-item-title>
                                    </v-list-item-content>
                                    <v-list-item-action>
                                        <v-checkbox
                                        :input-value="active"
                                        color="deep-purple accent-4"/>
                                    </v-list-item-action>
                                    </template>
                                </v-list-item>
                                </template>
                            </v-list-item-group>
                            </v-list>
					</v-container>
				</v-card-text>
				<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn
					color="blue darken-1"
					text
					@click="popup = false">
					Batal
				</v-btn>
				<v-btn
					color="blue darken-1"
					text
					@click="handelImport()">
					Import
				</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>

	</div>
</template>
<script>
export default {
    layout:'apps',
	props: [ 'setConfirmation', 'setSnackbar', 'setFetching', 'access', 'aesEncrypt' ],
    asyncData: async function({ route }){

        return {
            id: route.params.id
        }
    },
    data: function(){
        return {
            popup: false,
            isFetching:true,
			detail: { nama:'-' },
            items: [
                'Dog Photos',
                'Cat Photos',
                '',
                'Potatoes',
                'Carrots',
            ],
            latihan: [],
            latihanDipilih:[]
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

            this.latihan    = (await this.$api.$get(`latihan?page=0&size=10000`)).data.content
        },
        handelSimpan: function(){
            this.setFetching(true)
            this.$api.$put(`path/${this.id}`, {
                nama: this.detail.nama,
                status: this.detail.status,
            }).then((resp)=>{
                this.setSnackbar("Nama path berhasil diubah")
                this.setFetching(false)
            })
        },
        handelHapus: function(){
            this.setConfirmation({
                status: true,
                title: 'Konfirmasi',
                message: 'Apakah kamu yakin ingin menghapus Latihan topik ini ?',
                handelOk: ()=> {
                    this.setConfirmation({ status: false })
                    this.setFetching(true)
                    this.$api.$delete(`path/${this.id}`).then((resp)=>{
                        this.setSnackbar("latihan berhasil dihapus")
                        this.setFetching(false)
                        this.$router.push('/apps/latihan-path')
                    })
                }
            })
        },
        handelImport: function( item ){
            this.setFetching(true)
            this.$api.$post(`path/${this.id}/latihan`, {
                latihan_id: this.latihanDipilih
            }).then((resp)=>{
                this.popup  = false
                this.handelLoadData()
                this.setSnackbar("latihan berhasil ditambahkan")
                this.setFetching(false)
            })
        },

        handelHapusLatihan: function( id ){
            this.setConfirmation({
                status: true,
                title: 'Konfirmasi',
                message: 'Apakah kamu yakin ingin menghapus latihan ini ?',
                handelOk: ()=> {
                    this.setConfirmation({ status: false })
                    this.setFetching(true)
                    this.$api.$delete(`path/${this.id}/latihan/${id}`, {
                        latihan_id: this.latihanDipilih
                    }).then((resp)=>{
                        this.popup  = false
                        this.handelLoadData()
                        this.setSnackbar("latihan berhasil dihapus")
                        this.setFetching(false)
                    })
                }
            })
        },

        handelSalin: function(){
            navigator.clipboard.writeText(this.aesEncrypt(this.id));
            this.setSnackbar("Kode ITS Berhasil disalin")
        }

    }
}
</script>
