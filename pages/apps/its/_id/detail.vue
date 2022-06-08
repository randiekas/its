<template>
    <div class="grey lighten-4 fill-height mb-16">
		<div class="primary pb-16">
			<v-container>
				<Head
					title="Mulai"
					:subtitle="detail.latihan.nama">
                    <div>
                        <v-btn
                            exact
                            small
                            class="white"
                            :to="`/apps/its/${id}`">
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
                v-if="detail.latihan.id!=undefined && soal.id!=undefined">
                <v-col md="8">
                    <v-card outlined>
                        <v-card-title>
                            Soal
                            <v-spacer/>
                            {{ke+1}}/{{ detail.latihan.soal.length }}
                        </v-card-title>
                        <v-divider/>
                        <v-card-text>
                            <div
                                class="mb-4"
                                v-html="content"/>

                            <!-- <div
                                class="mb-4"
                                v-html="soal.soal"/> -->
                        </v-card-text>
                        <v-divider/>
                        <div
                            v-for="(item, index) in soal.opsi"
                            :key="index">
                            <template
                                v-if="index==sub">
                                <v-card-title>
                                    Jawabanmu
                                    <v-spacer/>
                                    <v-btn
                                        rounded
                                        @click="checkJawaban"
                                        :disabled="sub!=index || item.percobaan === 0 || item.status === 1"
                                        class="primary">Check ({{ item.percobaan }})</v-btn>
                                </v-card-title>

                                <v-card-text>
                                    <my-editor
                                        v-model="item.jawabanSiswa"
                                        label="Jawaban"/>
                                </v-card-text>
                            </template>
                            <!-- <v-text-field
                                persistent-placeholder
                                outlined
                                dense
                                v-model="item.jawabanSiswa"
                                :readonly="sub!=index"
                                :prefix="`${item.label}`"
                                :success="item.status==1"
                                :error="item.status==0"
                                :append-icon="ikonStatus[item.status]">
                                <template v-slot:append-outer>
                                    <v-btn
                                        @click="checkJawaban"
                                        :disabled="sub!=index || item.percobaan === 0 || item.status === 1"
                                        class="primary">Check ({{ item.percobaan }})</v-btn>
                                </template>
                            </v-text-field> -->
                        </div>

                        <v-card-actions>
                            <v-spacer/>
                            <v-btn
                                v-if="(ke+1)==detail.latihan.soal.length"
                                :disabled="soal.opsi.filter((item)=>item.status==1).length!=soal.opsi.length && soal.opsi[sub].percobaan>0"
                                @click="handelSelesai"
                                class="primary">Selesai</v-btn>
                            <template
                                v-else>
                                <!-- <v-btn
                                    class="primary">Ulangi</v-btn> -->
                                <v-btn
                                    :disabled="soal.opsi[soal.opsi.length-1].percobaan!=0 && soal.opsi[soal.opsi.length-1].status!=1"
                                    @click="handelSoalSelanjutnya"
                                    class="primary">Soal Selanjutnya</v-btn>
                            </template>
                        </v-card-actions>
                    </v-card>
                </v-col>
                <v-col md="4">
                    <v-card outlined>
                        <v-card-subtitle>Feedback</v-card-subtitle>
                        <v-divider/>
                        <v-card-text>
                            <p
                                v-if="soal.opsi[sub].status==0"
                                v-html="soal.opsi[sub].feedback"></p>
                            <p
                                v-else
                                v-html="'Silahkan jawab soal untuk mendapatkan feedback'"></p>
                        </v-card-text>
                        <v-divider/>
                        <v-tabs
                            v-model="tab"
                            centered
                            fixed-tabs>
                            <v-tab>Hints</v-tab>
                            <!-- <v-tab>Chat Bot</v-tab> -->
                        </v-tabs>
                        <v-card-text>
                            <v-tabs-items v-model="tab">
                                <v-tab-item>
                                    <div
                                        v-if="hint"
                                        v-html="soal.opsi[sub].hint">
                                    </div>
                                    <v-btn
                                        block
                                        @click="hint=true"
                                        v-else>Show Hint</v-btn>
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
            id: route.params.id,
            path_latihan_id:route.query.path_latihan_id,
        }
    },
    data: function(){
        return {
            isFetching:true,
            detail: {
                latihan:{nama: '-'}
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
            }
        }
    },
    mounted: function(){
        this.handelLoadData()
    },
    computed: {
        content() {
            
            // keep a map of all your variables

            let value   = this.soal.soal;
            var rx      = /(_____)/g;
            let index   = 0 
            value       = value.replace(rx,(item)=>{
                index++
                if(index===this.sub+1){
                    const opsi  = this.soal.opsi[this.sub]
                    return this.renderStatus(opsi.status==undefined?'aktif':opsi.status, opsi.jawabanSiswa||'_____')
                }else{
                    const opsi  = this.soal.opsi[index-1]
                    return this.renderStatus(opsi.status, opsi.jawabanSiswa || '_____')
                }
                
            })
            return window.WirisPlugin.Parser.initParse(value);
        }
    },
    methods: {
        handelLoadData: async function(){

            this.isFetching	= true
			let detail      = (await this.$api.$get(`/path/saya/${this.id}/latihan/${this.path_latihan_id}`)).data
            detail.latihan.soal     = detail.latihan.soal.map((item)=>{
                item.opsi           = JSON.parse(item.opsi).map((row)=>{
                    return {
                        ...row,
                        jawabanSiswa: '',
                        percobaan: item.maksimal_percobaan,
                        riwayat: [],
                    }
                })
                item.percobaan          = []
                item.jumlah_percobaan   = 0
                item.status             = 0
                return item
            })
            // detail.latihan.opsi     = JSON.parse(detail.latihan.opsi)
            if(detail.latihan.soal.length>0){
                this.soal   = detail.latihan.soal[this.ke]
                this.sub    = 0
            }
            this.detail     = detail
			this.isFetching	= false

        },

        renderStatus: function(status, konten){
            const warna = {
                'aktif': 'v-btn v-btn--outlined v-btn--rounded theme--light v-size--small',
                '1': 'v-btn v-btn--outlined v-btn--rounded theme--light v-size--small success--text',
                '0': 'v-btn v-btn--outlined v-btn--rounded theme--light v-size--small error--text',
                'undefined': 'v-btn v-btn--disabled v-btn--has-bg v-btn--rounded theme--light v-size--small',
            }
            return `<button type="button" class="${warna[status]}">
                    <span class="v-btn__content">
                        ${konten}
                    </span>
                </button>`
        },
        checkJawaban: function(){
            
            let opsi                    = Object.assign({}, this.soal.opsi[this.sub])
            opsi.percobaan              -= 1
            opsi.status                 = opsi.jawaban.toLowerCase() == opsi.jawabanSiswa.toLowerCase() ? 1 : 0
            opsi.riwayat.push({
                jawaban: opsi.jawabanSiswa,
                status: opsi.status,
            })
            this.soal.opsi              = this.soal.opsi.map((item, index)=> this.sub==index?opsi:item)
            if(this.sub == this.soal.opsi.length-1){
                // this.handelSoalSelanjutnya()
            }else if(opsi.percobaan==0 || opsi.status){
                this.hint               = false
                this.sub                += 1
            }
        },

        handelSoalSelanjutnya: function(){
            this.hint           = false
            this.ke             = this.ke+1
            this.soal           = this.detail.latihan.soal[this.ke]
            this.sub            = 0
            // this.sub_percobaan  = this.soal.maksimal_percobaan
        },


        handelSelesai: async function(){
            this.setFetching(true)
            const payload   = {
                detail: this.detail.latihan.soal.map((item)=>{
                    item.percobaan  = item.opsi.map((row)=> row.riwayat)
                    let bobot       = 0
                    item.opsi.filter((row)=>{
                        bobot       += row.status==1?eval(row.bobot):0
                    })
                    item.opsi.filter((row)=> row.status === 1).length === item.opsi.length?1:0
                    return {
                        latihan_detail_id: item.id,
                        jumlah_percobaan: 0,
                        percobaan: JSON.stringify(item.percobaan),
                        status: item.opsi.filter((row)=> row.status === 1).length === item.opsi.length?1:0,
                        bobot,
                    }
                })
            }
            
            this.$api.$post(`path/saya/${this.id}/latihan/${this.path_latihan_id}`, payload).then((resp)=>{
                this.setFetching(false)
                this.setConfirmation({
                    status: true,
                    title: 'Berhasil',
                    message: 'Jawaban latihan berhasil disimpan, terimakasih sudah mengikuti latihan :-D',
                    handelOk: ()=> this.setConfirmation({ status: false })
                })
                this.$router.push(`/apps/its/${this.id}`)
            })
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