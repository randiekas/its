<template>
    <div class="grey lighten-4 fill-height mb-16">
		<div class="primary pb-16">
			<v-container>
				<Head
					title="Kelola"
					:subtitle="`Kelola ${detail.nama}`">
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
            <v-row>
                <v-col md="3">
                    <v-card outlined>
                        <v-card-title>Nomor Soal</v-card-title>
                        <v-divider/>
                        <v-card-text>
                            <v-btn 
                                v-for="(item, index) in detail.soal"
                                :key="index"
                                @click="handelSoalDipilih(index, item)"
                                rounded 
                                small 
                                :class="`mb-1 ${index===dipilih?'primary':''}`">{{ index+1 }}</v-btn>
                            <v-btn 
                                @click="handelTambahSoal"
                                block 
                                rounded 
                                class="secondary mt-2">
                                Tambah Soal
                            </v-btn>
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col md="9">
                    <v-card outlined>
                        <v-card-text>
                            <v-text-field
                                v-model="form.maksimal_percobaan"
                                persistent-placeholder
                                type="number"
                                label="Maksimal Percobaan Menjawab"/>
                            <v-textarea
                                persistent-placeholder
                                v-model="form.soal"
                                label="Soal"/>
                            <v-textarea
                                persistent-placeholder
                                v-model="form.hint"
                                label="Hint"/>
                            <p>Opsi Jawaban</p>
                            <v-divider class="mb-4"/>
                            <v-row 
                                v-for="(item, index) in form.opsi"
                                :key="index">
                                <v-col md="3">
                                    <v-text-field 
                                        v-model="item.label"
                                        label="Label"
                                        persistent-placeholder
                                        hide-details=""/>
                                </v-col>
                                <v-col md="3">
                                    <v-text-field 
                                        v-model="item.jawaban"
                                        label="Jawaban"
                                        persistent-placeholder
                                        hide-details=""/>
                                </v-col>
                                <v-col md="5">
                                    <v-text-field 
                                        v-model="item.feedback"
                                        label="Feedback"
                                        persistent-placeholder
                                        hide-details=""/>
                                </v-col>
                                <v-col md="1" class="d-flex" style="justify-content:'center'; align-items:center">
                                    <v-btn 
                                        @click="form.opsi.splice(index, 1)"
                                        icon>
                                        <v-icon>mdi-delete-circle</v-icon>
                                    </v-btn>
                                </v-col>
                            </v-row>
                            <div class="text-right mt-4">
                                <v-btn 
                                    @click="handelTambahOpsi"
                                    small
                                    rounded 
                                    outlined>
                                    Tambah Opsi
                                </v-btn>
                            </div>
                            <div class="text-right mt-4">
                                <v-btn 
                                    v-if="form.id!=undefined"
                                    @click="handelHapus"
                                    rounded>
                                    Hapus
                                </v-btn>
                                <v-btn 
                                    @click="handelSimpanForm"
                                    class="primary" 
                                    rounded>
                                    Simpan
                                </v-btn>
                            </div>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
		</v-container>
	</div>
</template>
<script>
export default {
    layout:'apps',
	props: [ 'setConfirmation', 'setSnackbar', 'setFetching' ],
    asyncData: async function({ route }){

        return {
            id: route.params.id,
        }
    },
    data: function(){
        return {
            tab: 0,
            detail: { nama:'-', soal: [] },
            dipilih: false,
            form: {}
        }
    },
    mounted: function(){
        this.handelLoadData()
    },
    methods: {
        handelLoadData: async function(){
            this.handelResetForm()
            this.isFetching	= true
			let detail	    = (await this.$api.$get(`/latihan/${this.id}`)).data
            detail.soal     = detail.soal.map((item)=>{
                                return {
                                    ...item,
                                    opsi: JSON.parse(item.opsi)
                                }
                                })
            this.detail     = detail
			this.isFetching	= false
        },
        handelTambahSoal: function(){
            this.dipilih    = false
            this.handelResetForm()
        },
        handelResetForm: function(){
            this.dipilih    = false
            this.form   = {
                maksimal_percobaan: 0,
                opsi: [],
                hint: "",
            }
            this.handelTambahOpsi()
        },
        handelTambahOpsi: function(){
            this.form.opsi.push(
                { 
                    label: '',
                    jawaban: '',
                    feedback: '',
                },
            )
        },
        handelSimpanForm: function(){
            this.setFetching(true)
            let payload     = Object.assign({}, this.form)
            payload.opsi    = JSON.stringify(payload.opsi)
            if(payload.id==undefined){
                this.$api.$post(`latihan/${this.id}/soal`, payload).then((resp)=>{
                    this.handelResetForm()
                    this.setFetching(false)
                    this.setSnackbar("Soal berhasil disimpan")
                    this.handelLoadData()
                })
            }else{
                this.$api.$put(`latihan/${this.id}/soal/${payload.id}`, payload).then((resp)=>{
                    this.handelResetForm()
                    this.setFetching(false)
                    this.setSnackbar("Soal berhasil disimpan")
                    this.handelLoadData()
                })
            }
            // this.dialog = false
        },
        handelSoalDipilih: function(index, item){
            this.dipilih    = index
            this.form       = Object.assign({}, item)
        },
        handelHapus: function(){
            this.setConfirmation({
                status: true,
                title: 'Konfirmasi',
                message: 'Apakah anda yakin ingin menghapus soal ini ?',
                handelOk: ()=>{
                    this.$api.$delete(`latihan/${this.id}/soal/${this.form.id}`).then((resp)=>{
                        this.setFetching(false)
                        this.setSnackbar("Soal berhasil dihapus")
                        this.handelLoadData()
                        this.handelResetForm()
                    })
                }
            })
        }
    }
}
</script>
