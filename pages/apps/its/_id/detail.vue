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
                v-if="detail.id!=undefined && soal.id!=undefined">
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
                                    v-model="item.jawabanSiswa"
                                    :prefix="`${item.label} = `"
                                    :success="item.status==1"
                                    :error="item.status==0"
                                    :append-icon="ikonStatus[item.status]"/>
                            </div>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer/>
                            <v-btn
                                @click="checkJawaban"
                                :disabled="soal.maksimal_percobaan==0"
                                class="primary">Check Jawaban ({{ soal.maksimal_percobaan }})</v-btn>
                            <v-btn
                                v-if="(ke+1)==detail.soal.length"
                                :disabled="soal.opsi.filter((item)=>item.status==1).length!=soal.opsi.length && soal.maksimal_percobaan>0"
                                @click="handelSelesai"
                                class="primary">Selesai</v-btn>
                            <v-btn
                                v-else
                                :disabled="soal.opsi.filter((item)=>item.status==1).length!=soal.opsi.length && soal.maksimal_percobaan>0"
                                @click="handelSoalSelanjutnya"
                                class="primary">Soal Selanjutnya</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
                <v-col md="4">
                    <v-card outlined>
                        <v-card-subtitle>Feedback</v-card-subtitle>
                        <v-divider/>
                        <v-card-text>
                            <p
                                v-for="(item, index) in soal.opsi.filter((item)=>item.status==0)"
                                :key="index"
                                v-html="item.feedback"></p>
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
                                    <v-btn
                                        v-if="hint===false"
                                        @click="hint=true"
                                        block>Lihat Hints</v-btn>
                                    <div
                                        v-if="hint"
                                        v-html="soal.hint">
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
            id: route.params.id,
            latihan_id:route.query.id_latihan,
        }
    },
    data: function(){
        return {
            isFetching:true,
            detail: {
                nama: '-'
            },
            soal: {},
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
    methods: {
        handelLoadData: async function(){

            this.isFetching	= true
			let detail      = (await this.$api.$get(`/path/saya/${this.id}/latihan/${this.latihan_id}`)).data
            detail.soal     = detail.soal.map((item)=>{
                                    item.opsi               = JSON.parse(item.opsi)
                                    item.percobaan          = []
                                    item.jumlah_percobaan   = 0
                                    item.status             = 0
                                    return item
                                })
            // detail.opsi     = JSON.parse(detail.opsi)
            if(detail.soal.length>0){
                this.soal   = detail.soal[this.ke]
            }
            this.detail     = detail
			this.isFetching	= false

        },

        checkJawaban: function(){
            this.soal.maksimal_percobaan    -= 1
            this.soal.opsi                  = this.soal.opsi.map((item)=>{
                item.status                 = item.jawaban == item.jawabanSiswa ? 1 : 0
                return item
            })

            this.soal.status                = this.soal.opsi.filter((item)=>item.status==1).length==this.soal.opsi.length?1:0
            this.soal.jumlah_percobaan      += 1
            this.soal.percobaan.push(this.soal.opsi)
        },

        handelSoalSelanjutnya: function(){
            this.hint           = false
            this.ke             = this.ke+1
            this.soal           = this.detail.soal[this.ke]
        },

        handelSelesai: async function(){
            this.setFetching(true)
            const payload   = {
                detail: this.detail.soal.map((item)=>{
                    return {
                        latihan_detail_id: item.id,
                        jumlah_percobaan:item.jumlah_percobaan,
                        percobaan:JSON.stringify(item.percobaan),
                        status:item.status,
                    }
                })
            }

            this.$api.$post(`path/saya/${this.id}/latihan/${this.latihan_id}`, payload).then((resp)=>{
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
