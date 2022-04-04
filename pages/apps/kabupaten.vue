<template>
	<div class="grey lighten-4" style="height:100%">
		<v-container>
		<Crud
			:crud="crud">
            <template v-slot:filter="{handleUpdateData}">
                <v-row class="ml-2 mr-2 pt-0 pb-0 justify-center align-center" dense>
                    <v-col md="10" cols="12">
                        <v-autocomplete
                            label="Pilih Provinsi"
                            v-model="provinsiDipilih"
                            :items="provinsi"
                            item-text="nama"
                            item-value="id"/>
                    </v-col>
                    <v-col md="2" cols="12">
                        <v-btn 
                            small 
                            block
                            v-on:click="handleUpdateData">
                            <v-icon left small>
                                mdi-text-box-search-outline
                            </v-icon>
                            Tampilkan
                        </v-btn>
                    </v-col>
                </v-row>
            </template>
        </Crud>
		</v-container>
	</div>
</template>
<script>
export default {
	layout:'apps',
	props: [],
    async asyncData({ $api }) {
		let provinsi    = (await $api.$get(`/v1/api/data/master_provinsi`)).data
		return {
			provinsi,
            provinsiDipilih: provinsi[0].id
		}
	},
    watch: {
        provinsiDipilih: function (val) {
            this.crud.apiData               = `${this.crud.api}?where=id_provinsi=${val}`
            this.crud.headers[0].default    = val
        },
    },
    beforeMount: function(){
        this.crud.apiData               = `${this.crud.api}?where=id_provinsi=${this.provinsiDipilih}`
        this.crud.headers[0].default    = this.provinsiDipilih
    },
	data(){
        return {
            crud: {
                title: "Kabupaten",
                subtitle: "Kelola data kabupaten",
                api: `/v1/api/query/master_kabupaten`,
                apiData: `/v1/api/query/master_kabupaten`,
                apiTambah: `/v1/api/tambah/master_kabupaten`,
                apiUbah: `/v1/api/ubah/master_kabupaten`,
                apiHapus: `/v1/api/hapus/master_kabupaten`,

                headers: [                    
                    {
                        text: 'Provinsi',
                        value: 'id_provinsi',
                        type: 'hidden',
                        table: false,
                        default: 0,
                    }, 
                    {
                        text: 'Nama Kabupaten',
                        value: 'nama',
                        info: ['Contoh : Morowali dll']
                    }, 
                    {
                        text: 'Aksi',
                        value: 'aksi',
                        width: '100px',
                        form: false
                    }
                ],
            },
            data:[]
        }
    },
	methods:{
		
	}
}
</script>
