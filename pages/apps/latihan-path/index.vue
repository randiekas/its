<template>
    <div class="grey lighten-4 fill-height mb-16">
		<div class="primary pb-16">
			<v-container>
				<Head
					title="Latihan Path"
					subtitle="Kelola data latihan berbasis ITS">
                    <v-btn
                        exact
                        small
                        class="white"
                        to="/apps/latihan-path/create">
                        <v-icon left>
                            mdi-account-plus
                        </v-icon>
                        Create
                    </v-btn>
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
                    <template v-slot:[`item.created_at`]="{ item }">
                        {{ $moment(item.created_at).format('DD/MM/YYYY') }}
                    </template>
                    <template v-slot:[`item.updated_at`]="{ item }">
                        {{ item.updated_at?$moment(item.updated_at).format('DD/MM/YYYY'):'-' }}
                    </template>
                    <template v-slot:[`item.aksi`]="{ item }">
                        <v-btn 
                            :to="`/apps/latihan-path/${item.id}/kelola`"
                            x-small>
                            Kelola
                        </v-btn>
                        <v-btn 
                            :to="`/apps/latihan-path/${item.id}/peserta`"
                            x-small>
                            Peserta
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
                    { text: 'Nama', value: 'nama' },
                    { text: 'Jumlah Latihan', value: 'jumlah_soal' },
                    { text: 'Jumlah Peserta', value: 'jumlah_peserta' },
                    { text: 'Created', value: 'created_at' },
                    { text: 'Updated', value: 'updated_at' },
                    { text: 'Status', value: 'status' },
                    { text: '', value: 'aksi' },
                ],
                data:[]
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
            // const data          = (await this.$api.$get(`admin/foundation/role?page=${this.options.page-1}&size=${this.options.itemsPerPage}${query}`)).data

            const data          = { 
                content:[
                    {
                        id: 1,
                        nama: 'Latihan Fisika 1',
                        jumlah_soal: 20,
                        jumlah_peserta:30,
                        status: 1,
                        dibuat: '2022-03-26 08:56:13',
                        diubah: '2022-03-26 08:56:13',
                    },
                    {
                        id: 2,
                        nama: 'Latihan Fisika 2',
                        jumlah_soal: 20,
                        jumlah_peserta:30,
                        status: 0,
                        dibuat: '2022-03-26 08:56:13',
                        diubah: '2022-03-26 08:56:13',
                    }
                ], 
                count:2
            }
            this.table.data     = data.content
            this.table.count    = eval(data.count)
            this.isFetching     = false
        },
        handelClickDetail: function( item ){
            this.$router.push(`/apps/latihan-path/${item.id}`);
        },

    }
}
</script>
