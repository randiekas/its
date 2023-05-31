<template>
    <div class="grey lighten-4 fill-height mb-16">
		<div class="primary pb-16">
			<v-container>
				<Head
					title="Hasil Latihan"
					:subtitle="detail.latihan.nama">
                    <div>
                        <v-btn
                            exact
                            small
                            class="white"
                            @click="handelConfirmUlangiLatihan">
                            <v-icon left>
                                mdi-repeat-variant
                            </v-icon>
                            Ulangi Latihan
                        </v-btn>
                        <v-btn
                            exact
                            small
                            class="white"
                            :to="`/apps/its/${id}/detail?path_latihan_id=${$route.query.path_latihan_id}`">
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
                v-if="detail.jawaban.nilai!=undefined" justify="center">
                <v-col md="10">
                    <v-card
                        v-for="(item, index) in data"
                        :key="index"
                        class="mb-4"
                        outlined>
                        <v-card-title>
                            {{index+1}}/{{ data.length }}
                            <v-spacer/>
                            <v-icon
                                v-if="item.jawaban.status"
                                color="green">
                                mdi-check-decagram
                            </v-icon>
                            <v-icon
                                v-else
                                color="red">
                                mdi-decagram
                            </v-icon>
                        </v-card-title>
                        <v-divider/>
                        <v-card-text>
                            <div
                                class="mb-4"
                                v-html="content(item)"/>
                            <p class="text-overline">Riwayat Jawaban</p>
                            <v-simple-table dense>
                                <template v-slot:default>
                                <thead>
                                    <tr>
                                        <th class="text-left" width="20">
                                            #
                                        </th>
                                        <th 
                                            v-for="row in item.maksimal_percobaan"
                                            :key="row">
                                            Percobaan {{ row }}
                                        </th>
                                        <th class="text-center">
                                            Status
                                        </th>
                                        <th class="text-center">
                                            Nilai Bobot
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr
                                        v-for="(row, key) in item.opsi"
                                        :key="key">
                                        <td class="text-center">{{ key+1 }}</td>
                                        <td 
                                            v-for="i in item.maksimal_percobaan"
                                            :key="i">
                                            <div
                                                v-html="item.jawaban.percobaan[key][i-1]?item.jawaban.percobaan[key][i-1].jawaban:''"/>
                                        </td>
                                        <td class="text-center">
                                            <v-btn v-if="row.status" x-small rounded color='green' dark>Benar</v-btn>
                                            <v-btn v-else x-small rounded color='red' dark>Salah</v-btn>
                                        </td>
                                        <td class="text-center">{{ row.status?((row.bobot/item.totalBobot)*100).toFixed(2):'0' }}</td>
                                    </tr>
                                </tbody>
                                </template>
                            </v-simple-table>
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
            path_id:route.query.path_id,
        }
    },
    data: function(){
        return {
            isFetching:true,
            detail: {
                jawaban:{},
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
            },
            feedback: '',
            data: [],
        }
    },
    mounted: function(){
        this.handelLoadData()
    },
    methods: {

        renderStatus: function(status, konten, percobaan, bobot){
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
        content: function(soal) {
            // keep a map of all your variables
            let value   = soal.soal;
            var rx      = /(_____)/g;
            let index   = 0 
            value       = value.replace(rx,(item)=>{
                index++
                const opsi  = soal.opsi[index-1]
                return this.renderStatus(opsi.status, opsi.jawaban || '_____', opsi.percobaan, opsi.bobot)
                
            })
            return window.WirisPlugin.Parser.initParse(value);
        },

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
            this.handelDetail(detail)

        },

        handelDetail: async function(item){
            this.data   = []
            this.data   = (await this.$api.$get(`path/${this.id}/latihan/${this.path_latihan_id}/peserta/${this.$route.query.path_latihan_akun_id}`)).data.map((item)=>{
                let totalBobot          = 0
                item.jawaban.percobaan  = JSON.parse(item.jawaban.percobaan)
                item.opsi               = JSON.parse(item.opsi).map((row, index)=>{
                    totalBobot          += row.bobot
                    const jawaban       = item.jawaban.percobaan[index]
                    row.jawaban         = jawaban[jawaban.length-1].jawaban
                    row.status          = jawaban[jawaban.length-1].status
                    row.percobaan       = item.jawaban.percobaan[index].length
                    return row
                })
                item.totalBobot         = totalBobot
                return item
            })
            this.isFetching	= false
        },

        handelConfirmUlangiLatihan: function(){
            this.setConfirmation({
                status: true,
                title: 'Konfirmasi',
                message: 'Apakah kamu ingin mengulangi latihan ini ?, maka latihan sebelumnya akan direset!',
                handelOk: this.handelUlangiLatihan
            })
        },
        handelUlangiLatihan: async function(item){
            this.data   = []
            this.isFetching	            = true
            this.$api.$delete(`path/saya/${this.id}/latihan/${this.path_latihan_id}`).then((resp)=>{
                this.$router.push(`/apps/its/${this.id}/detail?path_latihan_id=${this.path_latihan_id}`)
            })
            this.isFetching	= false
        },

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