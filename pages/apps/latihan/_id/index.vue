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
                    <form @submit.prevent="handelSimpanLatihan">
                    <v-card>
                        <v-card-text>
                            <v-text-field
                                required
                                v-model="latihan.nama"
                                dense
                                label="Nama Latihan"
                                outlined/>
                            
                            <p class="mb-0">Status</p>
                            <v-radio-group v-model="latihan.status" hide-details="">
                                <v-radio
                                    label="Aktif"
                                    :value="1"
                                ></v-radio>
                                <v-radio
                                    label="Tidak Aktif"
                                    :value="0"
                                ></v-radio>
                            </v-radio-group>
                            
                        </v-card-text>
                        <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            type="submit"
                            color="blue darken-1"
                            text>
                            Simpan
                        </v-btn>
                        </v-card-actions>
                    </v-card>
                    </form>
                    <v-card outlined class="mt-2">
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

                    <!-- <v-card outlined class="mb-4">
                        <v-card-text>
                            <div
                                v-html="editorValue">
                            </div>
                            <v-row
                                dense
                                cols="12">
                                <v-col
                                    md="10">
                                    <my-input-math
                                        />
                                </v-col>
                                <v-col
                                    md="2">
                                    <v-btn
                                        @click="handelGetEditorValue"
                                        height="100%"
                                        class="h-fill"
                                        block>
                                        Check
                                    </v-btn>
                                </v-col>
                            </v-row>
                            

                        </v-card-text>

                    </v-card> -->

                    <v-card 
                        outlined 
                        class="mb-4">
                        <v-card-title>
                            Pengaturan
                        </v-card-title>
                        <v-divider/>
                        <v-card-text>
                            <v-label class="pb-0">Tipe Soal</v-label>
                            <v-radio-group 
                                dense
                                v-model="form.tipe_soal">
                                <v-radio
                                    label="Umum"
                                    value="umum"/>
                                <v-radio
                                    label="Matematika"
                                    value="matematika"/>
                            </v-radio-group>
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
                    <v-alert 
                        v-if="opsi>10"
                        type="error">
                        maksimal 10 anak soal
                    </v-alert>

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
                            <template
                                v-for="(item, index) in opsi">
                                <v-btn
                                    v-if="index<10"
                                    :key="item"
                                    @click="opsiDipilih=item-1"
                                    :class="`mr-1 ${opsiDipilih===item-1?'primary white--text':''}`"
                                    small
                                    rounded
                                    outlined>
                                    {{ item }}
                                </v-btn>
                            </template>
                        </v-card-title>
                        
                        <v-divider/>
                        <v-card-text
                            v-if="opsiDipilih!==false && form.opsi[opsiDipilih]">
                            <v-text-field
                                v-model="form.opsi[opsiDipilih].bobot"
                                persistent-placeholder
                                type="number"
                                label="Bobot jawaban"
                                hide-details=""/>
                            <v-card outlined elevation="0" class="mt-2" rounded="xl">
                                
                                <v-card-text>
                                    Jawaban <br/>
                                </v-card-text>
                                
                                <my-editor
                                    v-if="form.tipe_soal=='umum'"
                                    v-model="form.opsi[opsiDipilih].jawaban"
                                    label="Jawaban"/>
                                <my-input-math
                                    v-else
                                    id="jawaban"
                                    v-model="form.opsi[opsiDipilih].jawaban"
                                    />
                                
                            </v-card>
                            <v-card outlined elevation="0" class="mt-2" rounded="xl">
                                
                                <v-card-title>
                                    Hint
                                </v-card-title>
                                <!-- <v-card-text>
                                    
                                    <v-textarea
                                        v-model="form.opsi[opsiDipilih].hint"/>
                                </v-card-text> -->
                                <my-editor
                                    v-model="form.opsi[opsiDipilih].hint"/>
                            </v-card>
                            <v-card outlined elevation="0" class="mt-2" rounded="xl">
                                <v-card-title>
                                    Feedback
                                    <v-spacer/>
                                    <v-btn 
                                        @click="form.opsi[opsiDipilih].feedback.push({input: '', output:''})"
                                        small 
                                        rounded>
                                        Tambah Feedback
                                    </v-btn>
                                </v-card-title>
                                <div
                                    v-for="(item, index) in form.opsi[opsiDipilih].feedback"
                                    :key="index">
                                    <v-row dense>
                                        <v-col md="5">
                                            <my-editor
                                                v-if="form.tipe_soal=='umum'"
                                                v-model="item.input"/>
                                            <my-input-math
                                                :id="`feedback_${index}`"
                                                v-model="item.input"
                                                v-else/>
                                            
                                        </v-col>
                                        <v-col md="6">
                                            <my-editor
                                                v-model="item.output"/>
                                        </v-col>
                                        <v-col align="center">
                                            <v-btn icon rounded small @click="handelHapusFeedback(index)">
                                                <v-icon>mdi-delete</v-icon>
                                            </v-btn>
                                        </v-col>
                                    </v-row>
                                </div>
                                <v-alert 
                                    v-if="form.opsi[opsiDipilih].feedback.length==0"
                                    type="info" class="mb-0">Belum ada feedback yang di setup</v-alert>
                            </v-card>
                        </v-card-text>
                        <v-card-text
                            v-else>
                            <v-alert type="info" class="mb-0">Buat soal dengan opsi jawaban (_____)</v-alert>
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
            form: {
                opsi: [], 
                soal: '',
                tipe_soal: 'umum',
            },
            formOpsiHolder: [],
            opsiDipilih : false,
            opsi: [],
            latihan: {
                nama: '',
                minimun_benar: 0,
                status: 1, 
            },
        }
    },
    watch:{
        opsiDipilih: function(){

            if(this.form.opsi[this.opsiDipilih]==undefined){
                this.form.opsi[this.opsiDipilih]    = {
                    label: '',
                    jawaban: '',
                    feedback: [],
                    bobot: 1,
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
                        feedback: [],
                        bobot: 1,
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
            this.latihan    = Object.assign({}, detail)
            delete this.latihan.soal
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
                maksimal_percobaan: 1,
                opsi: [],
                hint: "",
                tipe_soal: 'umum'
            }
            // this.handelTambahOpsi()
        },
        handelResetFormLatihan: function(){
            this.form   = {
                nama: '',
                minimun_benar: 0,
                status: 1, 
            }
        },
        handelSimpanLatihan: function(){
            this.setFetching(true)

            this.$api.$put(`latihan/${this.latihan.id}`, this.latihan).then((resp)=>{
                this.handelResetFormLatihan()
                this.popup = false
                this.setFetching(false)
                this.setSnackbar("Latihan berhasil diubah")
                this.handelLoadData()
            })
            // this.dialog = false
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
        },
        handelHapusFeedback: function(index){
            this.form.opsi[this.opsiDipilih].feedback.splice(index, 1)
        }
    }
}
</script>
<style>
/* .ck-editor__editable_inline {
    min-height: 150px;
} */
</style>
