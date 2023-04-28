<template>
    <div class="grey lighten-4 fill-height mb-16">
		<div class="primary pb-16">
			<v-container>
				<Head
					title="Latihan Sub Topik"
					subtitle="Kelola data latihan berbasis ITS">
                    <div>
                        <v-btn
                            exact
                            small
                            class="white"
                            @click="handelCreate()">
                            <v-icon left>
                                mdi-account-plus
                            </v-icon>
                            Create
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
                                label="Nama Latihan"
                                v-model="filterNama"
                                v-on:keyup.enter="handelLoadData"
                                placeholder="Tulis disini ..."
                                persistent-placeholder
                                hide-details=""/>
                        </v-col>
                        <v-col>
                            <v-text-field
                                type="date"
                                v-model="filterDibuat"
                                v-on:keyup.enter="handelLoadData"
                                label="Dibuat pada"
                                value="06 Sep 2020"
                                hide-details=""/>
                        </v-col>
                        <v-col>
                            <v-select
                                :items="[{value:0, label: 'Inactive'}, {value:1, label: 'Active'}]"
                                item-value='value'
                                item-text='label'
                                v-model="filterStatus"
                                label="Status"
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
                    <template v-slot:[`item.dibuat`]="{ item }">
                        {{ $moment(item.dibuat).format('DD/MM/YYYY') }}
                    </template>
                    <template v-slot:[`item.diubah`]="{ item }">
                        {{ item.updated_at?$moment(item.diubah).format('DD/MM/YYYY'):'-' }}
                    </template>
                    <template v-slot:[`item.aksi`]="{ item }">
                        <v-btn 
                            @click="handelConfirmHapus(item)"
                            icon
                            small>
                            <v-icon>mdi-delete</v-icon>
                        </v-btn>
                        <v-btn 
                            @click="handelEdit(item)"
                            icon
                            small>
                            <v-icon>mdi-pencil-circle</v-icon>
                        </v-btn>
                        <v-btn 
                            @click="handelClickDetail(item)"
                            icon
                            small>
                            <v-icon>mdi-information</v-icon>
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

        <v-dialog
			v-model="popup"
			persistent
			max-width="600px">
            <form @submit.prevent="handelSimpanForm">
                <v-card>
                    <v-card-title>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field
                                        required
                                        v-model="form.nama"
                                        dense
                                        label="Nama Latihan"
                                        outlined/>
                                    <v-text-field
                                        v-if="form.id!=undefined"
                                        v-model.number="form.minimun_benar"
                                        type="number"
                                        dense
                                        label="Minimum jumlah benar"
                                        outlined
                                        required/>
                                    <v-alert 
                                        v-if="form.minimun_benar>form.jumlah_soal"type="error">
                                        Minimum jumlah benar, tidak boleh lebih dari jumlah soal
                                    </v-alert>
                                    <p class="mb-0">Status</p>
                                    <v-radio-group v-model="form.status" hide-details="">
                                        <v-radio
                                            label="Aktif"
                                            :value="1"
                                        ></v-radio>
                                        <v-radio
                                            label="Tidak Aktif"
                                            :value="0"
                                        ></v-radio>
                                    </v-radio-group>
                                    
                                </v-col>

                            </v-row>
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
                        type="submit"
                        color="blue darken-1"
                        text>
                        Simpan
                    </v-btn>
                    </v-card-actions>
                </v-card>
            </form>
		</v-dialog>
        
	</div>
</template>
<script>
export default {
    layout:'apps',
	props: [ 'setConfirmation', 'setSnackbar', 'setFetching', 'access' ],
    data: function(){
        return {
            filterNama: '',
            filterDibuat: '',
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
                    { text: 'Nama', value: 'nama' },
                    { text: 'Minimum Benar', value: 'minimun_benar' },
                    { text: 'Jumlah Soal', value: 'jumlah_soal' },
                    { text: 'Jumlah Peserta', value: 'jumlah_peserta' },
                    { text: 'Created', value: 'dibuat' },
                    { text: 'Updated', value: 'diubah' },
                    { text: 'Status', value: 'status' },
                    { text: '', value: 'aksi' },
                ],
                data:[],
            },
            popup: false,
            form: {
                nama: '',
                minimun_benar: 0,
                status: 1, 
            },
        }
    },
    mounted: function(){
        this.handelLoadData()
    },
    methods: {
        handelLoadData: async function(){

            this.isFetching = true

            let query       = []
            if(this.filterNama){
                query.push(`nama:ilike.${this.filterNama}`)
            }
            if(this.filterDibuat){
                query.push(`dibuat:date.${this.filterDibuat}`)
            }
            if(this.filterStatus.toString()){
                query.push(`status:${this.filterStatus}`)
            }
            if(query.length>0){
                query           = `&query=${query.join(',')}`
            }
            const data          = (await this.$api.$get(`latihan?page=${this.options.page-1}&size=${this.options.itemsPerPage}${query}`)).data

            this.table.data     = data.content
            this.table.count    = eval(data.count)
            this.isFetching     = false
        },
        handelClickDetail: function( item ){
            this.$router.push(`/apps/latihan/${item.id}`);
        },
        handelResetForm: function(){
            this.form   = {
                nama: '',
                minimun_benar: 0,
                status: 1, 
            }
        },
        handelSimpanForm: function(){
            this.setFetching(true)

            if(this.form.id==undefined){
                this.$api.$post(`latihan`, this.form).then((resp)=>{
                    this.handelResetForm()
                    this.popup = false
                    this.setFetching(false)
                    this.setSnackbar("Latihan berhasil ditambahkan, silahkan import latihan soal")
                    this.$router.push(`/apps/latihan/${resp.data}`);
                })
            }else{
                this.$api.$put(`latihan/${this.form.id}`, this.form).then((resp)=>{
                    this.handelResetForm()
                    this.popup = false
                    this.setFetching(false)
                    this.setSnackbar("Latihan berhasil diubah")
                    this.handelLoadData()
                })
            }
            // this.dialog = false
        },
        handelEdit: function(item){
            this.handelResetForm()
            this.form   = Object.assign({}, item)
            this.popup  = true
        },
        handelCreate: function(item){
            this.handelResetForm()
            this.popup  = true
        },
        handelConfirmHapus: function(item){
            this.setConfirmation({
                status: true,
                title: 'Konfirmasi',
                message: 'Apakah kamu ingin menghapus latihan soal ini ?',
                handelOk: ()=>this.handelHapus(item)
            })
        },
        handelHapus: async function(item){
            this.setFetching(true)
            this.data   = []
            this.isFetching	            = true
            this.$api.$delete(`latihan/${item.id}`).then((resp)=>{
                this.setFetching(false)
                console.log(resp.message)
                if(resp.status){
                    this.handelLoadData()
                    this.setSnackbar("Latihan soal berhasi dihapus")
                }else{
                    this.setSnackbar(resp.message)
                }
            })
            this.isFetching	= false
        },

    }
}
</script>
