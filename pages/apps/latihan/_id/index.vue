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

                    <v-card outlined class="mb-4">
                        <v-card-text>
                            <v-text-field
                                v-model="form.maksimal_percobaan"
                                persistent-placeholder
                                type="number"
                                label="Maksimal Percobaan Menjawab"
                                hide-details=""/>
                        </v-card-text>
                    </v-card>

                    <v-card outlined class="mb-4">
                        <v-card-title>Soal</v-card-title>
                        <my-editor v-model="form.soal"/>
                    </v-card>

                    <v-card>
                        <v-card-title>
                            Opsi Jawaban
                            <v-spacer/>
                            <!-- <v-btn
                                class="mr-2"
                                @click="handelTambahOpsi"
                                small
                                rounded
                                outlined>
                                Mode Expert
                            </v-btn> -->
                            <v-btn
                                v-for="item in opsi"
                                :key="item"
                                @click="opsiDipilih=item-1"
                                :class="`mr-1 ${opsiDipilih===item-1?'primary white--text':''}`"
                                small
                                rounded
                                outlined>
                                {{ item }}
                            </v-btn>
                        </v-card-title>
                        
                        <v-divider/>
                        <v-card-text
                            v-if="opsiDipilih!==false && form.opsi[opsiDipilih]">
                            <my-editor
                                v-model="form.opsi[opsiDipilih].jawaban"
                                label="Jawaban"/>
                            <v-subheader class="pl-0">Feedback</v-subheader>
                            <my-editor
                                v-model="form.opsi[opsiDipilih].feedback"/>

                            <v-subheader class="pl-0">Hint</v-subheader>
                            <my-editor
                                v-model="form.opsi[opsiDipilih].hint"/>
                        </v-card-text>
                        <v-card-text
                            v-else>
                            <v-alert type="info">Buat soal dengan opsi jawaban (_____)</v-alert>
                        </v-card-text>
                    </v-card>
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
                            rounded
                            :disabled="form.opsi.length==0">
                            Simpan
                        </v-btn>
                    </div>
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
            form: {opsi:[], soal: ''},
            formOpsiHolder: [],
            opsiDipilih : false,
            opsi: []
        }
    },
    watch:{
        opsiDipilih: function(){

            if(this.form.opsi[this.opsiDipilih]==undefined){
                this.form.opsi[this.opsiDipilih]    = {
                    label: '',
                    jawaban: '',
                    feedback: '',
                }
            }
        },
        'form.opsi': function(){
            this.formOpsiHolder = Object.assign([], this.form.opsi)
        },
        'form.soal': function(){

            const soal          = this.form.soal.split("_____").splice(1)
            let opsi            = []
            soal.map((item, index)=>{
                opsi.push(
                    this.formOpsiHolder[index] || 
                    {
                        label: '',
                        jawaban: '',
                        feedback: '',
                    }
                )
            })

            this.form.opsi      = opsi
            this.opsi           = soal.length

        }
    },
    mounted: function(){
        this.handelLoadData()
    },
    computed:{
        
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
            this.opsiDipilih= false
            this.handelResetForm()
        },
        handelResetForm: function(){
            this.dipilih    = false
            this.form   = {
                soal: '',
                maksimal_percobaan: 0,
                opsi: [],
                hint: "",
            }
            // this.handelTambahOpsi()
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
            this.opsiDipilih= false
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
<style>
/* .ck-editor__editable_inline {
    min-height: 150px;
} */
</style>
