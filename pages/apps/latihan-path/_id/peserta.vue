<template>
    <div class="grey lighten-4 fill-height mb-16">
        <v-dialog
            v-model="popup"
            persistent
            width="600">
            <v-card>
                <v-card-title>Rincian Jawaban Siswa</v-card-title>
                <v-card-text>
                <v-card
                    v-for="(item, index) in data"
                    :key="index"
                    class="mb-4"
                    outlined>
                    <v-card-title>
                        Soal
                        <v-spacer/>
                        {{index+1}}/{{ data.length }}
                    </v-card-title>
                    <v-divider/>
                    <v-card-text>
                        <div
                            class="mb-4"
                            v-html="content(item)"/>
                            <!-- <div
                                v-for="(row, key) in item.opsi"
                                :key="key">
                                <v-text-field
                                    persistent-placeholder
                                    outlined
                                    dense
                                    readonly
                                    :value="row.jawaban"
                                    :success="row.status===1"
                                    :error="row.status===0"
                                    :append-icon="ikonStatus[row.status]"
                                    :prefix="row.label">
                                    <template v-slot:append-outer>
                                        {{ row.percobaan }}x
                                    </template>
                                </v-text-field>
                            </div> -->
                    </v-card-text>
                </v-card>
                </v-card-text>
                <v-card-actions>
                    <v-spacer/>
                    <v-btn
                        outlined
                        @click="popup=false">
                        Tutup
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
		<div class="primary pb-16">
			<v-container>
				<Head
					title="Peserta"
					subtitle="Kelola data latihan berbasis ITS">
                    <div>
                        <v-btn
                            small
                            class="white">
                            <v-icon left>
                                mdi-share-variant
                            </v-icon>
                            Bagikan Link
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
            <v-card class="mb-8">
                <v-card-text>
                    <v-row dense>
                        <v-col>
                            <v-text-field
                                label="Nama Peserta"
                                v-model="filterName"
                                v-on:keyup.enter="handelLoadData"
                                placeholder="Tulis disini ..."
                                persistent-placeholder
                                hide-details=""/>
                        </v-col>
                        <v-col>
                            <v-text-field
                                label="Email Peserta"
                                v-model="filterName"
                                v-on:keyup.enter="handelLoadData"
                                placeholder="Tulis disini ..."
                                persistent-placeholder
                                hide-details=""/>
                        </v-col>
                        <v-col>
                            <v-text-field
                                type="date"
                                v-model="filterCreatedAt"
                                v-on:keyup.enter="handelLoadData"
                                label="Mengikuti Pada"
                                value="06 Sep 2020"
                                hide-details=""/>
                        </v-col>
                        <v-col md="1">
                            <v-btn
                                @click="handelLoadData"
                                class="primary"
                                large
                                block
                                rounded>
                                <v-icon>
                                    mdi-archive-search-outline
                                </v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
            <v-card outlined>
                <v-data-table
                    dense
                    :headers="table.header"
                    :items="table.data"
                    item-key="id"
                    disable-sort
                    :loading="isFetching"
                    :options.sync="options"
                    :server-items-length="table.count"
                    hide-default-footer="">
                    <template v-slot:[`item.no`]="{ index }">
                        {{ index+1 }}
                    </template>
                    <template v-slot:[`item.created_at`]="{ item }">
                        {{ $moment(item.created_at).format('DD/MM/YYYY') }}
                    </template>
                    <template v-slot:[`item.updated_at`]="{ item }">
                        {{ item.updated_at?$moment(item.updated_at).format('DD/MM/YYYY'):'-' }}
                    </template>
                    <template v-slot:[`item.aksi`]="{ item }">
                        <v-btn
                            rounded
                            @click="handelDetail(item)"
                            x-small>
                            Detail
                        </v-btn>
                    </template>
                    <template v-slot:[`item.status`]="{ item }">
                        <v-chip v-if="item.status" small class="success">Active</v-chip>
                        <v-chip v-else small class="warning">Inactive</v-chip>
                    </template>
                    <template v-slot:footer="{props}">
                        <my-dt-pagination
                            :options="options"
                            :pagination="props.pagination"/>
                    </template>
                </v-data-table>
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
            path_latihan_id: route.query.path_latihan_id,
        }
    },
    data: function(){
        return {
            filterID: '',
            filterName: '',
            filterCreatedAt: '',
            filterStatus: '',

            options: {},
            isFetching: false,
            table:{
                count: 0,
                header:[
                    {
                        text: 'No',
                        align: 'center',
                        sortable: false,
                        value: 'no',
                    },
                    { text: 'Nama', value: 'akun.email' },
                    { text: 'Email', value: 'akun.nama' },
                    { text: 'Jumlah Benar', value: 'jumlah_benar' },
                    { text: 'Mengikuti Pada', value: 'created_at' },
                    { text: '', value: 'aksi' },
                ],
                data:[]
            },
            data: [],
            popup: false,
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

            this.isFetching = true

            let query       = []
            if(this.filterID){
                query.push(`id:${this.filterID}`)
            }
            if(this.filterName){
                query.push(`name:ilike.${this.filterName}`)
            }
            if(this.filterCreatedAt){
                query.push(`created_at:date.${this.filterCreatedAt}`)
            }
            if(this.filterStatus.toString()){
                query.push(`status:${this.filterStatus}`)
            }
            if(query.length>0){
                query           = `&query=${query.join(',')}`
            }

            let data            = (await this.$api.$get(`path/${this.id}/latihan/${this.path_latihan_id}/peserta?page=${this.options.page-1}&size=${this.options.itemsPerPage}${query}`)).data

            this.table.data     = data.content
            this.table.count    = eval(data.count)
            this.isFetching     = false
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
        content: function(soal) {
            // keep a map of all your variables
            let value   = soal.soal;
            var rx      = /(_____)/g;
            let index   = 0 
            value       = value.replace(rx,(item)=>{
                index++
                const opsi  = soal.opsi[index-1]
                return this.renderStatus(opsi.status, opsi.jawaban || '_____')
                
            })
            return window.WirisPlugin.Parser.initParse(value);
        },
        handelDetail: async function( item ){
            this.data   = []
            this.popup  = true
            this.data   = (await this.$api.$get(`path/${this.id}/latihan/${this.path_latihan_id}/peserta/${item.id}`)).data.map((item)=>{
                item.jawaban.percobaan  = JSON.parse(item.jawaban.percobaan)
                item.opsi               = JSON.parse(item.opsi).map((row, index)=>{
                    const jawaban       = item.jawaban.percobaan[index]
                    row.jawaban         = jawaban[jawaban.length-1].jawaban
                    row.status          = jawaban[jawaban.length-1].status
                    row.percobaan       = item.jawaban.percobaan[index].length
                    return row
                })
                return item
            })
        },

    }
}
</script>
