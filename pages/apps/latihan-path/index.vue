<template>
    <div class="grey lighten-4 fill-height mb-16">
		<div class="primary pb-16">
			<v-container>
				<Head
					title="Latihan Topik"
					subtitle="Kelola data latihan berbasis ITS">
                    <div>
                        <v-btn
                            exact
                            small
                            class="white"
                            @click="popup=true">
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
                    @click:row="handelClickDetail"
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
                        {{ item.diubah?$moment(item.diubah).format('DD/MM/YYYY'):'-' }}
                    </template>
                    <!-- <template v-slot:[`item.aksi`]="{ item }">
                        <v-btn
                            :to="`/apps/latihan-path/${item.id}/kelola`"
                            x-small>
                            Detail
                        </v-btn>
                    </template> -->
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
                                        v-model="form.nama"
                                        dense
                                        label="Nama Path"
                                        outlined
                                        required/>
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
                        Close
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
                    { text: 'Jumlah Latihan', value: 'jumlah_latihan' },
                    { text: 'Jumlah Peserta', value: 'jumlah_peserta' },
                    { text: 'Created', value: 'dibuat' },
                    { text: 'Status', value: 'status' },
                    // { text: '', value: 'aksi' },
                ],
                data:[]
            },
            popup: false,
            form: {},
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

            const data          = (await this.$api.$get(`path?page=${this.options.page-1}&size=${this.options.itemsPerPage}${query}`)).data

            this.table.data     = data.content
            this.table.count    = eval(data.count)
            this.isFetching     = false
        },
        handelClickDetail: function( item ){
            this.$router.push(`/apps/latihan-path/${item.id}`);
        },
        handelResetForm: function(){
            this.form   = {
                nama: '',
            }
        },
        handelSimpanForm: function(){
            this.setFetching(true)
            this.$api.$post(`path`, this.form).then((resp)=>{
                this.handelResetForm()
                this.popup = false
                this.setFetching(false)
                this.setSnackbar("Latihan path berhasil ditambahkan, silahkan import latihan soal")
                this.$router.push(`/apps/latihan-path/${resp.data}`);
            })
            // this.dialog = false
        },

    }
}
</script>
