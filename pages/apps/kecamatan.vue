<template>
	<div class="grey lighten-4" style="height:100%">
		<v-container>
		<Crud
			:crud="crud">
            <template v-slot:filter="{handleUpdateData}">
                <v-row class="ml-2 mr-2 pt-0 pb-0 justify-center align-center" dense>
                    <v-col md="5" cols="12">
                        <v-autocomplete
                            label="Pilih Provinsi"
                            v-model="provinsiDipilih"
                            :items="provinsi"
                            item-text="nama"
                            item-value="id"/>
                    </v-col>
                    <v-col md="5" cols="12">
                        <v-autocomplete
                            label="Pilih Kabupaten"
                            v-model="kabupatenDipilih"
                            :items="kabupaten"
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
        let kabupaten   = (await $api.$get(`/v1/api/query/master_kabupaten?where=id_provinsi=${provinsi[0].id}`)).data
		return {
			provinsi,
            provinsiDipilih: provinsi[0].id,
            kabupaten,
            kabupatenDipilih: kabupaten[0].id
            
		}
	},
    watch: {
        provinsiDipilih: async function (val) {
            this.kabupaten                  = (await this.$api.$get(`/v1/api/query/master_kabupaten?where=id_provinsi=${val}`)).data
        },
        kabupatenDipilih: async function (val) {
            this.crud.apiData               = `${this.crud.api}?where=id_kabupaten=${val}`
            this.crud.headers[0].default    = val
        },
    },
    beforeMount: function(){
        this.crud.apiData               = `${this.crud.api}?where=id_kabupaten=${this.provinsiDipilih}`
        this.crud.headers[0].default    = this.kabupatenDipilih
    },
	data(){
        return {
            crud: {
                title: "Kecamatan",
                subtitle: "Kelola data kecamatan",
                api: `/v1/api/query/master_kecamatan`,
                apiData: `/v1/api/query/master_kecamatan`,
                apiTambah: `/v1/api/tambah/master_kecamatan`,
                apiUbah: `/v1/api/ubah/master_kecamatan`,
                apiHapus: `/v1/api/hapus/master_kecamatan`,

                headers: [                    
                    {
                        text: 'Kabupaten',
                        value: 'id_kabupaten',
                        type: 'hidden',
                        table: false,
                        default: 0,
                    }, 
                    {
                        text: 'Nama Kecamatan',
                        value: 'nama',
                        info: ['Contoh : Bahodopi dll']
                    }, 
                    {
                        text: 'Email Pengelola',
                        value: 'email_pengelola',
                        info: ['Contoh : email@gmail.com']
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
